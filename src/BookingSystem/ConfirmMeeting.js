import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import { collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../Configuration/firebase';
import { ThemeContext } from '../StudentProfile/ThemeContext';
import DateTimePicker from '@react-native-community/datetimepicker';

const ConfirmMeeting = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [venue, setVenue] = useState('');
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
    setMeetingDate(new Date(booking.meetingDate));
    setMeetingTime(new Date(`1970-01-01T${booking.meetingTime}`));
  };

  const confirmBooking = async () => {
    if (!selectedBooking) return;

    try {
      const bookingDoc = doc(db, 'Bookings', selectedBooking.id);
      await updateDoc(bookingDoc, {
        status: 'Confirmed',
        venue: venue,
        meetingTime: meetingTime.toLocaleTimeString(),
        meetingDate: meetingDate.toDateString(),
      });
      Alert.alert('Meeting confirmed!');
      setSelectedBooking(null); // Clear selection
      // Optionally refresh bookings
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
      // Optionally refresh bookings
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
          {selectedBooking.meetingType === 'faceToFace' && (
            <TextInput
              placeholder="Venue"
              value={venue}
              onChangeText={setVenue}
              style={{ borderBottomWidth: 1, marginBottom: 10 }}
            />
          )}
          {/* Add Google Meet link input if online */}
          <Text>Meeting Date:</Text>
          <Button title={`Select Date: ${meetingDate.toDateString()}`} onPress={() => setShowDatePicker(true)} />
          {showDatePicker && (
            <DateTimePicker
              mode="date"
              value={meetingDate}
              onChange={(event, date) => {
                setShowDatePicker(false);
                setMeetingDate(date || meetingDate);
              }}
            />
          )}
          <Text>Meeting Time:</Text>
          <Button title={`Select Time: ${meetingTime.toLocaleTimeString()}`} onPress={() => setShowTimePicker(true)} />
          {showTimePicker && (
            <DateTimePicker
              mode="time"
              value={meetingTime}
              onChange={(event, time) => {
                setShowTimePicker(false);
                setMeetingTime(time || meetingTime);
              }}
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
