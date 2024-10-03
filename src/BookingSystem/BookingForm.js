import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { collection, addDoc, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { db, auth } from '../Configuration/firebase';
import DatePicker from 'react-native-modern-datepicker';

const therapistsByCampus = {
  "APB": ["Dr. Manci Thobani", "Dr. Mukuta Dineo", "Dr. Naicker Michelle"],
  "APK": ["Dr. Halana Vuyiswa", "Dr. Johnson Desiree", "Dr. Mostert Henk", "Dr. Ntantiso Mzamo", "Dr. Singh Reshmika"],
  "DFC": ["Dr. Bujela Khanyisile", "Dr. Korope George", "Dr. Muhlanga Ntsakisi", "Dr. Tonono Melinda"],
  "SWC": ["Dr. Gumbi Mbalenhle", "Dr. Masilela Bafana", "Dr. Ngesi Philani"],
};

const BookingForm = ({ navigation }) => {
  const [name, setName] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');
  const [campus, setCampus] = useState('');
  const [meetingType, setMeetingType] = useState('');
  const [email, setEmail] = useState('');
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
    if (campus) {
      setAvailableTherapists(therapistsByCampus[campus] || []);
    } else {
      setAvailableTherapists([]);
    }
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
      await addDoc(collection(db, 'Bookings'), {
        name,
        studentNumber,
        contactNumber,
        campus,
        meetingType,
        therapist,
        specialRequest,
        email,
        selectedDate,
        status: 'Pending',
        createdAt: Timestamp.now(),
      });
      navigation.navigate("BookingCompleted");
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
            // Disable weekends
            disabledDates: [
              new Date().toISOString().split('T')[0], // Disable today if it's a weekend
              ...Array.from({ length: 6 }, (_, i) => {
                const date = new Date();
                date.setDate(date.getDate() + i);
                return date.getDay() === 0 || date.getDay() === 6 ? date.toISOString().split('T')[0] : null;
              }).filter(Boolean),
            ],
          }}
          selectedDayColor="#F59B0A" // Orange for selected date
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
                onValueChange={(itemValue) => setTherapist(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Select therapist" value="" />
                {availableTherapists.map((therapist, index) => (
                  <Picker.Item key={index} label={therapist} value={therapist} />
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
          style={[styles.input, styles.specialRequestInput]}
          value={specialRequest}
          onChangeText={setSpecialRequest}
          placeholder="Enter any special requests"
          multiline={true}
        />

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Book</Text>
        </TouchableOpacity>

        {/* Scheduled Appointments Section */}
        {scheduledAppointments.length > 0 && (
          <View style={styles.scheduledAppointmentsContainer}>
            <Text style={styles.scheduledTitle}>Your Scheduled Appointments:</Text>
            {scheduledAppointments.map(appointment => (
              <View key={appointment.id} style={styles.appointmentCard}>
                <Text style={styles.appointmentText}>{`${appointment.therapist} on ${appointment.selectedDate}`}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Scheduled Appointment Button */}
        <TouchableOpacity
          style={styles.scheduledButton}
          onPress={() => navigation.navigate('ScheduledAppointments')}
        >
          <Text style={styles.scheduledButtonText}>Scheduled Appointment</Text>
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
    backgroundColor:'#F59B04'
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
    backgroundColor: '#f8f9fa',
    borderRadius: 5,
    marginBottom: 10,
  },
  appointmentText: {
    fontSize: 16,
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
