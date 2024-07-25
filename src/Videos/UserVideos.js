// App.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, Alert, TouchableOpacity, FlatList, StyleSheet, Dimensions, ScrollView,Platform,StatusBar } from 'react-native';
import { collection, addDoc, query, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { db } from '../Configuration/firebase'; 
import YoutubePlayer from 'react-native-youtube-iframe';
import { Picker } from '@react-native-picker/picker';

const UserVid = () => {
  const { width } = Dimensions.get('window');

  const extractYouTubeVideoID = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const [link, setLink] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Meditation');
  const [videos, setVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const q = query(collection(db, "Videos"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let videoList = [];
      querySnapshot.forEach((doc) => {
        videoList.push({ ...doc.data(), id: doc.id });
      });
      setVideos(videoList);
    });
    return () => unsub();
  }, []);

  const handleSubmit = async () => {
    const videoId = extractYouTubeVideoID(link);
    if (videoId) {
      await addDoc(collection(db, "Videos"), {
        videoId,
        title,
        category
      });
      setLink('');
      setTitle('');
      setCategory('Meditation');
    } else {
      Alert.alert("Invalid URL", "Please enter a valid YouTube URL.");
    }
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "Videos", id));
  };

  const filteredVideos = selectedCategory === 'All'
    ? videos
    : videos.filter(video => video.category === selectedCategory);

  const renderVideoItem = ({ item }) => (
    <View style={styles.videoContainer}>
      <Text>{item.title}</Text>
      <YoutubePlayer
        height={250}
        width={width / 1.1}
        play={false}
        videoId={item.videoId}
      />

    </View>
  );

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <ScrollView style={{margin:5, flex: 1,backgroundColor: '#fff',paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,}}>
    
      <View style={styles.categoryContainer}>
        <TouchableOpacity onPress={() => handleCategoryChange('All')}>
          <Text style={selectedCategory === 'All' ? styles.selectedCategory : styles.category}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleCategoryChange('Meditation')}>
          <Text style={selectedCategory === 'Meditation' ? styles.selectedCategory : styles.category}>Meditation</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleCategoryChange('Podcast')}>
          <Text style={selectedCategory === 'Podcast' ? styles.selectedCategory : styles.category}>Podcasts</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleCategoryChange('SelfTherapy')}>
          <Text style={selectedCategory === 'SelfTherapy' ? styles.selectedCategory : styles.category}>Self Therapy</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredVideos}
        renderItem={renderVideoItem}
        keyExtractor={(item) => item.id}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: 'white',
  },
  videoContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
    padding: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  categoryContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  category: {
    marginTop: 10,
    marginRight: 15,
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  selectedCategory: {
    marginTop: 8,
    marginRight: 15,
    fontSize: 16,
    fontWeight: 'bold',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    backgroundColor: 'orange',
  },
});

export default UserVid;