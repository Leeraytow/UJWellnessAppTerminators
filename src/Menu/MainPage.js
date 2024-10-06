import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Animated, SafeAreaView, ScrollView, Alert } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../Menu/Footer';
import Header from '../Menu/Header';
import { Ionicons } from '@expo/vector-icons'; 
import { doc, getDoc, updateDoc, deleteDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../Configuration/firebase'; 
import Bell from './NotBell';
import registerNNPushToken from 'native-notify';
import { getNotificationInbox } from 'native-notify';


const MainScreen = () => {
  const navigation = useNavigation();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0));
  const [pickedImage, setPickedImage] = useState(null);
  const [appointments, setAppointments] = useState([]); 
  const [currentImage, setCurrentImage] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  

  const [data, setData] = useState([]);
  registerNNPushToken(23885, 'J0c1pKP0BvWqVKKpfRCi7L');
  useEffect(async () => {
       let notifications = await getNotificationInbox(23885, 'J0c1pKP0BvWqVKKpfRCi7L');
       console.log("notifications: ", notifications);
       setData(notifications);
  }, []);


  useEffect(() => {
    const fetchCurrentImage = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userRef = doc(db, 'Students', user.uid);
          const docSnap = await getDoc(userRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            setCurrentImage(userData.profileImage || null);
          }
        } catch (error) {
          console.error('Error fetching user profile image: ', error);
        }
      }
    };

    fetchCurrentImage();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userRef = doc(db, 'Students', user.uid);
          const docSnap = await getDoc(userRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            setUsername(userData.name || ''); 
            setEmail(userData.email || '');   
          } else {
            console.log('No such document!');
          }
        }
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };

    fetchUserData();
  }, []);

  // Fetch appointments from Firestore
  useEffect(() => {
    const fetchAppointments = async () => {
      const user = auth.currentUser; // Get the current user
      if (!user) {
        console.log("No user is logged in.");
        return;
      }

      const email = user.email; // Get the email directly from the user object
      console.log('User Email:', email); // Debugging output

      const appointmentsRef = collection(db, 'Bookings');

      const q = query(
        appointmentsRef,
        where('email', '==', email),
        where('status', '==', 'Confirmed') 
      );


      try {
        const querySnapshot = await getDocs(q);
        const fetchedAppointments = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedAppointments.push({
            id: doc.id,
            date: data.selectedDate,
            time: data.time,
            type: data.meetingType,
            duration: data.duration
          });
        });
        console.log('Fetched Appointments:', fetchedAppointments); // Debugging output
        setAppointments(fetchedAppointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);



 

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  // Example emotions data
  const emotions = [
    { id: 1, emoji: '😊', label: 'Happy' },
    { id: 2, emoji: '😢', label: 'Sad' },
    { id: 3, emoji: '😡', label: 'Angry' },
    { id: 4, emoji: '😴', label: 'Tired' },
   
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient colors={['#FC9842', '#FFF5E6']} style={styles.container}>
          <Animated.View style={[styles.wrapper, { opacity: fadeAnim }]}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.iconsContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
                  <Bell/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('GeminiChat')}>
                  <Feather name="message-circle" size={24} color="#FF5800" />
                </TouchableOpacity>
              </View>
              <Image  source={{ uri: currentImage }}  style={[styles.profilePicture]} /> 
            </View>

            <View style={styles.nameContainer}>
            
                <Text style={styles.name}>Welcome, {username}</Text>
              
            </View>

            {/* Appointments */}
            <TouchableOpacity onPress={() => navigation.navigate('AppointmentStudent')}>
              <LinearGradient colors={['#FC9842', '#FBFBFB']} style={styles.appointmentsContainer}>
                <Text style={styles.sectionTitle}>Next Appointments</Text>
                {appointments.length > 0 ? (
                  <View style={styles.appointmentCards}>
                    {appointments.slice(0, 3).map((appointment) => ( // Limit to 3 appointments
                      <View key={appointment.id} style={styles.appointmentCard}>
                        <Text style={styles.appointmentDate}>{appointment.date}</Text>
                        <Text style={styles.appointmentDetails}>{appointment.time}</Text>
                        <Text style={styles.appointmentDetails}>{appointment.type}</Text>
                        <Text style={styles.appointmentDetails}>{appointment.duration}</Text>

                      </View>
                    ))}
                  </View>
                ) : (
                  <Text style={styles.noAppointmentsText}>No upcoming appointments.</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>

            {/* Emotions */}
            <View style={styles.emotionsSection}>
              <Text style={styles.sectionFeel}>How do you feel?</Text>
              <View style={styles.emotionsRow}>
                {emotions.map((emotion) => (
                  <TouchableOpacity key={emotion.id} style={styles.emotionButton}>
                    <Text style={styles.emojiText}>{emotion.emoji}</Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('MoodControl')}>
                  <Ionicons name="add-circle" size={40} color="#FF5800" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.tapToRecord}>
                <Text style={styles.tapToRecordText}>Tap to record</Text>
              </TouchableOpacity>
            </View>

            {/* Diary */}
            <TouchableOpacity onPress={() => navigation.navigate('DigitalDiary')}>
              <LinearGradient colors={['#FC9842', '#FE5F75']} style={styles.diaryContainer}>
                <Text style={styles.sectionTitle}>Diary</Text>
                <Text style={styles.diaryText}>
                  Your emotions matter. Log your thoughts today for a personalized resource to support your mental well-being.
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </LinearGradient>
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  wrapper: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 40,
    shadowColor: '#800080',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
    width: '100%',
    borderWidth: 2,
    borderColor: '#FF5F1F',
    marginTop: 10,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImageContainer: {
    marginBottom: 5,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 80,
    borderColor: '#FF5F1F',
    borderWidth: 3,
  },
  nameContainer: {
    alignItems: 'center',
    position: 'relative',
    width: '100%',
   
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6F00',
    textAlign: 'center',
    marginBottom: 9,
  },
  nameInput: {
    fontSize: 22,
    borderBottomWidth: 1,
    borderBottomColor: '#6a1b9a',
    color: '#FF5F1F',
    textAlign: 'center',
    marginBottom: 10,
  },
  editIcon: {
    position: 'absolute',
    right: 30,
    bottom: 13,
  },
  iconsContainer: {
    position: 'absolute',
    left: -20,
    top: -25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 6,
  },
  appointmentsContainer: {
    padding: 20,
    borderRadius: 10,
    marginBottom:30,
    width: '90%',
    backgroundColor: '#ffffff',
  },
  appointmentCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  appointmentCard: {
    backgroundColor: '#FF7043',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 10,
    shadowRadius: 15,
    elevation: 10,
    width: 100,
    alignItems: 'center',
  },
  appointmentDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF5F1F',
  },
  appointmentDetails: {
    fontSize: 14,
    color: '#FF5800',
    marginTop: 5,
    textAlign: 'center',
  },
  emotionsSection: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1.41,
    elevation: 2,
    width: '120%', // Set width to create a rectangle
    height: 80,  // Set a fixed height for the rectangle
    marginBottom: 20, // Add margin to create space below
},

emotionsRow: {
  flexDirection: 'row',
  justifyContent: 'flex-start', // Adjust alignment to left-center
  alignItems: 'center',
  flexWrap: 'nowrap', // Ensure all elements are on the same line
  marginLeft: 190, // Align under the other container
  marginTop: -40,  // Move the row upwards
},

  emotionButton: {
     marginRight: -19,
  },
  emojiText: {
    fontSize: 30,
  },
  addButton: {
    backgroundColor: 'white',
    padding: 6,
    borderRadius: 20,
    marginLeft: -6,
  },
  plusText: {
    fontSize: 15,
    color: '#FF5800',
  },
  tapToRecord: {
    marginTop: -30,
  },
  tapToRecordText: {
    fontSize: 14,
    color: '#666',
  },
  diaryContainer: {
    padding: 20,
    borderRadius: 15,
    width: '100%',
    backgroundColor: '#fff',
    marginBottom: -10,
  },
  diaryText: {
    fontSize: 16,
    color: 'black',
    marginTop: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
  },
  sectionFeel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 30,
  },
  noAppointmentsText: {
    fontSize: 16,
    color: '#FF7518', // or any color you prefer
    textAlign: 'center', // Center align the message
    marginTop: 10, // Add some space above
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    marginBottom: 0,
    borderColor: '#FC9842',
  },
  
});

export default MainScreen;
