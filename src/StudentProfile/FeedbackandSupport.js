import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Pressable } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from './ThemeContext'; // Adjust the path if necessary

const StarRating = ({ rating, setRating }) => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <View style={styles.starContainer}>
      {Array.from({ length: 5 }, (_, index) => (
        <TouchableOpacity key={index} onPress={() => setRating(index + 1)}>
          <FontAwesome 
            name={index < rating ? 'star' : 'star-o'} 
            size={32} 
            color={isDarkMode ? '#FFA500' : '#FFA500'} // Adjust the color as needed
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const Feedback = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useContext(ThemeContext);
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
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
      <View style={[styles.header, { backgroundColor: isDarkMode ? '#444' : '#fff' }]}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={isDarkMode ? '#FFA500' : '#FF6F00'} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: isDarkMode ? '#FFF' : '#333' }]}>Feedback</Text>
      </View>

      <View style={[styles.section, { backgroundColor: isDarkMode ? '#555' : '#fff' }]}>
        <Text style={[styles.sectionHeader, { color: isDarkMode ? '#FFA500' : '#FF6F00' }]}>User Feedback</Text>
        <Text style={[styles.label, { color: isDarkMode ? '#FFF' : '#333' }]}>Ratings</Text>
        <StarRating rating={rating} setRating={setRating} />
      </View>

      <View style={[styles.section, { backgroundColor: isDarkMode ? '#555' : '#fff' }]}>
        <Text style={[styles.sectionHeader, { color: isDarkMode ? '#FFA500' : '#FF6F00' }]}>Suggestions for App Improvements</Text>
        <TextInput 
          style={[styles.input, { backgroundColor: isDarkMode ? '#444' : '#f9f9f9', color: isDarkMode ? '#FFF' : '#000' }]} 
          placeholder="Write your suggestions here..." 
          placeholderTextColor={isDarkMode ? '#888' : '#888'}
          value={suggestions} 
          onChangeText={handleSuggestionChange} 
          multiline 
        />
        <TouchableOpacity style={[styles.button, { backgroundColor: isDarkMode ? '#FFA500' : '#FF6F00' }]} onPress={handleSendFeedback}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 16,
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  section: {
    marginBottom: 16,
    padding: 16,
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
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
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
