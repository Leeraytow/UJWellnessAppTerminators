import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, ActivityIndicator, Linking, FlatList, StyleSheet } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../Configuration/firebase';
import { ThemeContext } from '../StudentProfile/ThemeContext';

const ScheduledAppointments = () => {
  const [bookingDetails, setBookingDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const userEmail = auth.currentUser.email; // Get the current user's email

        const q = query(collection(db, 'Bookings'), where('email', '==', userEmail));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const bookingData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setBookingDetails(bookingData); // Set all booking details
        } else {
          setBookingDetails([]); // No bookings found
        }
      } catch (error) {
        console.error("Error fetching booking details: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, []);

  const openMeetingLink = (url) => {
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          console.error("Can't handle url: " + url);
        }
      })
      .catch(err => console.error('An error occurred', err));
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (bookingDetails.length === 0) {
    return (
      <View style={styles.centeredContainer}>
        <Text>No booking details found.</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => {
    const { meetingTime, venue, googleMeetLink, meetingType, status } = item;

    const formattedMeetingTime = meetingTime
      ? new Date(meetingTime.seconds * 1000).toLocaleString()
      : 'N/A';

    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>Meeting Time: {formattedMeetingTime}</Text>
        {meetingType === 'faceToFace' && venue ? (
          <Text style={styles.itemText}>Venue: {venue}</Text>
        ) : null}
        {meetingType === 'online' && googleMeetLink ? (
          <Button 
            title="Join Google Meet" 
            onPress={() => openMeetingLink(googleMeetLink)} 
          />
        ) : null}
        <Text style={styles.itemText}>Status: {status || 'N/A'}</Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#222' : '#fff' }]}>
      <FlatList
        data={bookingDetails}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    marginBottom: 20,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default ScheduledAppointments;
