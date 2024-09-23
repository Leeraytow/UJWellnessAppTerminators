import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Footer from '../Menu/Footer';
import Header from '../Menu/Header';
import { LinearGradient } from 'expo-linear-gradient';

// Sample message data
const messagesData = [
  { id: '1', user: 'John Doe', message: 'Hey, how are you?', time: '2:30 PM' },
  { id: '2', user: 'Jane Smith', message: 'Meeting is confirmed for 3 PM.', time: '1:15 PM' },
  { id: '3', user: 'Michael', message: 'Can you send the documents?', time: '12:00 PM' },
  { id: '4', user: 'Emily Johnson', message: 'Let’s catch up soon!', time: '11:45 AM' },
];

const MessagesScreen = () => {
  const navigation = useNavigation();

  const renderMessageItem = ({ item }) => (
    <TouchableOpacity
      style={styles.messageItem}
      onPress={() => navigation.navigate('Chat', { user: item.user })}
    >
      <View style={styles.messageRow}>
        <Text style={styles.user}>{item.user}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
      <Text style={styles.message}>{item.message}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header />
        {/* Apply Linear Gradient to content below the header */}
        <LinearGradient colors={['#E0B0FF', '#8ec5fc']} style={styles.contentContainer}>
          <Text style={styles.title}>Messages</Text>
          <FlatList
            data={messagesData}
            renderItem={renderMessageItem}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#720e9e',
    textAlign: 'center',
  },
  messageItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  user: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6A0DAD',
  },
  message: {
    color: '#7D7D7D',
  },
  time: {
    fontSize: 12,
    color: '#9B59B6',
  },
});

export default MessagesScreen;
