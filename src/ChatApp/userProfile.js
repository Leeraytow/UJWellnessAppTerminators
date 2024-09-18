import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Platform, StatusBar } from 'react-native';
import { collection, getDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../Configuration/firebase';

const UserProfile = ({ route }) => {
  const { userId } = route.params; // Get userId from navigation params
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data
        const userDocRef = doc(db, 'Students', userId);
        const userDoc = await getDoc(userDocRef);
        const userData = userDoc.data();
        setUser(userData);

        // Fetch user posts
        const postsCollection = collection(db, 'Posts');
        const postsSnapshot = await getDocs(postsCollection);
        const postsData = postsSnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(post => post.userId === userId);
        setPosts(postsData);
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };

    fetchUserData();
  }, [userId]);

  if (!user) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
      <Text style={styles.username}>{user.username}</Text>
      <Text style={styles.details}>Gender: {user.gender}</Text>
      <Text style={styles.details}>Age: {user.age}</Text>
      <Text style={styles.details}>Date of Birth: {user.dateOfBirth}</Text>

      <Text style={styles.postsHeader}>Posts:</Text>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Text style={styles.postContent}>{item.content}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.postsList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 16,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  details: {
    fontSize: 16,
    marginBottom: 4,
  },
  postsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  postsList: {
    paddingBottom: 16,
  },
  postContainer: {
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  postContent: {
    fontSize: 16,
  },
});

export default UserProfile;
