import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Footer from './Footer';
import Header from './Header';
import { ThemeContext } from '../StudentProfile/ThemeContext'; // Import ThemeContext

const TherapyButton = ({ navigation }) => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#1E1E1E' : '#F8F9FA' }]}>
      
      {/* Header at the top */}
      <Header navigation={navigation} />

      {/* Title */}
      <Text style={[styles.title, { color: isDarkMode ? '#FF6F00' : '#FF6F00' }]}>
        You Deserve to Be Happy
      </Text>

      {/* Subtitle */}
      <Text style={[styles.subtitle, { color: isDarkMode ? '#CCCCCC' : '#444444' }]}>
        What Type of Therapy Are You Looking For?
      </Text>

      {/* Scrollable content */}
      <ScrollView style={styles.scrollContainer} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.buttonContainer}>
          
          {/* Digital Diary Button */}
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: isDarkMode ? '#2C2C2C' : '#FFFFFF', borderColor: isDarkMode ? '#555555' : '#FF6F00' }]} 
            onPress={() => navigation.navigate('DigitalDiary')}
          >
            <View style={styles.buttonContent}>
              <Text style={[styles.buttonTitle, { color: isDarkMode ? '#FF6F00' : '#FF6F00' }]}>
                Digital Diary
              </Text>
              <Text style={[styles.buttonSubtitle, { color: isDarkMode ? '#AAAAAA' : '#666666' }]}>
                Write in Journal
              </Text>
            </View>
            <Image source={require('../images/MainPage.png')} style={styles.buttonIcon} />
          </TouchableOpacity>

          {/* Online Therapy Button */}
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: isDarkMode ? '#2C2C2C' : '#FFFFFF', borderColor: isDarkMode ? '#555555' : '#FF6F00' }]} 
            onPress={() => navigation.navigate('BookingForm')}
          >
            <View style={styles.buttonContent}>
              <Text style={[styles.buttonTitle, { color: isDarkMode ? '#FF6F00' : '#FF6F00' }]}>
                Therapy
              </Text>
              <Text style={[styles.buttonSubtitle, { color: isDarkMode ? '#AAAAAA' : '#666666' }]}>
                Book an Appointment with a Therapist
              </Text>
            </View>
            <Image source={require('../images/EntryDiary.png')} style={styles.buttonIcon} />
          </TouchableOpacity>

          {/* Peer2Peer Counseling Button */}
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: isDarkMode ? '#2C2C2C' : '#FFFFFF', borderColor: isDarkMode ? '#555555' : '#FF6F00' }]} 
            onPress={() => navigation.navigate('PeerCounseling')}
          >
            <View style={styles.buttonContent}>
              <Text style={[styles.buttonTitle, { color: isDarkMode ? '#FF6F00' : '#FF6F00' }]}>
                Peer2Peer Counseling
              </Text>
              <Text style={[styles.buttonSubtitle, { color: isDarkMode ? '#AAAAAA' : '#666666' }]}>
                Casual Conversation with a Peer
              </Text>
            </View>
            <Image source={require('../images/TherapyPage.png')} style={styles.buttonIcon} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Footer */}
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 15,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    marginBottom: 80,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 40,
    borderRadius: 15,
    width: '100%',
    height: 120,
    justifyContent: 'space-between',
    borderWidth: 2,
    elevation: 8, // Subtle shadow for more polish
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
    marginTop: 4,
  },
  buttonIcon: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
});

export default TherapyButton;
