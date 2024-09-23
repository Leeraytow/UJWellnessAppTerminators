import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, TextInput, Platform, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { collection, query, getDocs, where } from 'firebase/firestore'; // Firestore methods
import { db } from '../Configuration/firebase'; // Adjust the import path to your Firebase config file

const Dashboard = () => {
  const [pendingAppointments, setPendingAppointments] = useState(0);
  const [confirmedAppointments, setConfirmedAppointments] = useState(0);
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation(); // Initialize navigation
  const currentDate = moment().format('MMMM D, YYYY');

  // Fetch appointments and students
  useEffect(() => {
    const fetchAppointmentsAndStudents = async () => {
      try {
        // Fetch pending appointments
        const bookingsCollection = collection(db, 'Bookings');
        const pendingQuery = query(bookingsCollection, where('status', '==', 'pending'));
        const pendingSnapshot = await getDocs(pendingQuery);
        setPendingAppointments(pendingSnapshot.size); // Set pending appointments count

        // Fetch confirmed appointments
        const confirmedQuery = query(bookingsCollection, where('status', '==', 'Confirmed'));
        const confirmedSnapshot = await getDocs(confirmedQuery);
        const confirmedBookings = confirmedSnapshot.docs.map(doc => doc.data());
        setConfirmedAppointments(confirmedSnapshot.size); // Set confirmed appointments count

        // Fetch students
        const studentsCollection = collection(db, 'Students');
        const studentsSnapshot = await getDocs(studentsCollection);
        const studentList = studentsSnapshot.docs.map(doc => {
          const studentData = doc.data();
          // Find confirmed booking for the student
          const studentBooking = confirmedBookings.find(booking => booking.studentNumber === studentData.studentNumber);
          
          // Add session time if booking exists
          if (studentBooking) {
            studentData.sessionTime = moment(studentBooking.meetingTime).format('MMMM D, YYYY h:mm A');
          } else {
            studentData.sessionTime = 'No session';
          }

          return studentData;
        });
        setStudents(studentList); // Set students state
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchAppointmentsAndStudents();
  }, []); // Fetch only once on component mount

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStudentClick = (student) => {
    // Add your logic to handle student click if needed
    console.log('Student clicked:', student);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Icon name="menu" size={24} color="#fff" />
        <Text style={styles.title}>Dashboard</Text>
        <Icon name="account-circle" size={24} color="#fff" />
      </View>

      <Text style={styles.dateDisplay}>{currentDate}</Text>

      <TextInput
        style={styles.searchBar}
        placeholder="Search for a student by name..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <View style={styles.statsContainer}>
        <TouchableOpacity style={styles.statBox} onPress={() => navigation.navigate("TherapistAppointments")}>
          <Text style={styles.statNumber}>{confirmedAppointments}</Text>
          <Text style={styles.statLabel}>Appointments</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statBox}>
          <Text style={styles.statNumber}>18</Text>
          <Text style={styles.statLabel}>Patient Diaries</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statBox} onPress={() => navigation.navigate("ConfirmMeeting")}>
          <Text style={styles.statNumber}>{pendingAppointments}</Text>
          <Text style={styles.statLabel}>Pending Appointments</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statBox}>
          <Text style={styles.statNumber}>{students.length}</Text>
          <Text style={styles.statLabel}>Mood Logs</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>Student</Text>
        <Text style={styles.tableHeaderText}>Mood</Text>
        <Text style={styles.tableHeaderText}>Session Time</Text>
      </View>

      <View style={styles.patientTable}>
        {filteredStudents.map((student, index) => (
          <TouchableOpacity key={index} style={styles.tableRow} onPress={() => handleStudentClick(student)}>
            <View style={styles.patientCell}>
              <Image source={{ uri: student.profileImage }} style={styles.patientImage} />
              <Text style={styles.patientName}>{student.name}</Text>
            </View>
            <View style={styles.moodCell}>
              <Text style={styles.moodEmoji}>{getMoodEmoji(student.mood)}</Text>
            </View>
            <Text style={styles.sessionTimeCell}>{student.sessionTime}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const getMoodEmoji = (mood) => {
  if (mood >= 8) return '😃';
  if (mood >= 6) return '😊';
  if (mood >= 4) return '😐';
  if (mood >= 2) return '😟';
  return '😢';
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FF8C00', // Dark orange color
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  dateDisplay: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginVertical: 10,
    color: '#000',
  },
  searchBar: {
    backgroundColor: '#FFCC99',
    borderRadius: 8,
    padding: 10,
    margin: 16,
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
  },
  statBox: {
    width: '48%',
    backgroundColor: '#FF8C00',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  statLabel: {
    fontSize: 14,
    color: '#000',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FF8C00',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  tableHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    width: '33%',
    textAlign: 'center',
  },
  patientTable: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    paddingVertical: 8,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  patientCell: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
  },
  patientImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  patientName: {
    fontSize: 14,
    color: '#000',
    flex: 1,
  },
  moodCell: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
  },
  moodEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  sessionTimeCell: {
    width: '20%',
    textAlign: 'center',
    fontSize: 12,
    color: '#000',
  },
});

export default Dashboard;
