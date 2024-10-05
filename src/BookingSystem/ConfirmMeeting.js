import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, Alert, ActivityIndicator, Platform } from 'react-native';
import { collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../Configuration/firebase';
import { ThemeContext } from '../StudentProfile/ThemeContext';
import DateTimePicker from '@react-native-community/datetimepicker';

const ConfirmMeeting = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [venue, setVenue] = useState('');
  const [meetingLink, setMeetingLink] = useState('');
  const [meetingTime, setMeetingTime] = useState(new Date());
  const [meetingDate, setMeetingDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Bookings'));
        const bookingsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })).filter(b => b.status === 'Pending');
        setBookings(bookingsData);
      } catch (error) {
        console.error("Error fetching bookings: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const verifyBooking = (booking) => {
    setSelectedBooking(booking);
    setVenue(booking.venue || '');
    setMeetingLink(booking.googleMeetLink || '');
    setMeetingDate(new Date(booking.meetingDate));
    setMeetingTime(new Date(`1970-01-01T${booking.meetingTime}`));
  };

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

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
  };

  const formatTime = (time) => {
    return time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const confirmBooking = async () => {
    if (!selectedBooking) return;

    try {
      const bookingDoc = doc(db, 'Bookings', selectedBooking.id);
      await updateDoc(bookingDoc, {
        status: 'Confirmed',
        venue: selectedBooking.meetingType === 'faceToFace' ? venue : '',
        googleMeetLink: selectedBooking.meetingType === 'Online' ? meetingLink : '',
        meetingTime: formatTime(meetingTime),
        meetingDate: formatDate(meetingDate),
      });
      Alert.alert('Meeting confirmed!');
      setSelectedBooking(null); // Clear selection
    } catch (error) {
      console.error("Error confirming booking: ", error);
      Alert.alert('Failed to confirm booking.');
    }
  };

  const rejectBooking = async () => {
    if (!selectedBooking) return;

    try {
      const bookingDoc = doc(db, 'Bookings', selectedBooking.id);
      await deleteDoc(bookingDoc);
      Alert.alert('Meeting rejected and deleted.');
      setSelectedBooking(null); // Clear selection
    } catch (error) {
      console.error("Error rejecting booking: ", error);
      Alert.alert('Failed to reject booking.');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={{ padding: 20, backgroundColor: isDarkMode ? '#222' : '#fff', flex: 1 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Pending Bookings:</Text>
      {bookings.map(booking => (
        <View key={booking.id} style={{ marginBottom: 20 }}>
          <Text>Name: {booking.name}</Text>
          <Text>Student Number: {booking.studentNumber}</Text>
          <Text>Meeting Type: {booking.meetingType}</Text>
          <Button title="Verify Booking" onPress={() => verifyBooking(booking)} />
        </View>
      ))}

      {selectedBooking && (
        <>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>Verify Meeting Details:</Text>

          {/* Conditional TextInput based on meeting type */}
          {selectedBooking.meetingType === 'faceToFace' ? (
            <TextInput
              placeholder="Venue"
              value={venue}
              onChangeText={setVenue}
              style={{ borderBottomWidth: 1, marginBottom: 10 }}
            />
          ) : (
            <TextInput
              placeholder="Insert Google Meet Link"
              value={meetingLink}
              onChangeText={setMeetingLink}
              style={{ borderBottomWidth: 1, marginBottom: 10 }}
            />
          )}

          <Text>Meeting Date:</Text>
          <Button title={`Select Date: ${formatDate(meetingDate)}`} onPress={() => setShowDatePicker(true)} />
          {showDatePicker && (
            <DateTimePicker
              mode="date"
              value={meetingDate}
              onChange={handleDateChange}
            />
          )}

          <Text style={{ marginBottom: 10 }}>Meeting Time:</Text>
          <Button title={`Select Time: ${formatTime(meetingTime)}`} onPress={() => setShowTimePicker(true)} />
          {showTimePicker && (
            <DateTimePicker
              mode="time"
              value={meetingTime}
              onChange={handleTimeChange}
            />
          )}

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
            <Button title="Confirm Meeting" onPress={confirmBooking} />
            <Button title="Reject Meeting" color="red" onPress={rejectBooking} />
          </View>
        </>
      )}
    </View>
  );
};

export default ConfirmMeeting;
