import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';
import Footer from './Footer';
import Header from './Header';

const IconPlaceholder = ({ color }) => (
  <View style={[styles.iconPlaceholder, { backgroundColor: color }]} />
);

const Dashboard = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState('');

  const currentDate = new Date();
  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const upcomingAppointments = [
    { id: '1', studentName: 'Emma Thompson', date: '2024-10-05', time: '14:00', avatar: 'https://i.pravatar.cc/100?img=1' },
    { id: '2', studentName: 'Liam Parker', date: '2024-10-06', time: '15:30', avatar: 'https://i.pravatar.cc/100?img=2' },
    { id: '3', studentName: 'Sophia Chen', date: '2024-10-07', time: '10:00', avatar: 'https://i.pravatar.cc/100?img=3' },
  ];

  const renderAppointment = (appointment) => (
    <TouchableOpacity 
      key={appointment.id} 
      style={styles.appointmentCard}
      onPress={() => navigation.navigate('AppointmentDetails', { appointment })}
    >
      <Image source={{ uri: appointment.avatar }} style={styles.avatar} />
      <View style={styles.appointmentInfo}>
        <Text style={styles.studentName}>{appointment.studentName}</Text>
        <Text style={styles.appointmentDetails}>{appointment.date} at {appointment.time}</Text>
      </View>
    </TouchableOpacity>
  );

  const markedDates = upcomingAppointments.reduce((acc, curr) => {
    acc[curr.date] = { marked: true, dotColor: '#FF9800' };
    return acc;
  }, {});

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back, Dr. Smith</Text>
            <Text style={styles.dateTime}>{formatDate(currentDate)}</Text>
            <Text style={styles.dateTime}>{formatTime(currentDate)}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=60' }}
              style={styles.profilePic}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <TouchableOpacity 
            style={styles.statCard}
            onPress={() => navigation.navigate('Appointments')}
          >
            <IconPlaceholder color="#FF9800" />
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Appointments</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.statCard}
            onPress={() => navigation.navigate('PendingAppointments')}
          >
            <IconPlaceholder color="#FFA726" />
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.statCard}
            onPress={() => navigation.navigate('History')}
          >
            <IconPlaceholder color="#FFB74D" />
            <Text style={styles.statNumber}>45</Text>
            <Text style={styles.statLabel}>History</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Calendar</Text>
          <Calendar
            markedDates={markedDates}
            onDayPress={(day) => {
              setSelectedDate(day.dateString);
              navigation.navigate('DailyAppointments', { date: day.dateString });
            }}
            theme={{
              backgroundColor: '#FFF3E0',
              calendarBackground: '#FFF3E0',
              textSectionTitleColor: '#FF9800',
              selectedDayBackgroundColor: '#FF9800',
              selectedDayTextColor: '#FFFFFF',
              todayTextColor: '#FF5722',
              dayTextColor: '#FF6F00',
              textDisabledColor: '#FFCC80',
              dotColor: '#FF9800',
              selectedDotColor: '#FFFFFF',
              arrowColor: '#FF9800',
              monthTextColor: '#E65100',
              indicatorColor: '#FF9800',
            }}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
          {upcomingAppointments.map(renderAppointment)}
        </View>
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF3E0',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E65100',
    marginBottom: 5,
  },
  dateTime: {
    fontSize: 14,
    color: '#F57C00',
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#FF9800',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    width: '30%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconPlaceholder: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginBottom: 5,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E65100',
    marginTop: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#F57C00',
    marginTop: 2,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E65100',
    marginBottom: 10,
  },
  appointmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#FF9800',
  },
  appointmentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E65100',
    marginBottom: 3,
  },
  appointmentDetails: {
    fontSize: 14,
    color: '#F57C00',
  },
});

export default Dashboard;
