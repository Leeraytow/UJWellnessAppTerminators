import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

const Footer = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const navigation = useNavigation();

  // Create an animated value for the bounce effect
  const bounceValue = useRef(new Animated.Value(1)).current;

  const handlePress = (index, route) => {
    setActiveIndex(index);
    navigation.navigate(route);
  };

  const handleAddPress = () => {
    // Start the bounce animation when the "+" icon is pressed
    Animated.sequence([
      Animated.spring(bounceValue, {
        toValue: 1.4, // Larger scale up
        friction: 3, // Bounce effect
        useNativeDriver: true,
      }),
      Animated.spring(bounceValue, {
        toValue: 1, // Scale back to normal
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Navigate to the Mood page after the bounce animation completes
      navigation.navigate('Mood');
    });
  };

  return (
    <View style={styles.footer}>
      {/* Home Button */}
      <TouchableOpacity
        style={[styles.footerButton, activeIndex === 0 && styles.activeButton]}
        onPress={() => handlePress(0, 'MainPage')}
      >
        <Ionicons name="home-outline" size={15} color={activeIndex === 0 ? '#FF5F1F' : '#9b9b9b'} />
        <Text style={styles.buttonLabel}>Home</Text>
      </TouchableOpacity>

      {/* Tools Button */}
      <TouchableOpacity
        style={[styles.footerButton, activeIndex === 1 && styles.activeButton]}
        onPress={() => handlePress(1, 'Tools')}
      >
        <Ionicons name="construct-outline" size={15} color={activeIndex === 1 ? '#FF5F1F' : '#9b9b9b'} />
        <Text style={styles.buttonLabel}>Tools</Text>
      </TouchableOpacity>

      {/* Add Mood Button with bounce animation */}
      <TouchableOpacity onPress={() => navigation.navigate('MoodControl')} style={styles.addButton}>
        <Animated.View style={{ transform: [{ scale: bounceValue }] }}>
          <Ionicons name="add-circle" size={40} color="#FF5F1F" />
        </Animated.View>
        <Text style={styles.buttonLabel}>Add Mood</Text>
      </TouchableOpacity>

      {/* Chat Button */}
      <TouchableOpacity
        style={[styles.footerButton, activeIndex === 2 && styles.activeButton]}
        onPress={() => handlePress(2, 'userList')}
      >
        <Ionicons name="chatbubble-outline" size={15} color={activeIndex === 2 ? '#FF5F1F' : '#9b9b9b'} />
        <Text style={styles.buttonLabel}>Chat</Text>
      </TouchableOpacity>

      {/* Profile Button */}
      <TouchableOpacity
        style={[styles.footerButton, activeIndex === 3 && styles.activeButton]}
        onPress={() => handlePress(3, 'Profile')}
      >
        <Ionicons name="person-outline" size={15} color={activeIndex === 3 ? '#FF5F1F' : '#9b9b9b'} />
        <Text style={styles.buttonLabel}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 1,
    borderTopWidth: 1,
    borderTopColor: '#FF5F1F',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  footerButton: {
    alignItems: 'center',
    padding: 10,
  },
  activeButton: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#FF5F1F',
    backgroundColor: '#fff',
  },
  addButton: {
    padding: 8,
    position: 'relative',
    alignItems: 'center',
  },
  buttonLabel: {
    fontSize: 12,
    color: '#9b9b9b',
    marginTop: 4,
  },
});

export default Footer;