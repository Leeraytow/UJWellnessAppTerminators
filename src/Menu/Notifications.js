import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Animated, TouchableOpacity, SafeAreaView } from 'react-native';
import Footer from '../Menu/Footer';
import Header from '../Menu/Header';
import { LinearGradient } from 'expo-linear-gradient';

const notificationsData = [
  { id: '1', title: 'New Appointment', details: 'Your session is scheduled for 10 AM tomorrow' },
  { id: '2', title: 'Reminder', details: 'Don’t forget to record your mood for today.' },
  { id: '3', title: 'Message Received', details: 'You have a new message from John.' },
];

const NotificationsScreen = () => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const renderNotificationItem = ({ item }) => (
    <Animated.View style={[styles.notificationItem, { opacity: fadeAnim }]}>
      <TouchableOpacity style={styles.touchable}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.details}>{item.details}</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header />
        {/* Apply Linear Gradient to content below the header */}
        <LinearGradient colors={['#E0B0FF', '#8ec5fc']} style={styles.contentContainer}>
          <Text style={styles.headerText}>Notifications</Text>
          <FlatList
            data={notificationsData}
            renderItem={renderNotificationItem}
            keyExtractor={(item) => item.id}
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
});

export default NotificationsScreen;
