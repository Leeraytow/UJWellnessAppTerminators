import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Footer from './Footer'; 
import { ThemeContext } from '../StudentProfile/ThemeContext'; // Import ThemeContext

const TherapyButton = ({ navigation }) => {
  const { isDarkMode } = useContext(ThemeContext); // Get the dark mode state

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#222' : '#FAFAFA' }]}>
      <View style={[styles.header, { backgroundColor: isDarkMode ? '#333' : '#FAFAFA' }]}>
        <Image source={require('../images/Icon.png')} style={styles.logo} />
        <TouchableOpacity style={styles.menuIcon}>
          <Text style={[styles.menuText, { color: isDarkMode ? '#FFF' : '#FF6F00' }]}>☰</Text>
        </TouchableOpacity>
      </View>
      <Text style={[styles.title, { color: isDarkMode ? '#FF6F00' : '#FF6F00' }]}>You Deserve to Be Happy</Text>
      <Text style={[styles.subtitle, { color: isDarkMode ? '#ccc' : '#333' }]}>What Type of Therapy Are You Looking For?</Text>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: isDarkMode ? '#333' : '#FFFFFF', borderColor: isDarkMode ? '#666' : '#E65100' }]} 
            onPress={() => navigation.navigate('DigitalDiary')}
          >
            <View style={styles.buttonContent}>
              <Text style={[styles.buttonTitle, { color: isDarkMode ? '#FF6F00' : '#FF6F00' }]}>Digital Diary</Text>
              <Text style={[styles.buttonSubtitle, { color: isDarkMode ? '#aaa' : '#666' }]}>Write in Journal</Text>
            </View>
            <Image source={require('../images/MainPage.png')} style={styles.buttonIcon} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, { backgroundColor: isDarkMode ? '#333' : '#FFFFFF', borderColor: isDarkMode ? '#666' : '#E65100' }]} 
            onPress={() => navigation.navigate('OnlineTherapy')}
          >
            <View style={styles.buttonContent}>
              <Text style={[styles.buttonTitle, { color: isDarkMode ? '#FF6F00' : '#FF6F00' }]}>Online Therapy</Text>
              <Text style={[styles.buttonSubtitle, { color: isDarkMode ? '#aaa' : '#666' }]}>Meet with a Professional</Text>
              <Text style={[styles.buttonSubtitle, { color: isDarkMode ? '#aaa' : '#666' }]}>on a Video Call</Text>
            </View>
            <Image source={require('../images/EntryDiary.png')} style={styles.buttonIcon} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, { backgroundColor: isDarkMode ? '#333' : '#FFFFFF', borderColor: isDarkMode ? '#666' : '#E65100' }]} 
            onPress={() => navigation.navigate('PeerCounseling')}
          >
            <View style={styles.buttonContent}>
              <Text style={[styles.buttonTitle, { color: isDarkMode ? '#FF6F00' : '#FF6F00' }]}>Peer2Peer Counseling</Text>
              <Text style={[styles.buttonSubtitle, { color: isDarkMode ? '#aaa' : '#666' }]}>Casual Conversation with a Peer</Text>
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
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginVertical: 10,
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
    padding: 15,
    marginBottom: 15,
    borderRadius: 12,
    width: '100%',
    height: 120,
    justifyContent: 'space-between',
    borderWidth: 2,
    elevation: 6,
  },
  buttonContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  buttonTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  buttonSubtitle: {
    fontSize: 14,
  },
  buttonIcon: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
});

export default TherapyButton;
