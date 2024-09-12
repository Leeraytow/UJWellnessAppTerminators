import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';

const ResourcesScreen = ({ navigation }) => { // Add navigation prop here
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Register')}>
            <Image source={require('../images/Tregister.png')} style={styles.menuItemImage} />
            <Text style={styles.menuText}>Student Register</Text>
          </TouchableOpacity>
         <TouchableOpacity style={styles.menuItem}>
            <Image source={require('../images/Ttechniques.png')} style={styles.menuItemImage} />
            <Text style={styles.menuText}>Therapy Techniques</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem}>
            <Image source={require('../images/Tcommunity.jpeg')} style={styles.menuItemImage} />
            <Text style={styles.menuText}>Community</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Image source={require('../images/Pcampaigns.jpeg')} style={styles.menuItemImage} />
            <Text style={styles.menuText}>Events/Campaigns</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    padding: 10,
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 50,
  },
  menuItem: {
    flex: 1,
    backgroundColor: 'orange',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  menuText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  menuItemImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 8,
    marginTop: 10,
  },
});

export default ResourcesScreen;