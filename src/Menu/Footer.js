import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Footer = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('MainPage')}>
        <Ionicons name="home-sharp" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerButton}>
        <Ionicons name="notifications-sharp" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerButton}>
        <Ionicons name="settings-sharp" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerButton} onPress={()=>navigation.navigate('Profile')}>
        <Ionicons name="person" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFA500',
    padding: 10,
  },
  footerButton: {
    padding: 6,
  },
});

export default Footer;
