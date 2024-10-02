import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions, ScrollView, TextInput, SafeAreaView, Image, StatusBar,Platform } from 'react-native';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../Configuration/firebase';
import YoutubePlayer from 'react-native-youtube-iframe';
import Footer from '../Menu/Footer'; // Adjust the path as necessary
import { ThemeContext } from '../StudentProfile/ThemeContext'; // Import the ThemeContext
import Header from '../Menu/Header';

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
    <TouchableOpacity style={styles.videoCard}>
      <Image source={{ uri: `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg` }} style={styles.thumbnail} />
      <View style={styles.videoInfo}>
        <Text style={[styles.videoTitle, { color: isDarkMode ? '#fff' : '#000' }]}>{item.title}</Text>
        <Text style={[styles.videoDesc, { color: isDarkMode ? '#aaa' : '#333' }]}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#f4f4f4' }]}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Header />
        {/* Header with Search Bar */}
       

        {/* Featured Video Section */}
        <View style={styles.featuredVideo}>
          <Text style={[styles.featuredTitle, { color: isDarkMode ? '#fff' : '#000' }]}>Featured Video</Text>
          {videos.length > 0 && (
            <YoutubePlayer height={250} width={width - 40} play={false} videoId={videos[0].videoId} />
          )}
        </View>

        {/* Horizontal Category List */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
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
        </ScrollView>

        {/* Video List */}
        <FlatList
          data={filteredVideos}
          renderItem={renderVideoItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatListContent}
        />
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + -45 : 1,
    backgroundColor: '#FF6F00',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  searchBar: {
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    width: '60%',
  },
  featuredVideo: {
    padding: 20,
  },
  featuredTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryScroll: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    backgroundColor: '#FC9842',
    marginHorizontal: 5,
  },
  selectedCategoryButton: {
    backgroundColor: '#fff',
    borderColor: '#FF6F00',
    borderWidth: 1,
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
    paddingHorizontal: 10,
    paddingBottom: 2,
  },
  videoCard: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  thumbnail: {
    width: 120,
    height: 90,
  },
  videoInfo: {
    flex: 1,
    padding: 10,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  videoDesc: {
    fontSize: 14,
    color: '#666',
  },
});

export default UserVid;
