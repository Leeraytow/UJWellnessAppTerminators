import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../Configuration/firebase';
import { ThemeContext } from '../StudentProfile/ThemeContext';

const UserFeedback = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [feedbackList, setFeedbackList] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Feedback'));
        const feedbackData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFeedbackList(feedbackData);
      } catch (error) {
        console.error('Error fetching feedback: ', error);
      }
    };

    fetchFeedback();
  }, []);

  const handleDeleteFeedback = async () => {
    if (selectedFeedback) {
      Alert.alert(
        'Delete Feedback',
        'Are you sure you want to delete this feedback?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: async () => {
              try {
                await deleteDoc(doc(db, 'Feedback', selectedFeedback.id));
                setFeedbackList(feedbackList.filter(feedback => feedback.id !== selectedFeedback.id));
                setSelectedFeedback(null);
              } catch (error) {
                console.error('Error deleting feedback: ', error);
              }
            },
          },
        ]
      );
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.block, { backgroundColor: isDarkMode ? '#444' : '#FFF' }]}
      onLongPress={() => setSelectedFeedback(item)}
    >
      <Text style={[styles.text, { color: isDarkMode ? '#FFF' : '#333' }]}>Username: {item.username}</Text>
      <Text style={[styles.text, { color: isDarkMode ? '#FFF' : '#333' }]}>Rating: {item.rating}</Text>
      <Text style={[styles.text, { color: isDarkMode ? '#FFF' : '#333' }]}>Suggestion: {item.suggestions}</Text>
      <Text style={[styles.text, { color: isDarkMode ? '#FFF' : '#333' }]}>Date: {new Date(item.date).toLocaleDateString()}</Text>
      {selectedFeedback && selectedFeedback.id === item.id && (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeleteFeedback}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#F5F5F5' }]}>
      <Text style={[styles.header, { color: isDarkMode ? '#FFA500' : '#FF6F00' }]}>User Feedback</Text>
      <FlatList
        data={feedbackList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
   
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    top: 18,
  },
  block: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    position: 'relative',
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  deleteButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default UserFeedback;
