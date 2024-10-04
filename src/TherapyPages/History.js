import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const History = () => {
  const [selectedSession, setSelectedSession] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  // Sample history data - replace with your actual data
  const sessionHistory = [
    {
      id: 1,
      studentName: 'Sarah Johnson',
      date: '2024-10-01',
      time: '2:00 PM',
      duration: '45 minutes',
      type: 'Anxiety Management',
      progress: 'Improving',
      notes: 'Student showed positive engagement in breathing exercises. Discussed stress management techniques for upcoming exams. Plans to implement daily mindfulness practice.',
      moodStart: 4,
      moodEnd: 6,
      nextSteps: 'Continue practicing breathing techniques, maintain mood journal',
      followUpScheduled: '2024-10-08'
    },
    {
      id: 2,
      studentName: 'Michael Chen',
      date: '2024-09-30',
      time: '11:00 AM',
      duration: '60 minutes',
      type: 'Academic Stress',
      progress: 'Stable',
      notes: 'Discussed work-life balance strategies. Student expressed concerns about academic pressure. Introduced time management techniques and self-care practices.',
      moodStart: 3,
      moodEnd: 5,
      nextSteps: 'Create weekly schedule, incorporate regular breaks',
      followUpScheduled: '2024-10-07'
    }
  ];

  const getMoodEmoji = (rating) => {
    const moods = ['😢', '😕', '😐', '🙂', '😊'];
    return moods[Math.min(Math.floor(rating / 2), 4)];
  };

  const renderProgressIndicator = (progress) => {
    const colors = {
      'Improving': '#4CAF50',
      'Stable': '#FF8C00',
      'Needs Attention': '#f44336'
    };
    return (
      <View style={[styles.progressIndicator, { backgroundColor: colors[progress] || '#666' }]}>
        <Text style={styles.progressText}>{progress}</Text>
      </View>
    );
  };

  const SessionDetailsModal = ({ session, visible, onClose }) => {
    if (!session) return null;

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Session Details</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <View style={styles.sessionInfoSection}>
                <Text style={styles.studentNameLarge}>{session.studentName}</Text>
                <Text style={styles.dateTime}>
                  {format(new Date(session.date), 'PPP')} at {session.time}
                </Text>
              </View>

              <View style={styles.moodSection}>
                <View style={styles.moodContainer}>
                  <Text style={styles.moodLabel}>Start of Session</Text>
                  <Text style={styles.moodEmoji}>{getMoodEmoji(session.moodStart)}</Text>
                  <Text style={styles.moodRating}>{session.moodStart}/10</Text>
                </View>
                <Text style={styles.moodArrow}>→</Text>
                <View style={styles.moodContainer}>
                  <Text style={styles.moodLabel}>End of Session</Text>
                  <Text style={styles.moodEmoji}>{getMoodEmoji(session.moodEnd)}</Text>
                  <Text style={styles.moodRating}>{session.moodEnd}/10</Text>
                </View>
              </View>

              <View style={styles.detailSection}>
                <Text style={styles.sectionTitle}>Session Notes</Text>
                <Text style={styles.notes}>{session.notes}</Text>
              </View>

              <View style={styles.detailSection}>
                <Text style={styles.sectionTitle}>Next Steps</Text>
                <Text style={styles.notes}>{session.nextSteps}</Text>
              </View>

              <View style={styles.followUpSection}>
                <Text style={styles.sectionTitle}>Follow-up</Text>
                <Text style={styles.followUpDate}>
                  Scheduled for: {format(new Date(session.followUpScheduled), 'PPP')}
                </Text>
              </View>
            </ScrollView>

            <TouchableOpacity style={styles.scheduleButton} onPress={onClose}>
              <Text style={styles.scheduleButtonText}>Schedule New Session</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
        <View style={styles.headerContainer}>
        {/* Go Back Button */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.header}> Session History</Text>
      </View>
      <Text style={styles.header}>Session History</Text>
      
      <ScrollView style={styles.historyList}>
        {sessionHistory.map((session) => (
          <TouchableOpacity
            key={session.id}
            style={styles.sessionCard}
            onPress={() => {
              setSelectedSession(session);
              setModalVisible(true);
            }}
          >
            <View style={styles.cardHeader}>
              <View style={styles.dateContainer}>
                <Text style={styles.date}>
                  {format(new Date(session.date), 'MMM d')}
                </Text>
                <Text style={styles.time}>{session.time}</Text>
              </View>
              {renderProgressIndicator(session.progress)}
            </View>

            <View style={styles.cardContent}>
              <View style={styles.mainInfo}>
                <Text style={styles.studentName}>{session.studentName}</Text>
                <Text style={styles.sessionType}>{session.type}</Text>
                <Text style={styles.duration}>{session.duration}</Text>
              </View>
              
              <TouchableOpacity style={styles.viewButton}>
                <Text style={styles.viewButtonText}>View Details</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <SessionDetailsModal
        session={selectedSession}
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setSelectedSession(null);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF8C00',
    marginBottom: 20,
  },
  historyList: {
    flex: 1,
  },
  sessionCard: {
    backgroundColor: '#FFF5E6',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateContainer: {
    backgroundColor: '#FFE0B2',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 80,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF8C00',
  },
  time: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF8C00',
    paddingVertical: 12,
    marginTop: 45,
    paddingHorizontal: 10,
    width: '140%',  // Stretch header to 140% of the screen width
    position: 'relative', // Optional
    left: '-2%',  // Move it left to center it
},

  progressIndicator: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  progressText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  sessionType: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  duration: {
    fontSize: 12,
    color: '#666',
  },
  viewButton: {
    backgroundColor: '#FF8C00',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  viewButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: '80%',
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF8C00',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 28,
    color: '#666',
  },
  modalBody: {
    flex: 1,
  },
  sessionInfoSection: {
    marginBottom: 20,
  },
  studentNameLarge: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  dateTime: {
    fontSize: 16,
    color: '#666',
  },
  moodSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF5E6',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  moodContainer: {
    alignItems: 'center',
  },
  moodLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  moodEmoji: {
    fontSize: 32,
    marginBottom: 4,
  },
  backButton: {
    marginRight: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  moodRating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  moodArrow: {
    fontSize: 24,
    color: '#FF8C00',
  },
  detailSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF8C00',
    marginBottom: 8,
  },
  notes: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  followUpSection: {
    backgroundColor: '#FFF5E6',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  followUpDate: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  scheduleButton: {
    backgroundColor: '#FF8C00',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  scheduleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default History;