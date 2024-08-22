import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { format } from 'date-fns';

export default function CommentsScreen({ route }) {
  const { post } = route.params;
  const [comment, setComment] = useState('');
  const [name, setName] = useState('User2'); // Replace with dynamic user name
  const [comments, setComments] = useState(post.comments);

  const handleComment = () => {
    if (comment.trim()) {
      const newComment = {
        id: Date.now().toString(),
        text: comment,
        author: name,
        timestamp: new Date(),
      };
      const updatedComments = [...comments, newComment];
      setComments(updatedComments);
      setComment('');
      // Ideally, update the post in the parent state or in the database here
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.commentContainer}>
      <Text style={styles.commentText}>{item.text}</Text>
      <Text style={styles.commentMeta}>Commented by {item.author} on {format(item.timestamp, 'MMMM do, yyyy - h:mm a')}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.postText}>{post.text}</Text>
      <Text style={styles.postMeta}>Posted by {post.author} on {format(post.timestamp, 'MMMM do, yyyy - h:mm a')}</Text>
      <TextInput
        style={styles.input}
        placeholder="Write a comment..."
        value={comment}
        onChangeText={setComment}
        multiline
      />
      <Button title="Comment" onPress={handleComment} />
      <FlatList
        data={comments}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.commentList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  postText: {
    fontSize: 18,
    marginBottom: 10,
  },
  postMeta: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    minHeight: 40,
  },
  commentContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  commentText: {
    fontSize: 16,
  },
  commentMeta: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  commentList: {
    marginTop: 20,
  },
});