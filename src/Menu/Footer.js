import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
        <Ionicons name="home-outline" size={24} color={activeIndex === 0 ? '#FF6F00' : 'black'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.footerButton, activeIndex === 1 && styles.activeButton]}
        onPress={() => handlePress(1, 'Notifications')}
      >
        <Ionicons name="notifications-outline" size={24} color={activeIndex === 1 ? '#FF6F00' : 'black'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.footerButton, activeIndex === 2 && styles.activeButton]}
        onPress={() => handlePress(2, 'Chat')}
      >
        <Ionicons name="chatbubble-outline" size={24} color={activeIndex === 2 ? '#FF6F00' : 'black'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.footerButton, activeIndex === 3 && styles.activeButton]}
        onPress={() => handlePress(3, 'Profile')}
      >
        <Ionicons name="person-outline" size={24} color={activeIndex === 3 ? '#FF6F00' : 'black'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff', // Background color white
    padding: 10,
    borderTopWidth: 2,
    borderTopColor: '#FF6F00', // Orange border
  },
  footerButton: {
    padding: 6,
  },
  activeButton: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#FF6F00', // Orange highlight border
  },
});

export default Footer;