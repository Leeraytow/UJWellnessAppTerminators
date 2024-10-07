import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';
import Footer from './Footer';
import Header from './Header';
import { collection, query, getDocs, where, doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../Configuration/firebase'; // Import auth

const IconPlaceholder = ({ color }) => (
  <View style={[styles.iconPlaceholder, { backgroundColor: color }]} />
);

const Dashboard = ({ navigation }) => {
  const [appointments, setAppointments] = useState({});
  const [selectedDate, setSelectedDate] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState(''); // Default image
  const [pendingAppointments, setPendingAppointments] = useState(0);
  const [confirmedAppointments, setConfirmedAppointments] = useState(0);
  const [studentsWithBookings, setStudentsWithBookings] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]); // New state for upcoming appointments
  const [searchQuery, setSearchQuery] = useState('');
  const currentDate = new Date();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const user = auth.currentUser;
        if (user) {
          const userRef = doc(db, 'Students', user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const userData = userSnap.data();
            setUsername(userData.name || '');
            setEmail(userData.email || '');
            setProfileImage(userData.profileImage );
          } else {
            console.log('User not found in the Students collection.');
          }
        }
  
        // Fetch pending appointments count
        const bookingsCollection = collection(db, 'Bookings');
        const pendingQuery = query(bookingsCollection, where('status', '==', 'Pending'), where('therapistEmail', '==', user.email));
        const pendingSnapshot = await getDocs(pendingQuery);
        setPendingAppointments(pendingSnapshot.size); // Set pending appointments count
  
        // Fetch confirmed appointments where therapistEmail matches the current user's email
        const confirmedQuery = query(bookingsCollection, where('status', '==', 'Confirmed'), where('therapistEmail', '==', user.email));
        const confirmedSnapshot = await getDocs(confirmedQuery);
        const confirmedBookings = confirmedSnapshot.docs.map(doc => doc.data());
  
        const updatedStudentsWithBookings = [];
        const upcomingAppointmentsList = [];
  
        for (const booking of confirmedBookings) {
          const studentEmail = `${booking.studentNumber}@student.uj.ac.za`;
          const studentQuery = query(collection(db, 'Students'), where('email', '==', studentEmail));
          const studentSnapshot = await getDocs(studentQuery);
  
          if (!studentSnapshot.empty) {
            const studentData = studentSnapshot.docs[0].data();
            const appointmentInfo = {
              ...studentData,
              sessionTime: booking.meetingTime, // Ensure you are capturing meetingTime correctly
              sessionDate: booking.meetingDate, // Ensure you are capturing meetingDate correctly
              venue: booking.venue,
              id: booking.id, // Include booking ID if needed
            };
            updatedStudentsWithBookings.push(appointmentInfo);
            upcomingAppointmentsList.push({
              studentName: studentData.name,
              date: booking.selectedDate, // Using meetingDate directly
              time: booking.time, // Using meetingTime directly
              avatar: studentData.profileImage || 'https://i.pravatar.cc/100?img=1', // Fallback image if none
              id: booking.id,
            });
          }
        }
  
        setStudentsWithBookings(updatedStudentsWithBookings);
        setUpcomingAppointments(upcomingAppointmentsList); // Update upcoming appointments
        setConfirmedAppointments(updatedStudentsWithBookings.length); // Set confirmed appointments count
  
        // Fetch all appointments for the current therapist
        const appointmentsQuery = query(bookingsCollection, where('therapistEmail', '==', user.email));
        const querySnapshot = await getDocs(appointmentsQuery);
        const appointmentsData = {};
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const meetingDate = data.meetingDate; // Using the stored date string directly
          if (!appointmentsData[meetingDate]) {
            appointmentsData[meetingDate] = [];
          }
          appointmentsData[meetingDate].push({
            ...data,
            id: doc.id, // optional, if you want to keep track of doc id
          });
        });
        setAppointments(appointmentsData);
  
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
  
    fetchData();
  }, []);
  

  const filteredStudents = studentsWithBookings.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const renderAppointment = (appointment) => (
    <TouchableOpacity
      key={appointment.id} // Ensure each appointment has a unique key
      style={styles.appointmentCard}
      onPress={() => navigation.navigate('Appointments')}
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
            <Text style={styles.greeting}>Welcome back, {username}</Text>
            <Text style={styles.dateTime}>{formatDate(currentDate)}</Text>
            <Text style={styles.dateTime}>{formatTime(currentDate)}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
      <Image
        source={{ uri: profileImage || 'https://i.pravatar.cc/100?img=1' }} // Use a default image if profileImage is empty
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
            <Text style={styles.statNumber}>{confirmedAppointments}</Text>
            <Text style={styles.statLabel}>Appointments</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.statCard}
            onPress={() => navigation.navigate('PendingAppointments')}
          >
            <IconPlaceholder color="#FFA726" />
            <Text style={styles.statNumber}>{pendingAppointments}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.statCard}
            onPress={() => navigation.navigate('History')}
          >
            <IconPlaceholder color="#FFB74D" />
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>History</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Calendar</Text>
          <Calendar
            markedDates={markedDates}
            onDayPress={(day) => {
              setSelectedDate(day.dateString);
              navigation.navigate('Appointments', { date: day.dateString });
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
  {upcomingAppointments.length === 0 ? (
    <Text style={styles.noAppointmentsText}>No upcoming appointments</Text>
  ) : (
    upcomingAppointments.slice(0, 3).map(appointment => renderAppointment(appointment)) // Correctly pass appointment to renderAppointment
  )}
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
  },
  dateTime: {
    fontSize: 14,
    color: '#FF6F00',
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
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
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E65100',
  },
  statLabel: {
    fontSize: 14,
    color: '#FF6F00',
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
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  appointmentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E65100',
  },
  appointmentDetails: {
    fontSize: 14,
    color: '#FF6F00',
  },
  iconPlaceholder: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginBottom: 5,
  },
});

export default Dashboard;