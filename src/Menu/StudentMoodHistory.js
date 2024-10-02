import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../Configuration/firebase'; // Import Firebase

const StudentMoodHistory = () => {
  const [moodHistory, setMoodHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(moment());
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMoodHistory = async () => {
      try {
        const user = auth.currentUser; // Get current authenticated user
        if (user) {
          const moodLogsRef = collection(db, 'moodlogs'); // Reference to moodlogs collection
          const q = query(moodLogsRef, where('email', '==', user.email)); // Query mood logs where email matches the current user's email
          const querySnapshot = await getDocs(q);

          const logs = [];
          querySnapshot.forEach((doc) => {
            logs.push({ id: doc.id, ...doc.data() }); // Push each log into the array
          });

          setMoodHistory(logs);
          filterByMonth(logs, selectedMonth);
        }
      } catch (error) {
        console.error('Error fetching mood history:', error);
      }
    };

    fetchMoodHistory();
  }, []);

  const changeMonth = (direction) => {
    const newMonth = selectedMonth.clone().add(direction, 'month');
    setSelectedMonth(newMonth);
    filterByMonth(moodHistory, newMonth);
  };

  const filterByMonth = (data, month) => {
    const filtered = data.filter(entry =>
      moment(entry.date).format('MMMM YYYY') === month.format('MMMM YYYY')
    );
    setFilteredHistory(filtered);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Back Arrow */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.heading}>Mood History</Text>
      </View>

      {/* Month Selector */}
      <View style={styles.monthSelector}>
        <TouchableOpacity onPress={() => changeMonth(-1)}>
          <Icon name="chevron-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.monthText}>
          {selectedMonth.format('MMMM YYYY')}
        </Text>
        <TouchableOpacity onPress={() => changeMonth(1)}>
          <Icon name="chevron-right" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Mood Entries */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {filteredHistory.length > 0 ? (
          filteredHistory.map((entry, index) => (
            <View key={index} style={styles.moodEntry}>
              <Text style={styles.date}>{moment(entry.date).format('MMMM DD, YYYY')}</Text>
              <Text style={styles.emoji}>{entry.emoji} {entry.emotion}</Text>
              <Text style={styles.note}>{entry.note}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noData}>No mood logs available for {selectedMonth.format('MMMM')}.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 15,
    color: 'black',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6F00',
    textAlign: 'center',
  },
  monthSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#ffa500',
  },
  monthText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  moodEntry: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#FF6F00',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  emoji: {
    fontSize: 16,
    marginBottom: 5,
  },
  note: {
    fontSize: 14,
    color: '#666',
  },
  noData: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default StudentMoodHistory;
