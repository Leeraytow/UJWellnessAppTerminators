import React, { useState, useEffect, useLayoutEffect, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { GiftedChat } from "react-native-gifted-chat";
import { collection, addDoc, query, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { signOut } from "firebase/auth";
import { auth, db } from '../Configuration/firebase';
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const navigation = useNavigation();
    const route = useRoute();
    const { selectedUser } = route.params || {}; // Get selected user from params

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
            headerRight: () => (
                <TouchableOpacity style={{ marginRight: 10 }} onPress={onSignOut}>
                    <AntDesign name="logout" size={24} color="gray" />
                </TouchableOpacity>
            )
        });
    }, [navigation, selectedUser]);

    useEffect(() => {
        if (selectedUser) {
            const userId = auth?.currentUser?.email;
            const chatId = [userId, selectedUser.email].sort().join('_'); // Create a unique chat ID

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

            return () => unsubscribe();
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
    }, [selectedUser]);

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
