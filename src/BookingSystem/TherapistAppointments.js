import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet, Modal, FlatList } from 'react-native';
import { collection, query, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../Configuration/firebase';
import { ThemeContext } from '../StudentProfile/ThemeContext';
import { Calendar } from 'react-native-calendars';

const TherapistAppointments = () => {
  const [appointments, setAppointments] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedAppointments, setSelectedAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const q = query(collection(db, 'Bookings'));
        const querySnapshot = await getDocs(q);

        const appointmentsData = {};
        querySnapshot.forEach(doc => {
          const data = doc.data();
          const dateKey = new Date(data.meetingDate.seconds * 1000).toISOString().split('T')[0]; // Format to YYYY-MM-DD
          if (!appointmentsData[dateKey]) {
            appointmentsData[dateKey] = [];
          }
          appointmentsData[dateKey].push({ id: doc.id, ...data });
        });

        setAppointments(appointmentsData);
      } catch (error) {
        console.error("Error fetching appointments: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleDayPress = (day) => {
    const dateKey = day.dateString;
    setSelectedDate(dateKey);
    setSelectedAppointments(appointments[dateKey] || []);
    setShowModal(true);
  };

  const handleCompleteAppointment = async (appointmentId) => {
    try {
      const appointmentDoc = doc(db, 'Bookings', appointmentId);
      await updateDoc(appointmentDoc, { status: 'Completed' });
      setSelectedAppointments(prevAppointments =>
        prevAppointments.map(appt =>
          appt.id === appointmentId ? { ...appt, status: 'Completed' } : appt
        )
      );
    } catch (error) {
      console.error("Error updating appointment status: ", error);
    }
  };

  const renderAppointmentItem = ({ item }) => (
    <View style={styles.appointmentItem}>
      <Text>Time: {new Date(item.meetingTime.seconds * 1000).toLocaleTimeString()}</Text>
      <Text>Venue: {item.venue || 'Online'}</Text>
      <Text>Link: {item.googleMeetLink || 'N/A'}</Text>
      <Text>Status: {item.status}</Text>
      {item.status !== 'Completed' && (
        <Button title="Mark as Completed" onPress={() => handleCompleteAppointment(item.id)} />
      )}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#222' : '#fff' }]}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Calendar
            onDayPress={handleDayPress}
            markedDates={Object.keys(appointments).reduce((acc, date) => {
              acc[date] = { marked: true };
              return acc;
            }, {})}
            theme={{
              todayTextColor: '#00adf5',
              arrowColor: 'orange',
              monthTextColor: 'black',
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16
            }}
          />
          <Modal
            visible={showModal}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setShowModal(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Appointments for {selectedDate}</Text>
                <FlatList
                  data={selectedAppointments}
                  renderItem={renderAppointmentItem}
                  keyExtractor={(item) => item.id}
                />
                <Button title="Close" onPress={() => setShowModal(false)} />
              </View>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  appointmentItem: {
    marginBottom: 15,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 15,
  },
});

export default TherapistAppointments;
