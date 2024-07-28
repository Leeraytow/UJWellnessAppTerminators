import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Pressable } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

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
  const navigation = useNavigation();
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
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FF6F00" />
        </Pressable>
        <Text style={styles.headerTitle}>Feedback</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>User Feedback</Text>
        <Text style={styles.label}>Ratings</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
    marginTop: 30,
    
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 16,
  },
  section: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6F00',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  starContainer: {
    flexDirection: 'row',
    marginVertical: 8,
    justifyContent: 'center',
  },
  input: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    textAlignVertical: 'top',
    marginTop: 8,
  },
  button: {
    backgroundColor: '#FF6F00',
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
