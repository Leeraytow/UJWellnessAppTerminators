import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { collection, query, onSnapshot, addDoc, deleteDoc, doc, getDoc, updateDoc, arrayUnion, increment } from 'firebase/firestore';

import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, auth } from '../Configuration/firebase';
import { sendNotificationToUser } from './NotificationService'; // Import the updated notification function

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
          likedBy: [], // Add this line to store the list of users who liked the post
        };
        
        
        await addDoc(collection(db, 'Posts'), newPost);

        // Send notification to all users
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
  
    // Check if the current user has already liked the post
    if (likedBy.includes(user.email)) {
      Alert.alert('Like Error', 'You have already liked this post.');
      return;
    }
  
    // Update the post's likes count and add the current user to the likedBy array
    await updateDoc(postRef, {
      likesCount: likesCount + 1,
      likedBy: arrayUnion(user.email), // Add the current user's email to the likedBy array
    });
  };
  
  
  const renderItem = ({ item }) => {
    const isCurrentUserPost = item.email === currentUserEmail;
  
    return (
      <View style={styles.postContainer}>
        <View style={styles.headerContainer}>
          <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
          <View>
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
  onPress={() => handleLike(item.id, item.likesCount, item.likedBy)} // Pass likedBy here
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
    
    // Update the comments count
    await updateDoc(postRef, {
      commentsCount: increment(1), // This assumes you are importing increment from 'firebase/firestore'
    });
  
    // Add the comment to the post's comments array
    await updateDoc(postRef, {
      comments: arrayUnion(comment),
    });
  };
  
  return (
    <View style={styles.container}>
      {profileImage && <Image source={{ uri: profileImage }} style={styles.profileImage} />}
      <Text style={styles.nameText}>{name}</Text>
      <TextInput
        style={styles.input}
        placeholder="What's on your mind?"
        value={text}
        onChangeText={setText}
        multiline
      />
      {pickedImage && <Image source={{ uri: pickedImage }} style={styles.pickedImage} />}
      <TouchableOpacity style={styles.attachmentButton} onPress={pickImage}>
        <Icon name="image-outline" size={24} color="#333" />
        <Text style={styles.attachmentText}> Attach Image</Text>
      </TouchableOpacity>
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
    padding: 20,
    //backgroundColor: '#FFF5E1', // Light orange background
  },
  input: {
    borderWidth: 1,
    borderColor: '#FF8C00', // Dark orange border
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FFE4B5', // Light orange input background
    marginBottom: 10,
  },
  postContainer: {
    padding: 15,
    backgroundColor: '#FFF5E1', // Light orange background for posts
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  authorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF8C00', // Dark orange text for author name
  },
  postText: {
    fontSize: 16,
    color: '#333',
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconLabel: {
    marginLeft: 5,
    fontSize: 14,
    color: '#FF8C00', // Dark orange label for buttons
  },
  attachmentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FF8C00', // Dark orange background
    borderRadius: 10,
    marginBottom: 10,
  },
  attachmentText: {
    marginLeft: 5,
    color: '#FFF',
  },
  postButton: {
    backgroundColor: '#FF4500', // Strong orange color for post button
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  postButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  postList: {
    marginTop: 20,
  },
  pickedImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});