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
        <Ionicons name="menu" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FF6F00',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 50, // Adds space at the top to move the header down
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
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuBtn: {
    padding: 10,
  },
});

export default Header;
