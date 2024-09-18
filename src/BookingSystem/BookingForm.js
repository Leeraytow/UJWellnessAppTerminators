import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { collection, addDoc, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { db, auth } from '../Configuration/firebase';

const BookingForm = ({ navigation }) => {
  const [name, setName] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [campus, setCampus] = useState('');
  const [meetingType, setMeetingType] = useState('');
  const [email, setEmail] = useState(''); // Email will be set automatically
  const [hasPendingAppointment, setHasPendingAppointment] = useState(false);

  useEffect(() => {
    const checkPendingAppointment = async () => {
      try {
        const userEmail = auth.currentUser?.email; // Get the current user's email
        if (!userEmail) return;

        const q = query(
          collection(db, 'Bookings'),
          where('email', '==', userEmail),
          where('status', '==', 'Pending')
        );
        const querySnapshot = await getDocs(q);
        setHasPendingAppointment(!querySnapshot.empty); // Set flag based on query result
        setEmail(userEmail); // Automatically set email
      } catch (error) {
        console.error('Error checking pending appointments: ', error);
      }
    };

    checkPendingAppointment();
  }, []);

  const handleSelectType = (type) => {
    setMeetingType(type);
  };

  const handleSubmit = async () => {
    if (hasPendingAppointment) {
      Alert.alert(
        'Pending Appointment',
        'You already have a pending appointment. Please wait until it is completed before booking a new one.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('ScheduledAppointments'), // Navigate to ScheduledAppointments screen
          }
        ]
      );
      return;
    }

    // Validate required fields
    if (!name || !studentNumber || !campus || !email || !meetingType) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    try {
      await addDoc(collection(db, 'Bookings'), {
        name,
        studentNumber,
        campus,
        meetingType,
        email, // Automatically saved email
        status: 'Pending', // Default status
        createdAt: Timestamp.now(),
      });
      Alert.alert('Booking Successful', 'Your appointment has been booked successfully.');
      navigation.goBack();
    } catch (error) {
      console.error('Error adding booking: ', error);
      Alert.alert('Error', 'Failed to submit booking.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
      />

      <Text style={styles.label}>Student Number</Text>
      <TextInput
        style={styles.input}
        value={studentNumber}
        onChangeText={setStudentNumber}
        placeholder="Enter your student number"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Campus</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={campus}
          onValueChange={(itemValue) => setCampus(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select campus" value="" />
          <Picker.Item label="Auckland Park Bunting Road (APB)" value="Auckland Park Bunting Road (APB)" />
          <Picker.Item label="Auckland Park Kingsway (APK)" value="Auckland Park Kingsway (APK)" />
          <Picker.Item label="Doornfontein (DFC)" value="Doornfontein (DFC)" />
          <Picker.Item label="Soweto (SWC)" value="Soweto" />
        </Picker>
      </View>

      <Text style={styles.label}>Meeting Type</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, meetingType === 'faceToFace' && styles.selectedButton]}
          onPress={() => handleSelectType('faceToFace')}
        >
          <Text style={styles.buttonText}>Face to Face</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, meetingType === 'online' && styles.selectedButton]}
          onPress={() => handleSelectType('online')}
        >
          <Text style={styles.buttonText}>Online</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

      <View>
        <TouchableOpacity style={styles.submitButton} onPress={() => navigation.navigate('ScheduledAppointments')}>
          <Text style={styles.submitButtonText}>Scheduled Appointments</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    top: 19,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  button: {
    flex: 1,
    padding: 12,
    backgroundColor: '#ff6f00',
    marginHorizontal: 5,
    alignItems: 'center',
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: '#aaa',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  submitButton: {
    padding: 16,
    backgroundColor: '#ff5733',
    alignItems: 'center',
    borderRadius: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default BookingForm;
