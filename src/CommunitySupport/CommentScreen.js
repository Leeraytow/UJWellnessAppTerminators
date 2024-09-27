import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, StyleSheet } from 'react-native';
import { collection, doc, updateDoc, onSnapshot, arrayUnion } from 'firebase/firestore';
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
    <View style={styles.container}>
      <FlatList
        data={comments}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text>No comments yet.</Text>}
      />
      <TextInput
        style={styles.input}
        placeholder="Add a comment..."
        value={newComment}
        onChangeText={setNewComment}
      />
      <Button title="Comment" onPress={handleAddComment} />
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
  },
  commentContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  commentAuthor: {
    fontWeight: 'bold',
  },
});
