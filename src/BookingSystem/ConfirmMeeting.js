import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, Alert, ActivityIndicator, Platform } from 'react-native';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../Configuration/firebase';
import { ThemeContext } from '../StudentProfile/ThemeContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import GoogleMeetWebView from '../Components/GoogleMeetWebView'; // Import your WebView component

const ConfirmMeeting = ({ route }) => {
  const { bookingId } = route.params;
  const [booking, setBooking] = useState(null);
  const [venue, setVenue] = useState('');
  const [meetingTime, setMeetingTime] = useState(new Date());
  const [meetingDate, setMeetingDate] = useState(new Date());
  const [googleMeetLink, setGoogleMeetLink] = useState('');
  const [loading, setLoading] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showWebView, setShowWebView] = useState(false); // State for WebView
  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const bookingDoc = doc(db, 'Bookings', bookingId);
        const bookingSnapshot = await getDoc(bookingDoc);

        if (bookingSnapshot.exists()) {
          const bookingData = bookingSnapshot.data();
          setBooking(bookingData);
          setVenue(bookingData.venue || '');
          setMeetingTime(bookingData.meetingTime ? new Date(bookingData.meetingTime) : new Date());
          setMeetingDate(bookingData.meetingDate ? new Date(bookingData.meetingDate) : new Date());
          setGoogleMeetLink(bookingData.googleMeetLink || '');
        } else {
          Alert.alert('No booking found');
        }
      } catch (error) {
        console.error("Error fetching booking: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || meetingDate;
    setShowDatePicker(Platform.OS === 'ios');
    setMeetingDate(currentDate);
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || meetingTime;
    setShowTimePicker(Platform.OS === 'ios');
    setMeetingTime(currentTime);
  };

  const confirmBooking = async () => {
    try {
      const bookingDoc = doc(db, 'Bookings', bookingId);
      await updateDoc(bookingDoc, {
        status: 'Confirmed',
        venue: booking?.meetingType === 'faceToFace' ? venue : null,
        meetingTime: meetingTime.toISOString(),
        meetingDate: meetingDate.toISOString(),
        googleMeetLink: booking?.meetingType === 'online' ? googleMeetLink : null,
      });
      Alert.alert('Meeting confirmed!');
    } catch (error) {
      console.error("Error confirming booking: ", error);
      Alert.alert('Failed to confirm booking.');
    }
  };

  return (
    <View style={{ padding: 20, backgroundColor: isDarkMode ? '#222' : '#fff', flex: 1 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Booking Status: {booking?.status}</Text>

      {booking?.meetingType === 'faceToFace' && (
        <TextInput
          placeholder="Venue"
          value={venue}
          onChangeText={setVenue}
          style={{ borderBottomWidth: 1, marginBottom: 10 }}
        />
      )}
      
      {booking?.meetingType === 'online' && (
        <>
          <TextInput
            placeholder="Google Meet Link"
            value={googleMeetLink}
            onChangeText={setGoogleMeetLink}
            style={{ borderBottomWidth: 1, marginBottom: 10 }}
          />
          <Button title="Open Google Meet WebView" onPress={() => setShowWebView(true)} />
        </>
      )}

      <Text style={{ marginBottom: 10 }}>Meeting Date:</Text>
      <Button title={`Select Date: ${meetingDate.toDateString()}`} onPress={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <DateTimePicker
          mode="date"
          value={meetingDate}
          onChange={handleDateChange}
        />
      )}
      
      <Text style={{ marginBottom: 10 }}>Meeting Time:</Text>
      <Button title={`Select Time: ${meetingTime.toLocaleTimeString()}`} onPress={() => setShowTimePicker(true)} />
      {showTimePicker && (
        <DateTimePicker
          mode="time"
          value={meetingTime}
          onChange={handleTimeChange}
        />
      )}
      
      <Button title="Confirm Meeting" onPress={confirmBooking} />
      {loading && <ActivityIndicator size="large" color="#FFA500" />}
      
      <GoogleMeetWebView visible={showWebView} onClose={() => setShowWebView(false)} />
    </View>
  );
};

export default ConfirmMeeting;
