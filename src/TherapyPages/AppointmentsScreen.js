import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Linking } from 'react-native';
import { format, addDays, isSameDay } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { auth, db } from '../Configuration/firebase'; // Ensure your firebase configuration is correct
import { collection, query, where, getDocs } from 'firebase/firestore';

const Appointments = () => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const therapistEmail = auth.currentUser.email;
        
        const bookingsCollection = collection(db, 'Bookings');
        const confirmedQuery = query(
          bookingsCollection,
          where('status', '==', 'Confirmed'), 
          where('therapistEmail', '==', therapistEmail)
        );

        const confirmedSnapshot = await getDocs(confirmedQuery);
        const fetchedAppointments = confirmedSnapshot.docs.map(async doc => {
          const appointmentData = { id: doc.id, ...doc.data() };

          const studentsCollection = collection(db, 'Students');
          const studentQuery = query(studentsCollection, where('email', '==', appointmentData.email));
          const studentSnapshot = await getDocs(studentQuery);
          
          if (!studentSnapshot.empty) {
            const studentData = studentSnapshot.docs[0].data();
            appointmentData.profileImage = studentData.profileImage;
          }

          return appointmentData;
        });

        const appointmentsWithImages = await Promise.all(fetchedAppointments);
        setAppointments(appointmentsWithImages);
      } catch (error) {
        console.error('Error fetching appointments: ', error);
      }
    };

    fetchAppointments();
  }, []);

  const renderDateNavigator = () => {
    const dates = [...Array(5)].map((_, index) => addDays(new Date(), index));

    return (
      <View style={styles.dateNavigatorContainer}>
        <Text style={styles.upcomingText}></Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.dateNavigator}
        >
          {dates.map((date) => (
            <TouchableOpacity
              key={date.toString()}
              style={[
                styles.dateButton,
                isSameDay(selectedDate, date) && styles.selectedDate,
              ]}
              onPress={() => setSelectedDate(date)}
            >
              <Text
                style={[
                  styles.dayName,
                  isSameDay(selectedDate, date) && styles.selectedDateText,
                ]}
              >
                {format(date, 'EEE')}
              </Text>
              <Text
                style={[
                  styles.date,
                  isSameDay(selectedDate, date) && styles.selectedDateText,
                ]}
              >
                {format(date, 'd')}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  const renderAppointmentCard = (appointment) => {
    const appointmentDate = new Date(appointment.selectedDate.replace(/\//g, '-'));

    return isSameDay(appointmentDate, selectedDate) && (
      <View key={appointment.id} style={styles.appointmentCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.time}>{appointment.time}</Text>
        </View>

        <View style={styles.cardContent}>
          <View style={styles.avatarContainer}>
            {appointment.profileImage ? (
              <Image source={{ uri: appointment.profileImage }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>
                  {appointment.name.split(' ').map((n) => n[0]).join('')}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.detailsContainer}>
            <Text style={styles.studentName}>{appointment.name}</Text> 
            <Text style={styles.detailText}>
              Venue/Link: 
              {appointment.meetingType === 'Online' ? (
                <TouchableOpacity onPress={() => Linking.openURL(appointment.meetingLink)}>
                  <Text style={[styles.linkText, { color: 'blue' }]}>
                    {appointment.meetingLink || 'No Link Provided'}
                  </Text>
                </TouchableOpacity>
              ) : (
                appointment.venue || 'No Venue Provided'
              )}
            </Text>
            <Text style={styles.detailText}>Status: {appointment.status}</Text>
            <Text style={styles.detailText}>Email: {appointment.email}</Text>
            <Text style={styles.detailText}>Duration: {appointment.duration}</Text>
            <Text style={styles.detailText}>Special Request: {appointment.specialRequest}</Text>
            <Text style={styles.detailText}>Meeting Type: {appointment.meetingType}</Text>
          </View>
        </View>

        {appointment.meetingType === 'Online' && (
          <TouchableOpacity 
            style={styles.joinButton}
            onPress={() => Linking.openURL(appointment.meetingLink)}
          >
            <Text style={styles.joinButtonText}>Join Session</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };


  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.header}>Appointments</Text>
      </View>

      {renderDateNavigator()}

      <ScrollView style={styles.appointmentsList}>
        {appointments.map(renderAppointmentCard)}
      </ScrollView>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF8C00',
    paddingVertical: 12,
    marginTop: 45,
    paddingHorizontal: 10,
    width: '140%',
    position: 'relative',
    left: '-2%',
  },
  backButton: {
    marginRight: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  dateNavigatorContainer: {
    marginBottom: 20,
  },
  upcomingText: {
    fontSize: 20,
    color: '#666',
    marginBottom: 10,
    fontWeight: '600',
  },
  dateNavigator: {
    flexDirection: 'row',
  },
  dateButton: {
    width: 70,
    height: 80,
    backgroundColor: '#FFF5E6',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    padding: 15,
    elevation: 2,
  },
  selectedDate: {
    backgroundColor: '#FF8C00',
  },
  dayName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  date: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  selectedDateText: {
    color: '#fff',
  },
  appointmentsList: {
    flex: 1,
  },
  appointmentCard: {
    backgroundColor: '#FFF5E6',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  time: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF8C00',
  },
  cardContent: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  linkText: {
    textDecorationLine: 'underline', 
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FF8C00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailsContainer: {
    flex: 1,
  },
  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  joinButton: {
    backgroundColor: '#FF8C00',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'center',
  },
  joinButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Appointments;
