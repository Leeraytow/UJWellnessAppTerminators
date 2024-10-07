import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Footer from './Footer';

const ResourcesScreen = ({ navigation }) => {
  const [activeModal, setActiveModal] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal for "Register Student"
  const RegisterStudentModal = ({ visible, onClose }) => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Register New Student</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>×</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalBody}>
            <TouchableOpacity 
              style={styles.submitButton}
              onPress={() => {
                onClose(); // Close the modal
                navigation.navigate('SessionRecord'); // Navigate to Register screen
              }}
            >
              <Text style={styles.submitButtonText}>Add new Student</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  const renderToolCard = (title, description, onPress, icon) => (
    <TouchableOpacity style={styles.toolCard} onPress={onPress}>
      <View style={styles.toolIconContainer}>
        <Text style={styles.toolIcon}>{icon}</Text>
      </View>
      <Text style={styles.toolTitle}>{title}</Text>
      <Text style={styles.toolDescription}>{description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {/* Go Back Button */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.header}> Tools</Text>
      </View>

      <View style={styles.therapistHeader}>
        <Text style={styles.headerTitle}></Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search students, appointments..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        
        <View style={styles.toolsGrid}>
          {renderToolCard(
            'Register Student',
            'Add a new student to your roster',
            () => setActiveModal('register'),
            '📝'
          )}
          {renderToolCard(
            'Appointments',
            'View and manage your schedule',
            () => navigation.navigate('Appointments'),
            '📅'
          )}
          {renderToolCard(
            'Pending Requests',
            'Review new session requests',
            () => navigation.navigate('PendingAppointments'),
            '⏳'
          )}
          {renderToolCard(
            'History',
            'View past sessions and notes',
            () => navigation.navigate('History'),
            '📚'
          )}
         
          {renderToolCard(
            'Community Support',
            'Generate session reports',
            () => navigation.navigate('MainPost'),
            '📊'
          )}
        </View>
      </ScrollView>
      <Footer />

      {/* Register Student Modal */}
      <RegisterStudentModal 
        visible={activeModal === 'register'}
        onClose={() => setActiveModal(null)}
      />
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    left: '-1%',  // Move it left to center it
},
  backButton: {
    marginRight: 2,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
  },
  
  therapistHeader: {
    padding: 12,
    backgroundColor: '#FFF5E6',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF8C00',
    marginBottom: 16,
  },
  searchContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    elevation: 2,
  },
  searchInput: {
    height: 44,
    fontSize: 16,
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  toolsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  toolCard: {
    width: '47%',
    backgroundColor: '#FFF5E6',
    borderRadius: 16,
    padding: 12,
    elevation: 2,
  },
  toolIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFE0B2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  toolIcon: {
    fontSize: 24,
  },
  toolTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF8C00',
    marginBottom: 8,
  },
  toolDescription: {
    fontSize: 14,
    color: '#666',
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
    fontSize: 28,
    color: '#666',
    padding: 8,
  },
  modalBody: {
    flex: 1,
  },
  submitButton: {
    backgroundColor: '#FF8C00',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ResourcesScreen;
