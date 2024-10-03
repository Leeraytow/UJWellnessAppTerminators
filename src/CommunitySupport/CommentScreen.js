import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, StyleSheet, ScrollView,Image } from 'react-native';
import { collection, doc, updateDoc, onSnapshot, arrayUnion, getDoc } from 'firebase/firestore';
import { auth, db } from '../Configuration/firebase';

export default function CommentsScreen({ route }) {
  const { post } = route.params;
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Fetch comments for the post
    const postRef = doc(db, 'Posts', post.id);
    const unsubscribe = onSnapshot(postRef, (snapshot) => {
      if (snapshot.exists()) {
        setComments(snapshot.data().comments || []);
      }
    });
    return () => unsubscribe();
  }, [post.id]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const userRef = doc(db, 'Students', user.uid);
          const docSnap = await getDoc(userRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            setUsername(userData.name.toUpperCase() || ''); // Set the user's name
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error fetching user data: ', error);
        }
      } else {
        setUsername(''); // Clear the username if the user is not authenticated
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAddComment = async () => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Comment Error', 'No user is logged in.');
      return;
    }

    if (newComment.trim()) {
      try {
        const postRef = doc(db, 'Posts', post.id);
        await updateDoc(postRef, {
          comments: arrayUnion({
            author: username || 'Anonymous',  // Use the fetched username
            email: user.email,
            text: newComment,
            timestamp: new Date(),
          }),
        });
        setNewComment('');
      } catch (error) {
        Alert.alert('Comment Error', 'Failed to add comment. Please try again.');
      }
    } else {
      Alert.alert('Comment Error', 'Comment cannot be empty.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.commentContainer}>
      <Text style={styles.commentAuthor}>{item.author} ({item.email})</Text>
      <Text>{item.text}</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Post Section */}
      <View style={styles.postContainer}>
        <Text style={styles.postTitle}>{post.text}</Text>
        <Text style={styles.postAuthor}>By {post.author}</Text>
    
        {post.image && (
            <Image 
            source={{ uri: post.image }} 
            style={styles.postImage} 
          />
          )}
      </View>

      {/* Comments Section */}
      <Text>Comments</Text>
      <FlatList
        data={comments}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text style={styles.noCommentsText}>No comments yet.</Text>}
        contentContainerStyle={styles.commentsList}
      />

      {/* Add Comment Section */}
      <TextInput
        style={styles.input}
        placeholder="Add a comment..."
        value={newComment}
        onChangeText={setNewComment}
      />
      <Button title="Comment" color='orange' onPress={handleAddComment} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  postContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  postTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  postAuthor: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#777',
    marginBottom: 10,
  },
  postBody: {
    fontSize: 16,
    color: '#555',
  },
  commentsList: {
    marginBottom: 20,
  },
  noCommentsText: {
    textAlign: 'center',
    color: '#999',
    fontStyle: 'italic',
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  commentContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  commentAuthor: {
    fontWeight: 'bold',
    color: '#333',
  },
});