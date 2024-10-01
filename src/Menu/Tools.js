import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { LinearGradient } from 'expo-linear-gradient';

export default function Tools({ navigation }) {
    
  const affirmations = [
    { text: 'You are capable of achieving great things.', image: require('../images/affirmation1.jpg') },
    { text: 'Every day is a new opportunity to grow and improve.', image: require('../images/affirmation2.webp') },
    { text: 'You are worthy of love and respect.', image: require('../images/affirmation3.jpg') },
    { text: 'Believe in yourself and all that you are.', image: require('../images/affirmation4.jpg') },
    { text: 'You have the power to create the life you want.', image: require('../images/affirmation5.jpg') },
  ];
  
  const [randomAffirmation, setRandomAffirmation] = useState(affirmations[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * affirmations.length);
      setRandomAffirmation(affirmations[randomIndex]);
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <LinearGradient colors={['#FFA500', '#800080']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {/* Randomly Generated Affirmation */}
        <View style={styles.quoteContainer}>
          <Image source={randomAffirmation.image} style={styles.image} />
          <Text style={styles.quoteText}>“{randomAffirmation.text}”</Text>
        </View>

        {/* Tabs Section */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, styles.podcast]} 
            onPress={() => navigation.navigate('UserVid')}>
            <Icon name="podcast" size={24} color="black" />
            <Text style={styles.tabText}>Podcast & Videos</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.tab, styles.therapy]} 
            onPress={() => navigation.navigate('TherapyButton')}>
            <Icon name="head-heart-outline" size={24} color="black" />
            <Text style={styles.tabText}>Therapy</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.tab, styles.helpLine]} 
            onPress={() => navigation.navigate('HelpLine')}>
            <Icon name="phone" size={24} color="black" />
            <Text style={styles.tabText}>Help Line</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.tab, styles.peerSupport]} 
            onPress={() => navigation.navigate('userList')}>
            <Icon name="account-group" size={24} color="black" />
            <Text style={styles.tabText}>Peer Support</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.tab, styles.community]} 
            onPress={() => navigation.navigate('MainPost')}>
            <Icon name="home-group" size={24} color="black" />
            <Text style={styles.tabText}>Community</Text>
          </TouchableOpacity>

          {/* New Profile Tab */}
          <TouchableOpacity 
            style={[styles.tab, styles.profile]} 
            onPress={() => navigation.navigate('Profile')}>
            <Icon name="account-outline" size={24} color="black" />
            <Text style={styles.tabText}>Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  scrollViewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  quoteContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  quoteText: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 20,
    color: '#ffffff',
  },
  tabContainer: {
    width: '100%',
    paddingHorizontal: 10,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  tabText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
});