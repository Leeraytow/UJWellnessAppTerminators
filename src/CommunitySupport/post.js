import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native';
import Video from 'react-native-video';
import ImagePicker from 'react-native-image-picker'; // Use this if not using Expo
// import * as ImagePicker from 'expo-image-picker'; // Use this if using Expo

const PostApp = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [selectedMedia, setSelectedMedia] = useState(null);

  const handleAddPost = (type) => {
    const post = {
      id: posts.length + 1,
      type: type,
      content: newPost || selectedMedia,
      likes: 0,
      comments: [],
    };
    setPosts([post, ...posts]);
    setNewPost('');
    setSelectedMedia(null);
  };

  const handleLike = (postId) => {
    const updatedPosts = posts.map(post =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    );
    setPosts(updatedPosts);
  };

  const handleImagePicker = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchImageLibrary(options, response => { // Use ImagePicker.launchCamera for camera
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setSelectedMedia(response.uri);
      }
    });
  };

  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      {item.type === 'text' && <Text style={styles.postText}>{item.content}</Text>}
      {item.type === 'image' && <Image source={{ uri: item.content }} style={styles.postImage} />}
      {item.type === 'video' && (
        <Video
          source={{ uri: item.content }}
          style={styles.postVideo}
          controls={true}
        />
      )}
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => handleLike(item.id)}>
          <Text>👍 {item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>💬 Comment</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>🔗 Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="What's on your mind?"
        value={newPost}
        onChangeText={setNewPost}
      />
      <TouchableOpacity style={styles.attachmentButton} onPress={handleImagePicker}>
        <Text style={styles.attachmentText}>📎 Attach Image</Text>
      </TouchableOpacity>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleAddPost('text')}>
          <Text>Post Text</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleAddPost('image')}>
          <Text>Post Image</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleAddPost('video')}>
          <Text>Post Video</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  postContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  postText: {
    fontSize: 16,
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 5,
  },
  postVideo: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  attachmentButton: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
  },
  attachmentText: {
    textAlign: 'center',
    fontSize: 16,
  },
});

export default PostApp;
