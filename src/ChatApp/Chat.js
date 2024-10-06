import React, { useState, useEffect, useLayoutEffect, useCallback } from "react";
import { View, Text, StyleSheet, Alert } from 'react-native';
import { GiftedChat } from "react-native-gifted-chat";
import { collection, addDoc, query, orderBy, onSnapshot, deleteDoc, doc, getDoc } from 'firebase/firestore'; // Import getDoc for fetching user data
import { signOut } from "firebase/auth";
import { auth, db } from '../Configuration/firebase';
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from 'axios'; // Import axios for sending notifications
import { registerIndieID, unregisterIndieDevice } from 'native-notify'; // Import Native Notify functions

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const navigation = useNavigation();
    const route = useRoute();
    const { selectedUser } = route.params || {}; // Get selected user from params
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        const user = auth.currentUser;
        if (user) {
            try {
                const userRef = doc(db, 'Students', user.uid);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    const userData = userSnap.data();
                    setUsername(userData.name || '');
                    setEmail(userData.email || '');
                } else {
                    console.log('User not found in the Students collection.');
                }
            } catch (error) {
                console.error('Error fetching user data: ', error);
            }
        }
    };

    const onSignOut = () => {
        signOut(auth).catch(error => console.log(error));
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>{selectedUser ? selectedUser.name : 'Chat'}</Text>
                </View>
            ),
        });
    }, [navigation, selectedUser]);

    useEffect(() => {
        if (selectedUser) {
            const userId = auth?.currentUser?.email;
            const chatId = [userId, selectedUser.email].sort().join('_'); // Create a unique chat ID

            // Register the device for push notifications
            registerIndieID(selectedUser.email, 23885, 'J0c1pKP0BvWqVKKpfRCi7L');

            const collectionRef = collection(db, "Chats", chatId, "Messages");
            const q = query(collectionRef, orderBy("createdAt", "desc"));

            const unsubscribe = onSnapshot(q, snapshot => {
                setMessages(
                    snapshot.docs.map(doc => ({
                        _id: doc.id,
                        createdAt: doc.data().createdAt.toDate(),
                        text: doc.data().text,
                        user: doc.data().user
                    }))
                );
            });

            return () => {
                unregisterIndieDevice(selectedUser.email, 23885, 'J0c1pKP0BvWqVKKpfRCi7L'); // Unregister device on component unmount
                unsubscribe();
            };
        }
    }, [selectedUser]);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
        const { _id, createdAt, text, user } = messages[0];
        const userId = auth?.currentUser?.email;
        const chatId = [userId, selectedUser.email].sort().join('_'); // Create a unique chat ID

        addDoc(collection(db, 'Chats', chatId, 'Messages'), {
            _id,
            createdAt,
            text,
            user
        });

        // Construct notification message including the sender's name (username)
        const title = `${username}: `; // Use the sender's username and the message text as the title
        const message =`${text}`; // Set a static message
        sendNotificationToUser(selectedUser.email, title, message)
            .then(success => {
                if (success) {
                    console.log('Notification sent successfully');
                } else {
                    console.error('Failed to send notification');
                }
            })
            .catch(error => {
                console.error('Error sending notification:', error);
            });
    }, [selectedUser, username]); // Include username as a dependency

    const sendNotificationToUser = async (subID, title, message) => {
        try {
            const response = await axios.post(`https://app.nativenotify.com/api/indie/notification`, {
                subID: subID,
                appId: 23885,
                appToken: 'J0c1pKP0BvWqVKKpfRCi7L',
                title: title,
                message: message
            });
            return response.status === 200;
        } catch (error) {
            console.error('Error sending notification:', error);
            return false;
        }
    };

    const onLongPress = (context, message) => {
        setSelectedMessage(message);
        const options = ['Delete', 'Cancel'];
        context.actionSheet().showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex: options.length - 1
            },
            buttonIndex => {
                if (buttonIndex === 0) {
                    handleDeleteMessage(message);
                }
            }
        );
    };

    const handleDeleteMessage = async (message) => {
        const userId = auth?.currentUser?.email;
        const chatId = [userId, selectedUser.email].sort().join('_'); // Create a unique chat ID
        try {
            await deleteDoc(doc(db, 'Chats', chatId, 'Messages', message._id));
            setSelectedMessage(null);
        } catch (error) {
            console.error("Error deleting message: ", error);
        }
    };

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: auth?.currentUser?.email,
                avatar: 'https://i.pravatar.cc/300'
            }}
            messageContainerStyle={{
                backgroundColor: 'white'
            }}
            onLongPress={(context, message) => onLongPress(context, message)}
        />
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    }
});
