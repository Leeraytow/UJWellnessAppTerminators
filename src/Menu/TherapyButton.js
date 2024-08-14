import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Footer from './Footer'; 

const TherapyButton = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../images/Icon.png')} style={styles.logo} />
        <TouchableOpacity style={styles.menuIcon}>
          <Text style={styles.menuText}>☰</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>You Deserve to Be Happy</Text>
      <Text style={styles.subtitle}>What Type of Therapy Are You Looking For?</Text>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DigitalDiary')}>
            <View style={styles.buttonContent}>
              <Text style={styles.buttonTitle}>Digital Diary</Text>
              <Text style={styles.buttonSubtitle}>Write in Journal</Text>
            </View>
            <Image source={require('../images/MainPage.png')} style={styles.buttonIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('OnlineTherapy')}>
            <View style={styles.buttonContent}>
              <Text style={styles.buttonTitle}>Online Therapy</Text>
              <Text style={styles.buttonSubtitle}>Meet with a Professional</Text>
              <Text style={styles.buttonSubtitle}>on a Video Call</Text>
            </View>
            <Image source={require('../images/EntryDiary.png')} style={styles.buttonIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PeerCounseling')}>
            <View style={styles.buttonContent}>
              <Text style={styles.buttonTitle}>Peer2Peer Counseling</Text>
              <Text style={styles.buttonSubtitle}>Casual Conversation with a Peer</Text>
            </View>
            <Image source={require('../images/TherapyPage.png')} style={styles.buttonIcon} />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Footer /> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA', // Light gray background for modern look
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  menuIcon: {
    padding: 10,
  },
  menuText: {
    fontSize: 24,
    color: '#FF6F00', // Orange for visibility
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FF6F00', // Orange for consistency
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginVertical: 10,
    color: '#333', // Dark gray for readability
  },
  scrollContainer: {
    flex: 1,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // White background for a clean look
    padding: 15,
    marginBottom: 15,
    borderRadius: 12,
    width: '100%',
    height: 120,
    justifyContent: 'space-between',
    borderWidth: 2, // Border width
    borderColor: '#E65100', // Dark orange border
    elevation: 6, // Shadow for visibility
  },
  buttonContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  buttonTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF6F00', // Orange for titles
  },
  buttonSubtitle: {
    fontSize: 14,
    color: '#666', // Gray for subtitles
  },
  buttonIcon: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
});

export default TherapyButton;
