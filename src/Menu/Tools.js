import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { LinearGradient } from 'expo-linear-gradient';
import Footer from '../Menu/Footer';
import Header from '../Menu/Header';

export default function Tools({ navigation }) {
  const affirmations = [
    { text: 'You are capable of achieving great things.', image: require('../images/affirmation1.jpg') },
    { text: 'Every day is a new opportunity to grow and improve.', image: require('../images/affirmation2.webp') },
    { text: 'You are worthy of love and respect.', image: require('../images/affirmation3.jpg') },
    { text: 'Believe in yourself and all that you are.', image: require('../images/page4.jpeg') },
    { text: 'You have the power to create the life you want.', image: require('../images/page5.jpeg') },
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
    <View style={styles.container}>
      {/* Header on Top */}
      <Header />

      {/* Linear Gradient Background Below Header */}
      <LinearGradient colors={['#FC9842', '#FE5F75']} style={styles.gradient}>
        {/* ScrollView for Content */}
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          {/* Randomly Generated Affirmation */}
          <View style={styles.quoteContainer}>
            <Image source={randomAffirmation.image} style={styles.image} />
            <Text style={styles.quoteText}>“{randomAffirmation.text}”</Text>
          </View>

         
{/* Tabs Section */}
<View style={styles.tabContainer}>
            <View style={styles.row}>
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
            </View>

            <View style={styles.row}>
              <TouchableOpacity 
                style={[styles.tab, styles.helpLine]} 
                onPress={() => navigation.navigate('MedicalHelp')}>
                <Icon name="phone" size={24} color="black" />
                <Text style={styles.tabText}>Medical Help</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.tab, styles.peerSupport]} 
                onPress={() => navigation.navigate('userList')}>
                <Icon name="account-group" size={24} color="black" />
                <Text style={styles.tabText}>Peer Support</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
              <TouchableOpacity 
                style={[styles.tab, styles.community]} 
                onPress={() => navigation.navigate('MainPost')}>
                <Icon name="home-group" size={24} color="black" />
                <Text style={styles.tabText}>Community</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.tab, styles.profile]} 
                onPress={() => navigation.navigate('HelpLine')}>
                <Icon name="phone" size={24} color="black" />
                <Text style={styles.tabText}>HelpLine</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>

      {/* Footer */}
      <Footer />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    paddingTop: 20, // Adjust padding as needed
  },
  scrollViewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  quoteContainer: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  image: {
    width: 250,
    height: 200,
    borderRadius: 10,
  },
  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 20,
    color: '#FF8C00',
  },
  tabContainer: {
    width: '100%',
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    margin: 5,
    backgroundColor: '#FF5F15',
    borderRadius: 10,
    
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    // Shadow for Android
    elevation: 5,
  },
  tabText: {
    marginTop: 10,
    fontSize: 14,
    color: 'black',
  },
  podcast: {
    backgroundColor: 'white',
  },
  therapy: {
    backgroundColor: '#FC9842',
  },
  helpLine: {
    backgroundColor: '#FC9842',
  },
  peerSupport: {
    backgroundColor: 'white',
  },
  community: {
    backgroundColor: 'white',
  },
  profile: {
    backgroundColor: '#FC9842',
  },
});
