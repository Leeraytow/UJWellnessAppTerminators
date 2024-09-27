import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet } from 'react-native';
import { getIndieNotificationInbox, deleteIndieNotificationInbox } from 'native-notify';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './Configuration/firebase';

export default function IndieNotificationInbox() {
    const [data, setData] = useState([]);
    const [subID, setSubID] = useState('');  // State for subID
    const appId = 23664;  // Your app ID
    const appToken = 'tog0p0d3QDBHFZGAoSHkbB';  // Your app token
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const userRef = doc(db, 'Students', user.uid);
                    const docSnap = await getDoc(userRef);

                    if (docSnap.exists()) {
                        const userData = docSnap.data();
                        setUsername(userData.name || ''); // Set the user's name
                        setSubID(user.email);  // Set the user's email as subID
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

    // Fetch notifications when the component mounts
    useEffect(() => {
        const fetchNotifications = async () => {
            if (subID) {
                let notifications = await getIndieNotificationInbox(subID, appId, appToken);
                console.log("notifications: ", notifications);
                setData(notifications);
            }
        };

        fetchNotifications();
    }, [subID]);  // Fetch notifications whenever subID changes

    // Function to delete a notification
    const handleDeleteNotification = async (notification_id) => {
        try {
            await deleteIndieNotificationInbox(subID, notification_id, appId, appToken);
            Alert.alert('Success', 'Notification deleted successfully');
            // Refresh notifications after deletion
            const notifications = await getIndieNotificationInbox(subID, appId, appToken);
            setData(notifications);
        } catch (error) {
            console.error('Error deleting notification:', error);
            Alert.alert('Error', 'Failed to delete notification.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Indie Notification Inbox</Text>
            <FlatList
                data={data}
                keyExtractor={(item) => item.notification_id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.notificationItem}>
                        <Text style={styles.notificationTitle}>{item.title}</Text>
                        <Text>{item.message}</Text>
                        <Button
                            title="Delete"
                            onPress={() => handleDeleteNotification(item.notification_id)}
                        />
                    </View>
                )}
                ListEmptyComponent={<Text>No notifications available.</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    notificationItem: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    notificationTitle: {
        fontWeight: 'bold',
    },
});
