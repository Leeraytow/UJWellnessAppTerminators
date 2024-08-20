import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions, ScrollView, Platform, StatusBar, SafeAreaView } from 'react-native';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../Configuration/firebase';
import YoutubePlayer from 'react-native-youtube-iframe';
import Footer from '../Menu/Footer'; // Adjust the path as necessary
import { ThemeContext } from '../StudentProfile/ThemeContext'; // Import the ThemeContext

const UserVid = () => {
  const { width } = Dimensions.get('window');
  const { isDarkMode } = useContext(ThemeContext); // Use the ThemeContext

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
    <View style={[styles.videoContainer, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
      <Text style={[styles.videoTitle, { color: isDarkMode ? '#fff' : '#000' }]}>{item.title}</Text>
      <YoutubePlayer height={250} width={width - 40} play={false} videoId={item.videoId} />
    </View>
  );

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#f7f7f7' }]}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={[styles.safeArea, { backgroundColor: isDarkMode ? '#222' : '#fff' }]}>
          <View style={styles.categoryContainer}>
            {['All', 'Meditation', 'Podcast', 'SelfTherapy'].map((cat) => (
              <TouchableOpacity
                key={cat}
                onPress={() => handleCategoryChange(cat)}
                style={[
                  styles.categoryButton,
                  selectedCategory === cat && styles.selectedCategoryButton,
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === cat && styles.selectedCategoryText,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <FlatList
            data={filteredVideos}
            renderItem={renderVideoItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    padding: 20,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    backgroundColor: '#FF6F00',
    borderRadius: 25,
    padding: 5,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  selectedCategoryButton: {
    backgroundColor: '#fff',
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  selectedCategoryText: {
    color: '#FF6F00',
    fontWeight: 'bold',
  },
  flatListContent: {
    paddingBottom: 20,
  },
  videoContainer: {
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
    textAlign: 'center',
    paddingTop: 15,
    paddingHorizontal: 15,
  },
});

export default UserVid;
