import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { getUnreadIndieNotificationInboxCount } from 'native-notify';
import { auth } from '../Configuration/firebase';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation, useRoute } from '@react-navigation/native';

import { MaterialIcons, Feather } from '@expo/vector-icons';
export default function Bell() {
    const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);
    const subID =auth.currentUser.email;  // Replace with your actual subID
    const navigation = useNavigation();
   
    useEffect(() => {
        const fetchUnreadCount = async () => {
            let unreadCount = await getUnreadIndieNotificationInboxCount(subID, 23885, 'J0c1pKP0BvWqVKKpfRCi7L');
            console.log("unreadCount: ", unreadCount);
            setUnreadNotificationCount(unreadCount);
        };

        fetchUnreadCount();
    }, []); // Empty dependency array means this runs once when the component mounts

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.notificationIcon}  onPress={() => navigation.navigate('Notifications')}>
            <Feather name="bell" size={24} color="#FF5800" style={styles.icon} />
                {unreadNotificationCount > 0 && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{unreadNotificationCount}</Text>
                    </View>
                )}
            </TouchableOpacity>
           
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
    },
    notificationIcon: {
        position: 'relative',
    },
    iconText: {
        fontSize: 24,
    },
    badge: {
        position: 'absolute',
        right: -10,
        top: -5,
        backgroundColor: 'red',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
