import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Footer from '../Menu/Footer';
import Header from '../Menu/Header';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../Configuration/firebase'; 

const AppointmentsScreen = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const user = auth.currentUser; 
      if (!user) {
        console.log("No user is logged in.");
        return;
      }

      const email = user.email; 
      console.log('User Email:', email); 

      const appointmentsRef = collection(db, 'Bookings');
      const q = query(
        appointmentsRef,
        where('email', '==', email),
        where('status', '==', 'Confirmed') // Only show confirmed appointments
      );

      try {
        const querySnapshot = await getDocs(q);
        const fetchedAppointments = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedAppointments.push({
            id: doc.id,
            date: data.meetingDate,
            time: data.meetingTime,
            sessionType: data.meetingType, 
            meetingPlace: data.venue,// Make sure to map this field correctly
          });
        });
        console.log('Fetched Appointments:', fetchedAppointments); // Debugging output
        setAppointments(fetchedAppointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  const renderAppointment = ({ item }) => (
    <View style={styles.appointmentItem}>
      <Text style={styles.dateText}>{item.date}</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.timeText}>{item.time}</Text>
        <Text style={styles.sessionText}>{item.sessionType}</Text>
        <Text style={styles.sessionText}>{item.meetingPlace}</Text>

      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header />
        <LinearGradient colors={['#FC9842', '#FE5F75']} style={styles.contentContainer}>
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
    color: 'black',
    textAlign: 'center',
  },
  appointmentItem: {
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 10,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 2 },
    elevation: 20,
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
