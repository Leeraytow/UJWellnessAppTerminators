import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  ScrollView,
  Platform,
  StatusBar,
  SafeAreaView
} from 'react-native';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../Configuration/firebase';
import YoutubePlayer from 'react-native-youtube-iframe';
import Footer from '../Menu/Footer'; // Adjust the path as necessary

const UserVid = () => {
  const { width } = Dimensions.get('window');

  const [videos, setVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const q = query(collection(db, 'Videos'));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let videoList = [];
      querySnapshot.forEach((doc) => {
        videoList.push({ ...doc.data(), id: doc.id });
      });
      setVideos(videoList);
    });
    return () => unsub();
  }, []);

  const filteredVideos = selectedCategory === 'All'
    ? videos
    : videos.filter((video) => video.category === selectedCategory);

  const renderVideoItem = ({ item }) => (
    <View style={styles.videoContainer}>
      <Text style={styles.videoTitle}>{item.title}</Text>
      <YoutubePlayer height={250} width={width - 40} play={false} videoId={item.videoId} />
    </View>
  );

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.safeArea}>
          <View style={styles.categoryContainer}>
            {['All', 'Meditation', 'Podcast', 'SelfTherapy'].map((cat) => (
              <TouchableOpacity key={cat} onPress={() => handleCategoryChange(cat)}>
                <Text style={selectedCategory === cat ? styles.selectedCategory : styles.category}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <FlatList data={filteredVideos} renderItem={renderVideoItem} keyExtractor={(item) => item.id} />
        </View>
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  category: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  selectedCategory: {
    fontSize: 16,
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderColor: '#ff6347',
    color: '#ff6347',
  },
  videoContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    alignItems: 'center',
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default UserVid;
