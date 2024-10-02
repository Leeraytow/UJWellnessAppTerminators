import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Animated, TouchableOpacity, SafeAreaView, Alert, TextInput, Button } from 'react-native';
import Footer from '../Menu/Footer';
import Header from '../Menu/Header';
import { LinearGradient } from 'expo-linear-gradient';
import { getIndieNotificationInbox, deleteIndieNotificationInbox, registerIndieID, unregisterIndieDevice } from 'native-notify';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../Configuration/firebase';

const NotificationsScreen = () => {

    const [subID, setSubID] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const appId = 23663; // Your app ID
  const appToken = 'XcflD7o30MrTv1MQZ7jtig'; // Your app token

  // // Register a new subscription ID when the component mounts
  // useEffect(() => {
  //   const registerNewSubID = async () => {
  //     const user = auth.currentUser;
      
  //       setSubID('testID'); // Use user email as subID
  //       registerIndieID('testID', appId, appToken);

  //     } 
  

  //   registerNewSubID();
  // }, []);

  // Function to send notification to the registered subID
  const sendNotificationToUser = async () => {
    if (!subID || !title || !message) {
      Alert.alert('Error', 'Please provide a valid title and message.');
      return;
    }

    const notificationData = {
      subID: subID,  // Unique user ID
      appId: appId,  // Your app ID
      appToken: appToken,  // Your app token
      title: title,
      message: message,
    };

    try {
      const response = await fetch('https://app.nativenotify.com/api/indie/notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(notificationData),
      });

      const textResponse = await response.text(); // Get the plain text response

      if (response.ok && textResponse === 'Success!') {
        Alert.alert('Success', 'Notification sent successfully!');
        setTitle('');
        setMessage('');
      } else {
        Alert.alert('Error', 'Failed to send notification: ' + textResponse);
      }
    } catch (error) {
      console.error('Error sending notification:', error);
      Alert.alert('Error', 'Failed to send notification.');
    }
  };

   const [fadeAnim] = useState(new Animated.Value(0));
   const [notificationsData, setNotificationsData] = useState([]);
  // const [subID, setSubID] = useState('');
  // const [title, setTitle] = useState('');
  // const [message, setMessage] = useState('');

  // const appId = 23663;  // Your app ID
  // const appToken = 'XcflD7o30MrTv1MQZ7jtig';  // Your app token

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

            useEffect(() => {
              const registerNewSubID = async () => {
                const user = auth.currentUser;
                
                  setSubID(user.email); // Use user email as subID
                  registerIndieID(subID, appId, appToken);
          
                } 
            
          
              registerNewSubID();
            }, []);
          
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
        unregisterIndieDevice(subID, appId, appToken);  // Clean up on unmount
      }
    };
  }, [subID]);

  // Fetch notifications from Native Notify
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
      <TouchableOpacity style={styles.touchable} onPress={() => handleDeleteNotification(item.notification_id)}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.details}>{item.message}</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  // Function to send notification to a specific user using Native Notify API
  // const sendNotificationToUser = async (subID, title, message) => {
  //   if (!title || !message) {
  //     Alert.alert('Error', 'Title and message are required.');
  //     return false;
  //   }

  //   const notificationData = {
  //     subID: subID,  // Unique user ID
  //     appId: appId,  // Your app ID
  //     appToken: appToken,  // Your app token
  //     title: title,
  //     message: message,
  //   };

  //   try {
  //     const response = await fetch('https://app.nativenotify.com/api/indie/notification', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(notificationData),
  //     });

  //     const textResponse = await response.text();  // Get the plain text response
  //     console.log('Raw Response from Notification API:', textResponse);

  //     if (response.ok && textResponse === 'Success!') {
  //       console.log('Notification sent successfully to', subID);
  //       return true;
  //     } else {
  //       console.error('Failed to send notification:', textResponse);
  //       return false;
  //     }

  //   } catch (error) {
  //     console.error('Error sending notification:', error);
  //     return false;
  //   }
  // };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header />
        <LinearGradient colors={['#E0B0FF', '#8ec5fc']} style={styles.contentContainer}>
          <Text style={styles.headerText}>Notifications</Text>
          <FlatList
            data={notificationsData}
            renderItem={renderNotificationItem}
            keyExtractor={(item) => item.notification_id.toString()}
            ListEmptyComponent={<Text>No notifications available.</Text>}
          />

          {/* Input for sending notifications */}
          {/* <View style={styles.container}>
      <Text style={styles.header}>Send Notification{subID}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter notification title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter notification message"
        value={message}
        onChangeText={setMessage}
      />
      <Button title="Send Notification" onPress={sendNotificationToUser} />
    </View> */}
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
    color: '#720e9e',
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
