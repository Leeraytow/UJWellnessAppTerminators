import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Configuration/firebase';

const UserHistory = () => {
  const [historyList, setHistoryList] = useState([]);

  useEffect(() => {
    const fetchUserHistory = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Students')); // Adjust collection name as needed
        const historyData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setHistoryList(historyData);
      } catch (error) {
        console.error('Error fetching user history: ', error);
      }
    };

    fetchUserHistory();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.historyBlock}>
      <Text style={styles.text}>Username: {item.username}</Text>
      <Text style={styles.text}>Logged in on: {new Date(item.loginDate).toLocaleDateString()}</Text>
      <Text style={styles.text}>At: {new Date(item.loginDate).toLocaleTimeString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>User History</Text>
      <FlatList
        data={historyList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  historyBlock: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default UserHistory;
