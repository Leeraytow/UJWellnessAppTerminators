import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { collection, query, onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../src/Configuration/firebase';

import * as ImagePicker from 'expo-image-picker';

export default function HomeScreen({ navigation }) {
  const [text, setText] = useState('');
  const [name, setName] = useState('User1'); // Replace with dynamic user name
  const [posts, setPosts] = useState([]);
  const [pickedImage, setPickedImage] = useState(null);

  const handlePost = async () => {
    if (text.trim() || pickedImage) {
      try {
        let imageUrl = null;

        if (pickedImage) {
          const storage = getStorage();
          const imageRef = ref(storage, `images/${Date.now()}_${name}.jpg`);

          // Convert the image to a Blob format
          const response = await fetch(pickedImage);
          const blob = await response.blob();

          // Upload the image to Firebase Storage
          await uploadBytes(imageRef, blob);

          // Get the download URL of the uploaded image
          imageUrl = await getDownloadURL(imageRef);
        }

        const newPost = {
          text,
          author: name,
          timestamp: new Date(),
          comments: [],
          profileImage: 'https://i.pravatar.cc/300', // Placeholder image URL
          image: imageUrl, // Use the download URL from Firebase Storage
        };

        // Add post to Firestore
        await addDoc(collection(db, 'Posts'), newPost);

        setText('');
        setPickedImage(null); // Reset selected image after posting
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
      // Delete post from Firestore
      await deleteDoc(doc(db, 'Posts', postId));
    } catch (error) {
      Alert.alert('Delete Error', 'Failed to delete the post. Please try again.');
    }
  };

  const renderItem = ({ item }) => {
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
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="heart-outline" size={24} color="#333" />
            <Text style={styles.iconLabel}>Like</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Comments', { post: item })}>
            <Icon name="chatbubble-outline" size={24} color="#333" />
            <Text style={styles.iconLabel}>Comment</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="share-outline" size={24} color="#333" />
            <Text style={styles.iconLabel}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => handleDelete(item.id)}>
            <Icon name="trash-outline" size={24} color="red" />
            <Text style={styles.iconLabel}>Delete</Text>
          </TouchableOpacity>
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

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="What's on your mind?"
        value={text}
        onChangeText={setText}
        multiline
      />
      {pickedImage && <Image source={{ uri: pickedImage }} style={{ width: 200, height: 200 }} />}
      <TouchableOpacity style={styles.attachmentButton} onPress={pickImage}>
        <Icon name="image-outline" size={24} color="#333" />
        <Text style={styles.attachmentText}> Attach Image</Text>
      </TouchableOpacity>
      <Button title="Post" onPress={handlePost} />
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
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    minHeight: 40,
  },
  postContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
  },
  postText: {
    fontSize: 18,
  },
  postMeta: {
    fontSize: 12,
    color: '#666',
  },
  postImage: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 5,
  },
  selectedImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 5,
  },
  postList: {
    marginTop: 20,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconLabel: {
    marginLeft: 5,
    fontSize: 14,
    color: '#333',
  },
  attachmentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
  },
  attachmentText: {
    marginLeft: 5,
    fontSize: 16,
  },
});
