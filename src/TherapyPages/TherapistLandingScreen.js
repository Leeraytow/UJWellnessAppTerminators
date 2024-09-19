import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ClientsPage from "../ClientsPage/ClientsPage"
import Header from '../Menu/Header';

export default function TherapistLandingScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ImageBackground source={require('../images/w.png')} style={styles.background}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.mainContent}>
            <View style={styles.appointmentsWrapper}>
              <Text style={styles.welcomeText}>Welcome Therapist!</Text>
              <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
              <View style={styles.appointmentsContainer}>
                <TouchableOpacity 
                  style={styles.appointmentItem}
                  onPress={() => navigation.navigate('UpcomingAppointment')}
                >
                  <Text style={styles.appointmentText}>Leece Precious - May 10, 2024 - 10:00 AM</Text>
                  <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.addButtonText}>+</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.additionalContent}>
              <Image source={require('../images/Ttherapist.png')} style={styles.additionalImage} />
            </View>
          </View>
        </ScrollView>
        <View style={styles.tabContainer}>
          <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('TherapyProfile')}>
            <Image source={require('../images/Tprofile.png')} style={styles.tabIcon} />
            <Text style={styles.tabButtonText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('TherapistAppointments')}>
            <Image source={require('../images/Tresource.png')} style={styles.tabIcon} />
            <Text style={styles.tabButtonText}>Resources</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('Appointments')}>
            <Image source={require('../images/Tappointment.png')} style={styles.tabIcon} />
            <Text style={styles.tabButtonText}>Appointments</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('ChatTherapist')}>
            <Image source={require('../images/Tchat.png')} style={styles.tabIcon} />
            <Text style={styles.tabButtonText}>Chat</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 80,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    width: '100%',
  },
  logoContainer: {
    alignItems: 'flex-end',
  },
  logo: {
    width: 70,
    height: 70,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    paddingBottom: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appointmentsWrapper: {
    backgroundColor: '#FF6F00',
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
    alignSelf: 'stretch',
    padding: 10,
    width: '90%',
    alignItems: 'center',
  },
  appointmentsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  appointmentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  appointmentText: {
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#FFA500',
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 20,
    color: 'white',
  },
  additionalContent: {
    marginBottom: 20,
    alignItems: 'center',
  },
  additionalImage: {
    width: 200,
    height: 100,
    borderRadius: 10,
  },
  menuButton: {
    padding: 10,
  },
  menuIcon: {
    left: -45,
    width: 70,
    height: 70,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#DDD',
    paddingVertical: 10,
    width: '100%',
  },
  tabButton: {
    alignItems: 'center',
  },
  tabIcon: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },
  tabButtonText: {
    fontSize: 12,
  },
});
