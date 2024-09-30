import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../Configuration/firebase'; // Adjust the import path to your Firebase config file
import moment from 'moment';

const PastAppointments = () => {
  const [pastAppointments, setPastAppointments] = useState([]);

  useEffect(() => {
    const fetchPastAppointments = async () => {
      try {
        // Get today's date to filter past appointments
        const today = moment().format('YYYY-MM-DD');

        // Query to get appointments where the date has passed
        const bookingsCollection = collection(db, 'Bookings');
        const pastQuery = query(bookingsCollection, where('meetingDate', '<', today), where('status', '==', 'Confirmed'));
        const pastSnapshot = await getDocs(pastQuery);

        // Map over the results and prepare the data
        const appointments = pastSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setPastAppointments(appointments);
      } catch (error) {
        console.error('Error fetching past appointments:', error);
      }
    };

    fetchPastAppointments();
  }, []);

  const handleCompleteAppointment = async (appointmentId) => {
    try {
      // Update the appointment status to "Completed"
      const appointmentRef = doc(db, 'Bookings', appointmentId);
      await updateDoc(appointmentRef, {
        status: 'Completed'
      });

      // Filter out the completed appointment from the list
      setPastAppointments(prevAppointments => prevAppointments.filter(appointment => appointment.id !== appointmentId));
    } catch (error) {
      console.error('Error updating appointment status:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Past Appointments</Text>
      {pastAppointments.length > 0 ? (
        pastAppointments.map((appointment, index) => (
          <View key={index} style={styles.appointmentContainer}>
            <Text style={styles.text}>Student Email: {appointment.email}</Text>
            <Text style={styles.text}>Meeting Date: {moment(appointment.meetingDate).format('MMMM D, YYYY')}</Text>
            <Text style={styles.text}>Meeting Time: {appointment.meetingTime}</Text>
            <Text style={styles.text}>Venue: {appointment.venue || appointment.googleMeetLink}</Text>
            <TouchableOpacity
              style={styles.completeButton}
              onPress={() => handleCompleteAppointment(appointment.id)}
            >
              <Text style={styles.buttonText}>Completed</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text style={styles.noAppointmentsText}>No past appointments available.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  appointmentContainer: {
    padding: 16,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    elevation: 2,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  completeButton: {
    marginTop: 10,
    backgroundColor: '#FF8C00',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  noAppointmentsText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
    color: '#666',
  },
});

export default PastAppointments;
