import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Footer = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('Home');
  const bounceValue = useRef(new Animated.Value(1)).current;

  const tabs = [
    { name: 'Home', icon: 'home', route: 'Home' },
    { name: 'Resources', icon: 'book-open-variant', route: 'Resources' },
    { name: 'Appointments', icon: 'calendar-clock', route: 'Appointments' },
    { name: 'Chat', icon: 'chat-processing', route: 'Chat' },
    { name: 'Profile', icon: 'account', route: 'Profile' },
  ];

  const handleTabPress = (tabName, route) => {
    setSelectedTab(tabName);
    
    // Start bounce animation for the selected tab
    Animated.sequence([
      Animated.spring(bounceValue, {
        toValue: 1.4, // Scale up
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.spring(bounceValue, {
        toValue: 1, // Scale back to normal
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();

    navigation.navigate(route);
  };

  return (
    <View style={styles.tabContainer}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          style={styles.tabButton}
          onPress={() => handleTabPress(tab.name, tab.route)}
        >
          <View style={styles.iconContainer}>
            {selectedTab === tab.name && <View style={styles.activeIndicator} />}
            <Animated.View style={{ transform: [{ scale: selectedTab === tab.name ? bounceValue : 1 }] }}>
              <MaterialCommunityIcons
                name={tab.icon}
                size={24}
                color={selectedTab === tab.name ? '#4B0082' : '#E0B0FF'}
              />
            </Animated.View>
          </View>
          <Text style={[styles.tabButtonText, selectedTab === tab.name && styles.selectedTabText]}>
            {tab.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#DDD',
    paddingVertical: 10,
    width: '100%',
  },
  tabButton: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  activeIndicator: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(75, 0, 130, 0.1)', // Transparent purple
    zIndex: -1,
  },
  tabButtonText: {
    fontSize: 12,
    color: '#000000',
  },
  selectedTabText: {
    fontWeight: 'bold',
    color: '#4B0082', // Purple color for selected tab text
  },
});

export default Footer;
