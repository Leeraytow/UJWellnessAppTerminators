import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions, Image, SafeAreaView, ScrollView } from 'react-native';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../Configuration/firebase';
import YoutubePlayer from 'react-native-youtube-iframe';
import Footer from '../Menu/Footer'; // Adjust the path as necessary
import { ThemeContext } from '../StudentProfile/ThemeContext'; // Import the ThemeContext
import Header from '../Menu/Header';
import axios from 'axios';

const UserVid = () => {
  const { width } = Dimensions.get('window');
  const { isDarkMode } = useContext(ThemeContext); // Use the ThemeContext

  const [videos, setVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [featuredVideoId, setFeaturedVideoId] = useState(null); // State for featured video
  const [videoDetails, setVideoDetails] = useState({}); // State for video details

  const API_KEY = 'AIzaSyAO3pJkw8C3g-kv4nmKFEnb8atxWvqaJAo'; // Replace with your YouTube API key

  useEffect(() => {
    const q = query(collection(db, 'Videos'));
    const unsub = onSnapshot(q, async (querySnapshot) => {
      let videoList = [];
      querySnapshot.forEach((doc) => {
        videoList.push({ ...doc.data(), id: doc.id });
      });
      setVideos(videoList);

      // Fetch video details for the first video
      if (videoList.length > 0 && !featuredVideoId) {
        const firstVideoId = videoList[0].videoId;
        setFeaturedVideoId(firstVideoId);
        await fetchVideoDetails(firstVideoId);
      }
    });
    return () => unsub();
  }, [featuredVideoId]);

  const fetchVideoDetails = async (videoId) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`
      );
      const videoData = response.data.items[0]?.snippet;
      if (videoData) {
        setVideoDetails({
          title: videoData.title,
          description: videoData.description,
        });
      }
    } catch (error) {
      console.error("Error fetching video details:", error);
    }
  };

  const filteredVideos = selectedCategory === 'All'
    ? videos
    : videos.filter((video) => video.category === selectedCategory);

  const handleVideoPress = async (videoId) => {
    setFeaturedVideoId(videoId); // Update featured video when a video is tapped
    await fetchVideoDetails(videoId); // Fetch details for the selected video
  };

  const renderVideoItem = ({ item }) => (
    <TouchableOpacity style={styles.videoCard} onPress={() => handleVideoPress(item.videoId)}>
      <Image source={{ uri: `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg` }} style={styles.thumbnail}/>
      <View style={styles.videoInfo}>
        <Text style={[styles.videoTitle, { color: isDarkMode ? '#fff' : '#000' }]}>{item.title}</Text>
        <Text
          style={[styles.videoDesc, { color: isDarkMode ? '#aaa' : '#333' }]}
          numberOfLines={3} // Limit description to 3 lines
        >
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#f4f4f4' }]}>
      <Header />
      <View style={styles.featuredVideo}>
        <Text style={[styles.featuredTitle, { color: isDarkMode ? '#fff' : '#000' }]}>Featured Video</Text>
        {featuredVideoId && (
          <YoutubePlayer height={200} width={width - 40} play={false} videoId={featuredVideoId} />
        )}
        {/* Display fetched video details */}
        <Text style={[styles.videoTitle, { color: isDarkMode ? '#fff' : '#000' }]}>{videoDetails.title}</Text>
        <Text
          style={[styles.videoDesc, { color: isDarkMode ? '#aaa' : '#333' }]}
          numberOfLines={4} // Limit description to 3 lines
        >
          {videoDetails.description}
        </Text>
      </View>

      {/* Horizontal Category List */}
      <View style={styles.categoryScroll}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
      </View>

      {/* Video List */}
      <FlatList
        data={filteredVideos}
        renderItem={renderVideoItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContent}
      />

      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  featuredVideo: {
    padding: 20,
  },
  featuredTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 3,
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
    padding: 10,
    flex: 1,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  videoDesc: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default UserVid;