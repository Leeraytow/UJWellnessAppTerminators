import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Footer from '../Menu/Footer';
import Header from '../Menu/Header';

const appointments = [
  { id: '1', date: '2024-10-01', time: '10:00 AM', sessionType: 'Online' },
  { id: '2', date: '2024-10-05', time: '1:00 PM', sessionType: 'Face-to-Face' },
];

const AppointmentsScreen = () => {
  const renderAppointment = ({ item }) => (
    <View style={styles.appointmentItem}>
      <Text style={styles.dateText}>{item.date}</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.timeText}>{item.time}</Text>
        <Text style={styles.sessionText}>{item.sessionType}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header />
        <LinearGradient colors={['#E0B0FF', '#8ec5fc']} style={styles.contentContainer}>
          <Text style={styles.headerText}>Appointments</Text>
          <FlatList
            data={appointments}
            renderItem={renderAppointment}
            keyExtractor={(item) => item.id}
          />
        </LinearGradient>
        <Footer />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'purple',
    textAlign: 'center',
  },
  appointmentItem: {
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 10, // Reduced shadow opacity for subtlety
    shadowRadius: 18,    // Reduced shadow radius
    shadowOffset: { width: 0, height: 2 }, // Added offset for depth
    elevation: 20,       // Reduced elevation for a lighter effect
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  detailsContainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5A5A5A',
  },
  timeText: {
    fontSize: 16,
    color: '#720e9e',
  },
  sessionText: {
    fontSize: 16,
    color: '#888888',
  },
});

export default AppointmentsScreen;
