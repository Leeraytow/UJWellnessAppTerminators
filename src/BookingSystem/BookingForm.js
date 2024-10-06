import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { collection, addDoc, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { db, auth } from '../Configuration/firebase';
import DatePicker from 'react-native-modern-datepicker';

const BookingForm = ({ navigation }) => {
  const [name, setName] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');
  const [campus, setCampus] = useState('');
  const [meetingType, setMeetingType] = useState('');
  const [email, setEmail] = useState('');
  const [therapistEmail, setTherapistEmail] = useState('');
  const [therapist, setTherapist] = useState('');
  const [availableTherapists, setAvailableTherapists] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [hasPendingAppointment, setHasPendingAppointment] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scheduledAppointments, setScheduledAppointments] = useState([]);

  useEffect(() => {
    const checkPendingAppointment = async () => {
      try {
        const userEmail = auth.currentUser?.email;
        if (!userEmail) return;

        const q = query(
          collection(db, 'Bookings'),
          where('email', '==', userEmail),
          where('status', '==', 'Pending')
        );
        const querySnapshot = await getDocs(q);
        setHasPendingAppointment(!querySnapshot.empty);
        setEmail(userEmail);
      } catch (error) {
        console.error('Error checking pending appointments: ', error);
      }
    };

    checkPendingAppointment();
  }, []);
  
  useEffect(() => {
    const fetchTherapists = async () => {
      if (!campus) {
        setAvailableTherapists([]);
        return;
      }
  
      try {
        const q = query(collection(db, 'Students'));
        const querySnapshot = await getDocs(q);
        const therapistsList = querySnapshot.docs
          .map(doc => doc.data()) // Get the data for each document
          .filter(docData => 
            docData.email && // Check if email exists
            docData.email.endsWith('@gmail.com') && 
            docData.campus === campus
          ) 
            .map(docData => ({
            name: docData.name,
            email: docData.email // Store the therapist's email
          }));

        setAvailableTherapists(therapistsList);
      } catch (error) {
        console.error('Error fetching therapists: ', error);
      }
    };
  
    fetchTherapists();
  }, [campus]);

  useEffect(() => {
    const fetchScheduledAppointments = async () => {
      try {
        const userEmail = auth.currentUser?.email;
        if (!userEmail) return;

        const q = query(
          collection(db, 'Bookings'),
          where('email', '==', userEmail),
          where('status', '==', 'Confirmed') // Fetch only confirmed appointments
        );
        const querySnapshot = await getDocs(q);
        const appointments = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setScheduledAppointments(appointments);
      } catch (error) {
        console.error('Error fetching scheduled appointments: ', error);
      }
    };

    fetchScheduledAppointments();
  }, [email]);

  const handleSubmit = async () => {
    if (hasPendingAppointment) {
      Alert.alert(
        'Pending Appointment',
        'You already have a pending appointment. Please wait until it is completed before booking a new one.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('ScheduledAppointments'),
          }
        ]
      );
      return;
    }

    if (!name || !studentNumber || !contactNumber || !campus || !email || !meetingType || !therapist || !selectedDate) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    try {
      // Adding booking to Firestore
      await addDoc(collection(db, 'Bookings'), {
        name,
        studentNumber,
        contactNumber,
        campus,
        meetingType,
        therapist,
        therapistEmail,
        specialRequest,
        email,
        selectedDate,
        status: 'Pending',
        createdAt: Timestamp.now(),
      });

      // Success Alert notification
      Alert.alert(
        'Booking Successful!',
        'Your booking has been submitted and is pending approval.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate("ScheduledAppointments"),
          }
        ]
      );
    } catch (error) {
      console.error('Error adding booking: ', error);
      Alert.alert('Error', 'Failed to submit booking.');
    }
  };
  
  return (
    <View style={styles.container}>
      {/* Fixed Header: Logo and Title */}
      <View style={styles.fixedHeader}>
        <Image
          source={require('../images/UJLogo.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Booking Form</Text>
      </View>

      {/* Scrollable Form */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Input Fields */}
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
        <Text style={styles.label}>Contact Number</Text>
        <TextInput
          style={styles.input}
          value={contactNumber}
          onChangeText={setContactNumber}
          placeholder="Enter your contact number"
          keyboardType="numeric"
        />
        <Text style={styles.label}>Select Date</Text>
        <DatePicker
          mode="calendar"
          selected={selectedDate}
          onDateChange={setSelectedDate}
          minimumDate={new Date().toISOString().split('T')[0]} // Disable past dates
          options={{
            disabledDates: (date) => {
              const day = new Date(date).getDay();
              return day === 0 || day === 6; // Disable weekends
            },
            textHeaderColor: "#000",
            textDefaultColor: "#000",
            selectedDayColor: "#F59B0A",
            disabledDatesTextStyle: {
              color: '#A9A9A9',
            },
          }}
          style={styles.datePicker}
        />
        <Text style={styles.label}>Campus</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={campus}
            onValueChange={(itemValue) => setCampus(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select campus" value="" />
            <Picker.Item label="APB" value="APB" />
            <Picker.Item label="APK" value="APK" />
            <Picker.Item label="DFC" value="DFC" />
            <Picker.Item label="SWC" value="SWC" />
          </Picker>
        </View>

        {campus && (
          <>
            <Text style={styles.label}>Select Therapist</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={therapist}
                onValueChange={(itemValue) => {
                  const selectedTherapist = availableTherapists.find(t => t.name === itemValue);
                  setTherapist(itemValue);
                  setTherapistEmail(selectedTherapist ? selectedTherapist.email : '');
                }}
                style={styles.picker}
              >
                <Picker.Item label="Select therapist" value="" />
                {availableTherapists.map((therapist, index) => (
                  <Picker.Item key={index} label={therapist.name} value={therapist.name} />
                ))}
              </Picker>
            </View>
          </>
        )}

        <Text style={styles.label}>Meeting Type</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, meetingType === 'FaceToFace' && styles.selectedButton]}
            onPress={() => setMeetingType('FaceToFace')}
          >
            <Text style={styles.buttonText}>Face to Face</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, meetingType === 'Online' && styles.selectedButton]}
            onPress={() => setMeetingType('Online')}
          >
            <Text style={styles.buttonText}>Online</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Special Request</Text>
        <TextInput
          style={styles.input}
          value={specialRequest}
          onChangeText={setSpecialRequest}
          placeholder="Enter any special requests"
        />

       

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
          <Text style={styles.submitButtonText}>Submit Booking</Text>
        </TouchableOpacity>

         {/* Scheduled Appointments Section */}
         <Text style={styles.label}>Scheduled Appointments</Text>
        {scheduledAppointments.length > 0 ? (
          scheduledAppointments.slice(0, 1).map((appointment, index) => (
            <View key={index} style={styles.appointmentCard}>
              <Text style={styles.appointmentText}>Date: {appointment.selectedDate}</Text>
              <Text style={styles.appointmentText}>Time: {appointment.time}</Text>
              <Text style={styles.appointmentText}>Venue: {appointment.venue}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noAppointmentsText}>No confirmed appointments available.</Text>
        )}
              {/* Scheduled Appointment Button */}
              <TouchableOpacity
          style={styles.scheduledButton}
          onPress={() => navigation.navigate('ScheduledAppointments')}
        >
          <Text style={styles.scheduledButtonText}>View All Appointments</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fixedHeader: {
    alignItems: 'center',
    marginBottom: 20, // Adjust margin for spacing
    backgroundColor:'#ff7f00'
  },
  logo: {
    width: 70,
    height: 70, // Reduced height of the logo
    marginBottom: 50, // Adjust margin for spacing
    top:50
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10, // Adjust margin for spacing
  },
  scrollContainer: {
    padding: 20,
    alignItems: 'stretch',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  datePicker: {
    marginBottom: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  picker: {
    height: 50,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    backgroundColor: 'grey', // Set button color to orange
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#ff7f00', // Adjust the selected button color if needed
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  specialRequestInput: {
    height: 100,
  },
  submitButton: {
    backgroundColor: '#ff7f00', // Set submit button color to orange
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  scheduledAppointmentsContainer: {
    marginTop: 20,
  },
  scheduledTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  appointmentCard: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#e6e6e6',
    marginVertical: 5,
  },
  appointmentText: {
    fontSize: 16,
    color: '#333',
  },
  noAppointmentsText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
  },
  scheduledButton: {
    backgroundColor: '#ff7f00', // Set scheduled button color to orange
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  scheduledButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default BookingForm;
