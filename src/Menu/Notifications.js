import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Animated, TouchableOpacity, SafeAreaView, Alert, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook
import Footer from '../Menu/Footer';
import Header from '../Menu/Header';
import { LinearGradient } from 'expo-linear-gradient';
import { getIndieNotificationInbox, deleteIndieNotificationInbox, registerIndieID, unregisterIndieDevice } from 'native-notify';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../Configuration/firebase';

const NotificationsScreen = () => {
  const navigation = useNavigation(); // Initialize navigation

  const [subID, setSubID] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const appId = 23885; // Your app ID
  const appToken = 'J0c1pKP0BvWqVKKpfRCi7L'; // Your app token

  // Register a new subscription ID when the component mounts
  useEffect(() => {
    const registerNewSubID = async () => {
      const user = auth.currentUser;
      if (user) {
        setSubID(user.email); // Use user email as subID
        registerIndieID(user.email, appId, appToken); // Register with email
      }
    };

    registerNewSubID();
  }, []);

  // Fetch user data from Firebase
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userRef = doc(db, 'Students', user.uid);
          const docSnap = await getDoc(userRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            setSubID(user.email || '');
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

  // Register Indie ID when subID is available
  useEffect(() => {
    if (subID) {
      registerIndieID(subID, appId, appToken);
    }

    return () => {
      if (subID) {
        unregisterIndieDevice(subID, appId, appToken); // Clean up on unmount
      }
    };
  }, [subID]);

  // Fetch notifications from Native Notify
  const [notificationsData, setNotificationsData] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (subID) {
        try {
          const notifications = await getIndieNotificationInbox(subID, appId, appToken);
          console.log("notifications: ", notifications);
          setNotificationsData(notifications);
        } catch (error) {
          console.error('Error fetching notifications: ', error);
        }
      }
    };

    fetchNotifications();
  }, [subID]);

  // Handle notification deletion
  const handleDeleteNotification = async (notification_id) => {
    try {
      await deleteIndieNotificationInbox(subID, notification_id, appId, appToken);
      Alert.alert('Success', 'Notification deleted successfully');
      
      // Refresh notifications after deletion
      const notifications = await getIndieNotificationInbox(subID, appId, appToken);
      setNotificationsData(notifications);
    } catch (error) {
      console.error('Error deleting notification:', error);
      Alert.alert('Error', 'Failed to delete notification.');
    }
  };

  // Animation effect for notifications
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  // Render notification item
  const renderNotificationItem = ({ item }) => (
    <Animated.View style={[styles.notificationItem, { opacity: fadeAnim }]}>
      <TouchableOpacity 
        style={styles.touchable} 
        onPress={() => {
          // Navigate to UserList screen on notification click
          navigation.navigate('userList'); // Change 'UserList' to your actual screen name if it's different
          handleDeleteNotification(item.notification_id); // Optional: You can choose to delete the notification here
        }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.details}>{item.message}</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header />
        <LinearGradient colors={['#FC9842', '#FE5F75']} style={styles.contentContainer}>
          <Text style={styles.headerText}>Notifications</Text>
          <FlatList
            data={notificationsData}
            renderItem={renderNotificationItem}
            keyExtractor={(item) => item.notification_id.toString()}
            ListEmptyComponent={<Text>No notifications available.</Text>}
          />
        </LinearGradient>
        <Footer />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
    textAlign: 'center',
  },
  notificationItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  touchable: {
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#720e9e',
    marginBottom: 5,
  },
  details: {
    fontSize: 14,
    color: '#7D7D7D',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
});

export default NotificationsScreen;
