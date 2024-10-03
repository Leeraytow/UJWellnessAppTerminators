import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../Configuration/firebase'; // Import Firebase
import Footer from '../Menu/Footer';

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
        <TouchableOpacity onPress={() => changeMonth(-1)} style={styles.monthButton}>
          <Icon name="chevron-left" size={24} color="#FF6F00" />
        </TouchableOpacity>
        <Text style={styles.monthText}>
          {selectedMonth.format('MMMM YYYY')}
        </Text>
        <TouchableOpacity onPress={() => changeMonth(1)} style={styles.monthButton}>
          <Icon name="chevron-right" size={24} color="#FF6F00" />
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
      <Footer />
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#FF6F00',
    marginTop: 40,  // Adds space from the top of the screen
  },
  backButton: {
    position: 'absolute',
    left: 15,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  monthSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: '#ffb74d',
    borderRadius: 10,
    margin: 15,
    shadowColor: '#FF6F00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  monthButton: {
    padding: 10,
  },
  monthText: {
    fontSize: 18,
    color: '#FF6F00',
    fontWeight: 'bold',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  moodEntry: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  date: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
    marginBottom: 8,
  },
  emoji: {
    fontSize: 16,
    marginBottom: 5,
    color: '#FF6F00',
  },
  note: {
    fontSize: 14,
    color: '#666',
  },
  noData: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default StudentMoodHistory;
