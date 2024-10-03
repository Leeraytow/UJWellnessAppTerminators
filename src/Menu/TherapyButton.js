import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Header from './Header';
import Footer from './Footer';

const TherapyButton = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header style={styles.header} />
      <Text style={styles.title}>
        You Deserve to Be Happy
      </Text>

      <Text style={styles.subtitle}>
        What Type of Therapy Are You Looking For?
      </Text>

      <ScrollView style={styles.scrollContainer} contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('DigitalDiary')}
          >
            <View style={styles.buttonContent}>
              <Text style={styles.buttonTitle}>
                Digital Diary
              </Text>
              <Text style={styles.buttonSubtitle}>
                Write in Journal
              </Text>
            </View>
            <Image source={require('../images/DigitalDiary.png')} style={styles.buttonIcon} /> 
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('OnlineTherapy')}
          >
            <View style={styles.buttonContent}>
              <Text style={styles.buttonTitle}>
                Online Therapy
              </Text>
              <Text style={styles.buttonSubtitle}>
                Meet with a Professional on a Video Call
              </Text>
            </View>
            <Image source={require('../images/OnlineTherapy.jpg')} style={styles.buttonIcon} /> 
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('PeerCounseling')}
          >
            <View style={styles.buttonContent}>
              <Text style={styles.buttonTitle}>
                Peer2Peer Counseling
              </Text>
              <Text style={styles.buttonSubtitle}>
                Casual Conversation with a Peer
              </Text>
            </View>
            <Image source={require('../images/PeerToPeer2.png')} style={styles.buttonIcon} /> 
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Footer style={styles.footer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingTop: 20,
    // Removed horizontal padding to allow full-width header and footer
  },
  header: {
    width: '100%',
    backgroundColor: '#D86A3E', // Ensure header has a background color
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#D86A3E', // UJ Orange
    textAlign: 'center',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333333', // Dark Grey
    textAlign: 'center',
    marginBottom: 20,
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
    padding: 30,
    marginBottom: 30,
    borderRadius: 30,
    backgroundColor: '#FFFFFF', 
    borderColor: '#D86A3E', 
    borderWidth: 2,
    elevation: 5, 
  },
  buttonContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  buttonTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#D86A3E', 
  },
  buttonSubtitle: {
    fontSize: 14,
    color: '#666666',
  },
  buttonIcon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  footer: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D86A3E', 
  },
});

export default TherapyButton;
