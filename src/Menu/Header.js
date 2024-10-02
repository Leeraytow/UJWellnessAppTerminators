import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Header = ({ navigation }) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <Image source={require('../images/logo.png')} style={styles.logo} />
        <Text style={styles.headerText}>UJWellness</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuBtn}>
        <Ionicons name="menu" size={28} color="#FF5F1F" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 50, // Adds space at the top to move the header down
    borderWidth: 2, // Add border width
    borderColor: '#FF5F1F', // Set border color to orange
    borderRadius: 8, // Optional: round the corners
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  headerText: {
    color: '#FF5F1F',
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuBtn: {
    padding: 10,
  },
  separator: {
    height: 1,
    backgroundColor: 'white',
    marginVertical: 5,
  },
});

export default Header;
