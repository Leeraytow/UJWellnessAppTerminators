import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, ActivityIndicator, Linking, FlatList, StyleSheet, ScrollView, Image } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../Configuration/firebase';
import { ThemeContext } from '../StudentProfile/ThemeContext';
import Footer from '../Menu/Footer'; // Ensure the correct path for your Footer component

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

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.outerContainer}>
      {/* Fixed Header */}
      <View style={styles.fixedHeader}>
        <Image source={require('../images/UJLogo.png')} style={styles.logo} />
        <Text style={styles.title}>Upcoming Appointments</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.scrollContainer}>
        {bookingDetails.length === 0 ? (
          <View style={styles.centeredContainer}>
            <Text>No booking details found.</Text>
          </View>
        ) : (
          <FlatList
            data={bookingDetails}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        )}
      </ScrollView>

      {/* Fixed Footer */}
      <View style={styles.footer}>
        <Footer />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,  
    backgroundColor: '#FFFFFF',
  },
  fixedHeader: {
    backgroundColor: '#fff', 
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  logo: {
    width: 80,
    height: 50,
    marginBottom: 10,
    top:20
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    top:10
  },
  scrollContainer: {
    flex: 1,
    padding: 20,
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
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});

export default ScheduledAppointments;
