import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { format } from 'date-fns';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'; // Ensure you have this import

const PendingAppointments = () => {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  // Sample pending appointments data
  const pendingAppointments = [
    {
      id: 1,
      studentName: 'Alice Johnson',
      subject: 'Mental Health Consultation',
      date: '2024-10-05',
      time: '11:00 AM',
      duration: '45 minutes',
      notes: 'First-time consultation - Experiencing academic anxiety',
      preferredMode: 'Video Call',
      urgency: 'Medium',
      previousSessions: 0,
      contactNumber: '+1 234-567-8900',
      email: 'alice.j@email.com',
    },
    {
      id: 2,
      studentName: 'Bob Wilson',
      subject: 'Follow-up Session',
      date: '2024-10-06',
      time: '3:00 PM',
      duration: '30 minutes',
      notes: 'Follow-up on stress management techniques',
      preferredMode: 'In-person',
      urgency: 'High',
      previousSessions: 3,
      contactNumber: '+1 234-567-8901',
      email: 'bob.w@email.com',
    },
  ];

  const getUrgencyColor = (urgency) => {
    const colors = {
      High: '#FF6B6B',
      Medium: '#FF8C00',
      Low: '#4CAF50',
    };
    return colors[urgency] || '#666';
  };

  const AppointmentDetailsModal = ({ appointment, visible, onClose }) => {
    if (!appointment) return null;

    return (
      <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Appointment Request</Text>
                <Text style={styles.modalSubtitle}>{format(new Date(appointment.date), 'PPP')}</Text>
              </View>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <View style={styles.studentInfoSection}>
                <View style={styles.avatarContainer}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                      {appointment.studentName.split(' ').map((n) => n[0]).join('')}
                    </Text>
                  </View>
                </View>
                <View style={styles.studentDetails}>
                  <Text style={styles.studentNameLarge}>{appointment.studentName}</Text>
                  <Text style={styles.sessionCount}>
                    {appointment.previousSessions === 0
                      ? 'First Session'
                      : `${appointment.previousSessions} Previous Sessions`}
                  </Text>
                </View>
              </View>

              <View style={styles.infoGrid}>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Date</Text>
                  <Text style={styles.infoValue}>
                    {format(new Date(appointment.date), 'MMM d, yyyy')}
                  </Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Time</Text>
                  <Text style={styles.infoValue}>{appointment.time}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Duration</Text>
                  <Text style={styles.infoValue}>{appointment.duration}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Mode</Text>
                  <Text style={styles.infoValue}>{appointment.preferredMode}</Text>
                </View>
              </View>

              <View style={styles.notesSection}>
                <Text style={styles.sectionTitle}>Session Notes</Text>
                <Text style={styles.notes}>{appointment.notes}</Text>
              </View>

              <View style={styles.contactSection}>
                <Text style={styles.sectionTitle}>Contact Information</Text>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactDetail}>📞 {appointment.contactNumber}</Text>
                  <Text style={styles.contactDetail}>✉️ {appointment.email}</Text>
                </View>
              </View>
            </ScrollView>

            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[styles.actionButton, styles.rescheduleButton]}
                onPress={() => {
                  // Implement reschedule logic
                  onClose();
                }}
              >
                <Text style={styles.rescheduleButtonText}>Reschedule</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.acceptButton]}
                onPress={() => {
                  // Implement accept logic
                  onClose();
                }}
              >
                <Text style={styles.acceptButtonText}>Accept</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const renderAppointmentCard = (appointment) => (
    <TouchableOpacity
      key={appointment.id}
      style={styles.appointmentCard}
      onPress={() => {
        setSelectedAppointment(appointment);
        setModalVisible(true);
      }}
    >
      <View style={styles.cardHeader}>
        <View style={styles.dateTimeContainer}>
          <Text style={styles.appointmentDate}>
            {format(new Date(appointment.date), 'EEE, MMM d')}
          </Text>
          <Text style={styles.appointmentTime}>{appointment.time}</Text>
        </View>
        <View style={[styles.urgencyBadge, { backgroundColor: getUrgencyColor(appointment.urgency) }]}>
          <Text style={styles.urgencyText}>{appointment.urgency}</Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.studentSection}>
          <View style={styles.smallAvatar}>
            <Text style={styles.smallAvatarText}>
              {appointment.studentName.split(' ').map((n) => n[0]).join('')}
            </Text>
          </View>
          <View style={styles.studentInfo}>
            <Text style={styles.studentName}>{appointment.studentName}</Text>
            <Text style={styles.appointmentType}>{appointment.subject}</Text>
          </View>
        </View>

        <View style={styles.cardFooter}>
          <View style={styles.sessionInfo}>
            <Text style={styles.duration}>{appointment.duration}</Text>
            <Text style={styles.mode}>{appointment.preferredMode}</Text>
          </View>
          <TouchableOpacity style={styles.viewDetailsButton}>
            <Text style={styles.viewDetailsText}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.header}>Pending Requests</Text>
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{pendingAppointments.length}</Text>
        </View>
      </View>

      {/* Appointments List */}
      <ScrollView style={styles.appointmentsList}>
        {pendingAppointments.map(renderAppointmentCard)}
      </ScrollView>

      <AppointmentDetailsModal
        appointment={selectedAppointment}
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setSelectedAppointment(null);
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
  backButton: {
    marginRight: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
  },
  badgeContainer: {
    backgroundColor: '#FFE0B2',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginLeft: 'auto', // Align badge to the right
  },
  badgeText: {
    color: '#FF8C00',
    fontWeight: 'bold',
    fontSize: 16,
  },
  appointmentsList: {
    flex: 1,
  },
  appointmentCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    marginVertical: 8,
    padding: 16,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateTimeContainer: {
    flex: 1,
  },
  appointmentDate: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  appointmentTime: {
    fontSize: 14,
    color: '#666',
  },
  urgencyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  urgencyText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  cardBody: {
    marginTop: 10,
  },
  studentSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  smallAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF8C00',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  smallAvatarText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  appointmentType: {
    fontSize: 14,
    color: '#666',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  sessionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  duration: {
    fontSize: 14,
    marginRight: 10,
  },
  mode: {
    fontSize: 14,
    color: '#666',
  },
  viewDetailsButton: {
    backgroundColor: '#FF8C00',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  viewDetailsText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#666',
  },
  modalBody: {
    marginTop: 16,
  },
  studentInfoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF8C00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 20,
  },
  studentDetails: {
    flex: 1,
  },
  studentNameLarge: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sessionCount: {
    fontSize: 14,
    color: '#666',
  },
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infoItem: {
    flex: 1,
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
  },
  notesSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  notes: {
    fontSize: 14,
    color: '#666',
  },
  contactSection: {
    marginBottom: 16,
  },
  contactInfo: {
    flexDirection: 'column',
  },
  contactDetail: {
    fontSize: 14,
    color: '#333',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  actionButton: {
    flex: 1,
    borderRadius: 20,
    paddingVertical: 10,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  rescheduleButton: {
    backgroundColor: '#FF8C00',
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
  },
  rescheduleButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  acceptButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default PendingAppointments;
