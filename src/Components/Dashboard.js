import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, TextInput,Platform,StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

const Dashboard = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation(); // Initialize navigation
  const currentDate = moment().format('MMMM D, YYYY');

  const patients = [
    { id: 1, name: 'Maya Nelson', mood: 8, sessionTime: '10:00 -11:00 am', image: require('../images/Black5.jpeg') },
    { id: 2, name: 'Ahmed Ehab', mood: 6, sessionTime: '11:00 -12:00 am', image: require('../images/Black2.jpeg') },
    { id: 3, name: 'Peter Parker', mood: 8, sessionTime: '01:00 -02:00 pm', image: require('../images/Black3.jpeg') },
    { id: 4, name: 'Elsa Jane', mood: 6, sessionTime: '02:00 -03:00 am', image: require('../images/Black4.jpeg') },
  ];

  const getMoodEmoji = (mood) => {
    if (mood >= 8) return '😃';
    if (mood >= 6) return '😊';
    if (mood >= 4) return '😐';
    if (mood >= 2) return '😟';
    return '😢';
  };

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
    navigation.navigate('Patient', { patient }); // Navigate to Patient screen
  };

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        placeholder="Search for a patient by name..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <View style={styles.statsContainer}>
        <TouchableOpacity style={styles.statBox}>
          <Text style={styles.statNumber}>{patients.length}</Text>
          <Text style={styles.statLabel}>Appointments</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statBox}>
          <Text style={styles.statNumber}>18</Text>
          <Text style={styles.statLabel}>Patient Diaries</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statBox}>
          <Text style={styles.statNumber}>4</Text>
          <Text style={styles.statLabel}>Urgent Cases</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statBox}>
          <Text style={styles.statNumber}>{patients.length}</Text>
          <Text style={styles.statLabel}>Mood Logs</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>Patient</Text>
        <Text style={styles.tableHeaderText}>Mood</Text>
        <Text style={styles.tableHeaderText}>Session Time</Text>
      </View>

      <View style={styles.patientTable}>
        {filteredPatients.map((patient) => (
          <TouchableOpacity key={patient.id} style={styles.tableRow} onPress={() => handlePatientClick(patient)}>
            <View style={styles.patientCell}>
              <Image source={patient.image} style={styles.patientImage} />
              <Text style={styles.patientName}>{patient.name}</Text>
            </View>
            <View style={styles.moodCell}>
              <Text style={styles.moodEmoji}>{getMoodEmoji(patient.mood)}</Text>
              <Text style={styles.moodScore}>{patient.mood.toFixed(1)}</Text>
            </View>
            <Text style={styles.sessionTimeCell}>{patient.sessionTime}</Text>
          </TouchableOpacity>
        ))}
      </View>
  
    </ScrollView>
  );
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
    color: '#000', // Dark orange color
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
    backgroundColor: '#fff', // Dark orange color
  },
  statBox: {
    width: '48%',
    backgroundColor: '#FF8C00', // Dark orange color
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
    backgroundColor: '#FF8C00', // Dark orange color
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
    width: '40%',
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
  moodScore: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  sessionTimeCell: {
    width: '30%',
    textAlign: 'center',
    fontSize: 12,
    color: '#666',
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
  }
});

export default Dashboard;
