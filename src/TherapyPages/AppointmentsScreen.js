import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { format, addDays } from 'date-fns';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the back arrow

const Appointments = () => {
  const navigation = useNavigation(); // Use the navigation hook
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Sample appointment data
  const appointments = [
    {
      id: '1',
      studentName: 'Emma Thompson',
      date: '2024-10-05',
      time: '14:00',
      avatar: 'https://i.pravatar.cc/100?img=1',
      details: {
        year: '2nd year',
        major: 'Psychology',
        concern: 'Anxiety management',
        notes: 'Emma is seeking guidance for managing anxiety during exams.'
      }
    },
    {
      id: '2',
      studentName: 'Liam Parker',
      date: '2024-10-06',
      time: '15:30',
      avatar: 'https://i.pravatar.cc/100?img=2',
      details: {
        year: '3rd year',
        major: 'Mechanical Engineering',
        concern: 'Stress',
        notes: 'Liam is experiencing stress related to coursework deadlines and time management.'
      }
    },
    {
      id: '3',
      studentName: 'Sophia Chen',
      date: '2024-10-07',
      time: '10:00',
      avatar: 'https://i.pravatar.cc/100?img=3',
      details: {
        year: '1st year',
        major: 'Business Management',
        concern: 'Homesickness',
        notes: 'Sophia is struggling with homesickness and adjustment to university life.'
      }
    }
  ];

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
                selectedDate.toDateString() === date.toDateString() && styles.selectedDate,
              ]}
              onPress={() => setSelectedDate(date)}
            >
              <Text
                style={[
                  styles.dayName,
                  selectedDate.toDateString() === date.toDateString() && styles.selectedDateText,
                ]}
              >
                {format(date, 'EEE')}
              </Text>
              <Text
                style={[
                  styles.date,
                  selectedDate.toDateString() === date.toDateString() && styles.selectedDateText,
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

  const renderAppointmentCard = (appointment) => (
    <View key={appointment.id} style={styles.appointmentCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.time}>{appointment.time}</Text>
      </View>

      <View style={styles.cardContent}>
        <View style={styles.avatarContainer}>
          {appointment.avatar ? (
            <Image source={{ uri: appointment.avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>
                {appointment.studentName.split(' ').map((n) => n[0]).join('')}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.studentName}>{appointment.studentName}</Text>
          <Text style={styles.detailText}>Year: {appointment.details.year}</Text>
          <Text style={styles.detailText}>Major: {appointment.details.major}</Text>
          <Text style={styles.detailText}>Concern: {appointment.details.concern}</Text>
          <Text style={styles.detailText}>Notes: {appointment.details.notes}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.joinButton}>
        <Text style={styles.joinButtonText}>Join Session</Text>
      </TouchableOpacity>
    </View>
  );

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
    width: '140%',  // Stretch header to 140% of the screen width
    position: 'relative', // Optional
    left: '-2%',  // Move it left to center it
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
