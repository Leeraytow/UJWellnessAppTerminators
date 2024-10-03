import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from './Header';
import Footer from './Footer';

const TherapyButton = ({ navigation }) => {
  const therapyOptions = [
    {
      title: 'Digital Diary',
      subtitle: 'Write in Journal',
      image: require('../images/DigitalDiary.png'),
      route: 'DigitalDiary',
    },
    {
      title: 'Online Therapy',
      subtitle: 'Meet with a Professional on a Video Call',
      image: require('../images/OnlineTherapy.jpg'),
      route: 'BookingForm',
    },
    {
      title: 'Peer2Peer Counseling',
      subtitle: 'Casual Conversation with a Peer',
      image: require('../images/PeerToPeer2.png'),
      route: 'PeerCounseling',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header style={styles.header} />
      <LinearGradient
        colors={['#FFF6F2', '#FFE3D8']}
        style={styles.gradient}
      >
        <Text style={styles.title}>You Deserve to Be Happy</Text>
        <Text style={styles.subtitle}>What Type of Therapy Are You Looking For?</Text>

        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {therapyOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.button}
              onPress={() => navigation.navigate(option.route)}
            >
              <View style={styles.buttonContent}>
                <Text style={styles.buttonTitle}>{option.title}</Text>
                <Text style={styles.buttonSubtitle}>{option.subtitle}</Text>
              </View>
              <Image source={option.image} style={styles.buttonIcon} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </LinearGradient>
      <Footer style={styles.footer} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    width: '100%',
    backgroundColor: '#FF9052',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF7A45',
    textAlign: 'center',
    marginVertical: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#555555',
    textAlign: 'center',
    marginBottom: 30,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    borderColor: '#FF9052',
    borderWidth: 1,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonContent: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FF9052',
    marginBottom: 5,
  },
  buttonSubtitle: {
    fontSize: 14,
    color: '#888888',
  },
  buttonIcon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginLeft: 15,
  },
  footer: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF9052',
  },
});

export default TherapyButton;