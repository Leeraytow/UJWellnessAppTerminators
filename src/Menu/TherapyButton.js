import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Footer from './Footer'; 
const TherapyButton = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image source={require('../images/Icon.png')} style={styles.logo} />
        </View>
        <TouchableOpacity style={styles.menuIcon}>
          <Text style={styles.menuText}>☰</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>You deserve to be Happy</Text>
      <Text style={styles.subtitle}>What Type of Therapy are you looking for?</Text>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DigitalDiary')}>
            <View style={styles.buttonContent}>
              <Text style={styles.buttonTitle}>Digital Diary</Text>
              <Text style={styles.buttonSubtitle}>write on Journal</Text>
            </View>
            <Image source={require('../images/MainPage.png')} style={styles.buttonIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('OnlineTherapy')}>
            <View style={styles.buttonContent}>
              <Text style={styles.buttonTitle}>Online therapy</Text>
              <Text style={styles.buttonSubtitle}>Meet with a professional </Text>
              <Text style={styles.buttonSubtitle}>on a meeting</Text>
            </View>
            <Image source={require('../images/EntryDiary.png')} style={styles.buttonIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('PeerCounseling')}>
            <View style={styles.buttonContent}>
              <Text style={styles.buttonTitle}>Peer2Peer Counseling</Text>
              <Text style={styles.buttonSubtitle}>Meet with your peer mate</Text>
              <Text style={styles.buttonSubtitle}>have a casual Conversation</Text>
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
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 110,
    height: 100,
    marginLeft: -40,
  },
  menuIcon: {
    padding: 10,
  },
  menuText: {
    fontSize: 24,
  },
  title: {
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  scrollContainer: {
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FBF1D7',
    padding: 10,
    marginBottom: 30,
    borderRadius: 10,
    width: 300,
    height: 100,
    justifyContent: 'space-between',
  },
  button1: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F5DC',
    padding: 10,
    marginBottom: 30,
    borderRadius: 10,
    width: 300,
    height: 100,
    justifyContent: 'space-between',
  },
  button2: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0DCC8',
    padding: 10,
    marginBottom: 30,
    borderRadius: 10,
    width: 300,
    height: 100,
    justifyContent: 'space-between',
  },
  buttonContent: {
    flexDirection: 'column',
  },
  buttonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonSubtitle: {
    fontSize: 14,
    fontWeight: '300',
  },
  buttonIcon: {
    width: 130,
    height: 130,
  },
});

export default TherapyButton;
