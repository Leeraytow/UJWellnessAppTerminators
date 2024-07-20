import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const StarRating = ({ rating, setRating }) => {
  return (
    <View style={styles.starContainer}>
      {Array.from({ length: 5 }, (_, index) => (
        <TouchableOpacity key={index} onPress={() => setRating(index + 1)}>
          <FontAwesome 
            name={index < rating ? 'star' : 'star-o'} 
            size={32} 
            color="#FFA500" 
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [suggestions, setSuggestions] = useState('');

  const handleSuggestionChange = (text) => {
    setSuggestions(text);
  };

  const handleSendFeedback = () => {
    Alert.alert("Feedback Sent", "Thank you for your feedback!");
    // Implement sending feedback to backend here
    setRating(0);
    setSuggestions('');
  };

  return (
    <View style={styles.container}>
    
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>User Feedback</Text>
        <Text>Ratings</Text>
        <StarRating rating={rating} setRating={setRating} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Suggestions for App Improvements</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Write your suggestions here..." 
          value={suggestions} 
          onChangeText={handleSuggestionChange} 
          multiline 
        />
        <TouchableOpacity style={styles.button} onPress={handleSendFeedback}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  starContainer: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  input: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#FFA500',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Feedback;
