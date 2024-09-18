import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; // Added MaterialCommunityIcons
import { useNavigation } from '@react-navigation/native';

const Footer = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const navigation = useNavigation();

  const handlePress = (index, route) => {
    setActiveIndex(index);
    navigation.navigate(route);
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={[styles.footerButton, activeIndex === 0 && styles.activeButton]}
        onPress={() => handlePress(0, 'MainPage')}
      >
        <Ionicons name="home-sharp" size={28} color={activeIndex === 0 ? '#FF6F00' : '#6e6e6e'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.footerButton, activeIndex === 1 && styles.activeButton]}
        onPress={() => handlePress(1, 'Notifications')}
      >
        <Ionicons name="notifications" size={28} color={activeIndex === 1 ? '#FF6F00' : '#6e6e6e'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.footerButton, activeIndex === 2 && styles.activeButton]}
        onPress={() => handlePress(2, 'Chat')}
      >
        <MaterialCommunityIcons name="chat-processing" size={28} color={activeIndex === 2 ? '#FF6F00' : '#6e6e6e'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.footerButton, activeIndex === 3 && styles.activeButton]}
        onPress={() => handlePress(3, 'Profile')}
      >
        <Ionicons name="person-circle" size={28} color={activeIndex === 3 ? '#FF6F00' : '#6e6e6e'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff', // White background for the footer
    padding: 10,
    borderTopWidth: 2,
    borderTopColor: '#FF6F00', // Orange border on top
    shadowColor: '#000', // Subtle shadow for a more professional look
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  footerButton: {
    padding: 8, // Increased padding for better touch area
  },
  activeButton: {
    borderRadius: 50, // Circular highlight for active button
    borderWidth: 2,
    borderColor: '#FF6F00', // Orange highlight for active button
    backgroundColor: '#fff', // Ensure background stays white
  },
});

export default Footer;
