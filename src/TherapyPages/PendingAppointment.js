import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { format } from 'date-fns';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../Configuration/firebase';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import React, {useState, useEffect} from 'react';
import axios from 'axios';

const PendingAppointments = () => {
  const [pendingAppointments, setPendingAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('');
  const [venue, setVenue] = useState('');
  const [meetingLink, setMeetingLink] = useState('');
  const [profileImages, setProfileImages] = useState({});  // Store profile images here
  const navigation = useNavigation();
  const currentUserEmail = auth.currentUser.email;

  useEffect(() => {
    const fetchPendingAppointments = async () => {
      try {
        const q = query(
          collection(db, 'Bookings'),
          where('therapistEmail', '==', currentUserEmail),
          where('status', '==', 'Pending')
        );

        const querySnapshot = await getDocs(q);
        const appointments = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPendingAppointments(appointments);

        // Fetch profile images for each student
        const profileImagesPromises = appointments.map(async (appointment) => {
          const studentQuery = query(
            collection(db, 'Students'),
            where('email', '==', appointment.email)
          );
          const studentSnapshot = await getDocs(studentQuery);
          const studentData = studentSnapshot.docs[0]?.data();
          return { [appointment.email]: studentData?.profileImage || '' };
        });

        const images = await Promise.all(profileImagesPromises);
        setProfileImages(Object.assign({}, ...images));  // Store images by email
      } catch (error) {
        console.error('Error fetching appointments or images:', error);
      }
    };

    fetchPendingAppointments();
  }, [currentUserEmail]);

  const formatDate = (date) => {
    const validDate = new Date(date);
    return isNaN(validDate) ? date : format(validDate, 'PPP');
  };

  const handleAccept = async () => {
    if (selectedAppointment) {
      try {
        const appointmentRef = doc(db, 'Bookings', selectedAppointment.id);
        await updateDoc(appointmentRef, {
          time: time,
          duration: duration,
          status: 'Confirmed',
          venue: selectedAppointment.meetingType === 'FaceToFace' ? venue : '',
          meetingLink: selectedAppointment.meetingType === 'online' ? meetingLink : ''
        });
  
        // API request to send notification
        const notificationData = {
          appId: '23885', // Your Native Notify app ID
          appToken: 'J0c1pKP0BvWqVKKpfRCi7L', // Your Native Notify app token
          subID: selectedAppointment.email, // Sending notification to this subID
          title: 'Appointment Confirmed!',
          message: `Your appointment with ${currentUserEmail} has been confirmed.`,
          link: meetingLink || 'https://yourapp.com', // Add your link or the meeting link here
          pushEnabled: 1,
        };
  
        await axios.post('https://app.nativenotify.com/api/indie/notification', notificationData);
  
        alert('Appointment Confirmed and Notification Sent!');
        setModalVisible(false);
        setSelectedAppointment(null);
      } catch (error) {
        console.error('Error updating appointment or sending notification:', error);
      }
    }
  };
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

    const profileImage = profileImages[appointment.email];  // Get profile image by email

    return (
      <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Appointment Request</Text>
                <Text style={styles.modalSubtitle}>{formatDate(appointment.selectedDate)}</Text>
              </View>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <View style={styles.studentInfoSection}>
                <View style={styles.avatarContainer}>
                  {profileImage ? (
                    <Image source={{ uri: profileImage }} style={styles.avatar} />  
                  ) : (
                    <View style={styles.avatar}>
                      <Text style={styles.avatarText}>
                        {appointment.name.split(' ').map((n) => n[0]).join('')}
                      </Text>
                    </View>
                  )}
                </View>
                <View style={styles.studentDetails}>
                  <Text style={styles.studentNameLarge}>{appointment.name}</Text>
                </View>
              </View>

              <View style={styles.infoGrid}>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Date</Text>
                  <Text style={styles.infoValue}>
                    {formatDate(appointment.selectedDate)}
                  </Text>
                </View>
               
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Mode</Text>
                  <Text style={styles.infoValue}>{appointment.meetingType}</Text>
                </View>
              </View>

              <View style={styles.contactSection}>
                <Text style={styles.sectionTitle}>Contact Information</Text>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactDetail}>📞 {appointment.contactNumber}</Text>
                  <Text style={styles.contactDetail}>✉️ {appointment.email}</Text>
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Time</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter time (e.g., 10:00 AM)"
                  value={time}
                  onChangeText={setTime}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Duration</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter duration (e.g., 1 hour)"
                  value={duration}
                  onChangeText={setDuration}
                />
              </View>

              {selectedAppointment && selectedAppointment.meetingType === 'FaceToFace' ? (
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Venue</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter venue"
                    value={venue}
                    onChangeText={setVenue}
                  />
                </View>
              ) : (
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Meeting Link</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter meeting link"
                    value={meetingLink}
                    onChangeText={setMeetingLink}
                  />
                </View>
              )}
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
                  handleAccept();
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
        setSelectedAppointment(appointment);  // Correctly set the selected appointment
        setModalVisible(true);
      }}
    >
      <View style={styles.cardHeader}>
        <View style={styles.dateTimeContainer}>
          <Text style={styles.appointmentDate}>
            {formatDate(appointment.selectedDate)}
          </Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.studentSection}>
          {profileImages[appointment.email] ? (
            <Image source={{ uri: profileImages[appointment.email] }} style={styles.smallAvatar} />
          ) : (
            <View style={styles.smallAvatar}>
              <Text style={styles.smallAvatarText}>
                {appointment.name.split(' ').map((n) => n[0]).join('')}
              </Text>
            </View>
          )}
          <View style={styles.studentInfo}>
            <Text style={styles.studentName}>{appointment.name}</Text>
          </View>
        </View>

        <View style={styles.cardFooter}>
          <View style={styles.sessionInfo}>
            <Text style={styles.mode}>{appointment.meetingType}</Text>
          </View>
          <TouchableOpacity style={styles.viewDetailsButton}>
            <Text style={styles.viewDetailsText}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Pending Appointments</Text>

        {pendingAppointments.map((appointment) => renderAppointmentCard(appointment))}

        <AppointmentDetailsModal
          appointment={selectedAppointment}
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      </ScrollView>
    </KeyboardAvoidingView>
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
  inputContainer: {
    marginVertical: 10,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    borderRadius: 4,
  },
});

export default PendingAppointments;