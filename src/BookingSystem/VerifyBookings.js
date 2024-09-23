import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, Button, ActivityIndicator } from 'react-native';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../Configuration/firebase';
import { ThemeContext } from '../StudentProfile/ThemeContext';

const VerifyBookings = ({ navigation }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Bookings'));
        const bookingsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBookings(bookingsData);
      } catch (error) {
        console.error("Error fetching bookings: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const verifyBooking = async (bookingId) => {
    try {
      await updateDoc(doc(db, 'Bookings', bookingId), {
        status: 'Verified'
      });
      alert('Booking verified!');
      navigation.navigate('ConfirmMeeting', { bookingId });
    } catch (error) {
      console.error("Error verifying booking: ", error);
      alert('Failed to verify booking.');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: isDarkMode ? '#222' : '#fff' }}>
      <FlatList 
        data={bookings.filter(b => b.status === 'Pending')}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 20 }}>
            <Text>Name: {item.name}</Text>
            <Text>Student Number: {item.studentNumber}</Text>
            <Text>Meeting Type: {item.meetingType}</Text>
            <Text>Status: {item.status}</Text>
            <Button title="Verify Booking" onPress={() => verifyBooking(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

export default VerifyBookings;
