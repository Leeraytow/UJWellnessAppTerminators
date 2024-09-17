// DrawerContent.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const DrawerContent = ({ navigation }) => (
  <View style={styles.drawerContent}>
    <TouchableOpacity onPress={() => navigation.navigate('PsyCadVideos')} style={styles.menuItem}>
      <Text style={styles.menuItemText}>Podcast and Videos</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('Therapy')} style={styles.menuItem}>
      <Text style={styles.menuItemText}>Therapy</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('HelpLine')} style={styles.menuItem}>
      <Text style={styles.menuItemText}>Help Line</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('ProfessionalMedicalHelp')} style={styles.menuItem}>
      <Text style={styles.menuItemText}>Professional Medical Help</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('CommunitySupport')} style={styles.menuItem}>
      <Text style={styles.menuItemText}>Community Support</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('PeerToPeerSupport')} style={styles.menuItem}>
      <Text style={styles.menuItemText}>Peer-to-Peer Support</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.menuItem}>
      <Text style={styles.menuItemText}>Profile</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FF6F00',
  },
  menuItem: {
    paddingVertical: 10,
  },
  menuItemText: {
    fontSize: 16,
    color: 'white',
  },
});

export default DrawerContent;
