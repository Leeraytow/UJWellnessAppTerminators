import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { collection, query, onSnapshot, addDoc, deleteDoc, doc, getDoc, updateDoc, arrayUnion, increment } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, auth } from '../Configuration/firebase';
import { sendNotificationToUser } from './NotificationService';

export default function HomeScreen({ navigation }) {
  const [text, setText] = useState('');
  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [pickedImage, setPickedImage] = useState(null);
  const [currentUserEmail, setCurrentUserEmail] = useState('');

  useEffect(() => {
    const fetchCurrentUserDetails = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userRef = doc(db, 'Students', user.uid);
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setName(userData.name || 'User');
            setProfileImage(userData.profileImage || 'https://i.pravatar.cc/300');
            setCurrentUserEmail(user.email);
          } else {
            console.error('No such document!');
          }
        } catch (error) {
          console.error('Error fetching user details: ', error);
        }
      }
    };

    fetchCurrentUserDetails();
  }, []);

  const handlePost = async () => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Post Error', 'No user is logged in.');
      return;
    }

    if (text.trim() || pickedImage) {
      try {
        let imageUrl = null;

        if (pickedImage) {
          const storage = getStorage();
          const imageRef = ref(storage, `images/${Date.now()}_${name}.jpg`);

          const response = await fetch(pickedImage);
          const blob = await response.blob();

          await uploadBytes(imageRef, blob);
          imageUrl = await getDownloadURL(imageRef);
        }

        const newPost = {
          text,
          author: name,
          email: user.email,
          timestamp: new Date(),
          comments: [],
          profileImage: profileImage || 'https://i.pravatar.cc/300',
          image: imageUrl,
          likesCount: 0,
          commentsCount: 0,
          likedBy: [],
        };

        await addDoc(collection(db, 'Posts'), newPost);

        await sendNotificationToUser(user.uid, `New post from ${name}: ${text}`);

        setText('');
        setPickedImage(null);
      } catch (error) {
        Alert.alert('Post Error', 'Failed to post. Please try again.');
      }
    } else {
      Alert.alert('Post Error', 'Please enter text or select an image.');
    }
  };

  useEffect(() => {
    const q = query(collection(db, 'Posts'));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let postsList = [];
      querySnapshot.forEach((doc) => {
        postsList.push({ ...doc.data(), id: doc.id });
      });
      setPosts(postsList);
    });
    return () => unsub();
  }, []);

  const handleDelete = async (postId) => {
    try {
      await deleteDoc(doc(db, 'Posts', postId));
    } catch (error) {
      Alert.alert('Delete Error', 'Failed to delete the post. Please try again.');
    }
  };

  const handleLike = async (postId, likesCount, likedBy) => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Like Error', 'You must be logged in to like a post.');
      return;
    }

    const postRef = doc(db, 'Posts', postId);

    if (likedBy.includes(user.email)) {
      Alert.alert('Like Error', 'You have already liked this post.');
      return;
    }

    await updateDoc(postRef, {
      likesCount: likesCount + 1,
      likedBy: arrayUnion(user.email),
    });
  };

  const renderItem = ({ item }) => {
    const isCurrentUserPost = item.email === currentUserEmail;

    return (
      <View style={styles.postContainer}>
        <View style={styles.headerContainer}>
          <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
          <View style={styles.authorContainer}>
            <Text style={styles.authorName}>{item.author}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Comments', { post: item })}>
          <Text style={styles.postText}>{item.text}</Text>
        </TouchableOpacity>
        {item.image && (
          <Image 
            source={{ uri: item.image }} 
            style={styles.postImage} 
          />
        )}
        <View style={styles.actionContainer}>
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={() => handleLike(item.id, item.likesCount, item.likedBy)}
          >
            <Icon name="heart-outline" size={24} color="#333" />
            <Text style={styles.iconLabel}>{item.likesCount} Like{item.likesCount !== 1 ? 's' : ''}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Comments', { post: item })}>
            <Icon name="chatbubble-outline" size={24} color="#333" />
            <Text style={styles.iconLabel}>{item.commentsCount} Comment{item.commentsCount !== 1 ? 's' : ''}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="share-outline" size={24} color="#333" />
            <Text style={styles.iconLabel}>Share</Text>
          </TouchableOpacity>
          {isCurrentUserPost && (
            <TouchableOpacity style={styles.iconButton} onPress={() => handleDelete(item.id)}>
              <Icon name="trash-outline" size={24} color="red" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Sorry, we need media library permissions to select an image.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPickedImage(result.assets[0].uri);
    }
  };

  const handleAddComment = async (postId, comment) => {
    const postRef = doc(db, 'Posts', postId);
    
    await updateDoc(postRef, {
      commentsCount: increment(1),
    });
  
    await updateDoc(postRef, {
      comments: arrayUnion(comment),
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
        <TextInput
          style={styles.input}
          placeholder="What's on your mind?"
          value={text}
          onChangeText={setText}
          multiline
        />
        <TouchableOpacity style={styles.attachmentButton} onPress={pickImage}>
          <View style={styles.attachmentInnerContainer}>
            <Icon name="image-outline" size={24} color="#333" />
            <Text style={styles.attachmentText}>Photo</Text>
          </View>
        </TouchableOpacity>
      </View>
      {pickedImage && <Image source={{ uri: pickedImage }} style={styles.pickedImage} />}
      <TouchableOpacity style={styles.postButton} onPress={handlePost}>
        <Text style={styles.postButtonText}>Post</Text>
      </TouchableOpacity>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.postList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderRadius:10
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginLeft: 8,
  },
  postButton: {
    backgroundColor: '#FF4500',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  postButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  postList: {
    marginTop: 16,
  },
  postContainer: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#FFF5E1',
    borderColor:'orange',
    borderWidth:2
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  authorName: {
    fontWeight: 'bold',
  },
  postText: {
    marginTop: 8,
    fontSize: 16,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 8,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconLabel: {
    marginLeft: 4,
  },
  attachmentButton: {
    marginLeft: 8,
  },
  attachmentInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attachmentText: {
    marginLeft: 4,
  },
  pickedImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 8,
  },
});
