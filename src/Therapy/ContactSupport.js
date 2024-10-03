import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Footer from '../Menu/Footer';
import { ThemeContext } from '../StudentProfile/ThemeContext';
import Header from '../Menu/Header';
import { LinearGradient } from 'expo-linear-gradient';

const PeerSupporterCard = ({ image, name, phone, bio, specialties, availability }) => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <LinearGradient
      colors={isDarkMode ? ['#2C2C2C', '#3D3D3D'] : ['#FFF6F2', '#FFE3D8']}
      style={styles.card}
    >
      <View style={styles.cardHeader}>
        <Image source={image} style={styles.profileImage} />
        <View style={styles.headerTextContainer}>
          <Text style={[styles.cardName, { color: isDarkMode ? '#FF9F45' : '#FF9052' }]}>{name}</Text>
          <View style={styles.contactContainer}>
            <Ionicons name="call" size={14} color={isDarkMode ? '#FFB973' : '#FF8C00'} />
            <Text style={[styles.cardPhone, { color: isDarkMode ? '#FFB973' : '#FF8C00' }]}>{phone}</Text>
          </View>
        </View>
        <LinearGradient
          colors={isDarkMode ? ['#FF8C00', '#FF6F00'] : ['#FFA500', '#FF9052']}
          style={styles.statusBadge}
        >
          <Text style={styles.statusText}>Online</Text>
        </LinearGradient>
      </View>

      <View style={styles.cardBody}>
        <Text style={[styles.cardBio, { color: isDarkMode ? '#FFD7A8' : 'black' }]}>{bio}</Text>
        
        <View style={styles.specialtiesContainer}>
          {specialties?.map((specialty, index) => (
            <LinearGradient
              key={index}
              colors={isDarkMode ? ['#FF8C00', '#FF6F00'] : ['#FFF3E0', '#FFE0B2']}
              style={styles.specialtyTag}
            >
              <Text style={[styles.specialtyText, { 
                color: isDarkMode ? '#FFF' : 'black'
              }]}>{specialty}</Text>
            </LinearGradient>
          ))}
        </View>

        <View style={styles.availabilityContainer}>
          <Ionicons name="time-outline" size={16} color={isDarkMode ? '#FFB973' : '#FF8C00'} />
          <Text style={[styles.availabilityText, { 
            color: isDarkMode ? '#FFB973' : '#FF8C00' 
          }]}>{availability}</Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <TouchableOpacity style={styles.actionButton}>
          <LinearGradient
            colors={isDarkMode ? ['#FF8C00', '#FF6F00'] : ['#FC9842', '#FE5F75']}
            style={styles.actionButtonGradient}
          >
            <Ionicons name="call-outline" size={20} color="#FFF" />
            <Text style={styles.actionButtonText}>Call</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const PeerSupporters = () => {
  const { isDarkMode } = useContext(ThemeContext);

  const supporters = [
    {
      id: 1,
      image: require('../images/profile1.jpg'),
      name: "Khensani Mnisi",
      phone: "071-5678-4567",
      bio: "UJ Student in BCom Psychology | Peer Counselor",
      specialties: ["Anxiety", "Academic Support", "Stress"],
      availability: "Mon-Fri, 9AM-5PM"
    },
    {
      id: 2,
      image: require('../images/profile2.jpg'),
      name: "Reatlegile Lelele",
      phone: "071-5678-4567",
      bio: "UJ Student in BCom Social Justice | Mental Health Advocate",
      specialties: ["Depression", "Social Issues", "Well-being"],
      availability: "Tue-Sat, 10AM-6PM"
    },
    {
      id: 3,
      image: require('../images/profile3.jpg'),
      name: "Kendrick Damascus",
      phone: "098-9765-0976",
      bio: "UJ Chairperson Humanities Community | Student Mentor",
      specialties: ["Leadership", "Personal Growth", "Career"],
      availability: "Mon-Thu, 11AM-7PM"
    },
    {
      id: 4,
      image: require('../images/profile2.jpg'),
      name: "Liloth Landon",
      phone: "098-9765-0976",
      bio: "UJ Chairperson Humanities Community | Wellness Coach",
      specialties: ["Self-care", "Mindfulness", "Balance"],
      availability: "Wed-Sun, 9AM-5PM"
    }
  ];

  return (
    <SafeAreaView style={[styles.container, { 
      backgroundColor: isDarkMode ? '#1A1A1A' : '#FFFFFF' 
    }]}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.titleSection}>
          <Text style={[styles.mainTitle, { 
            color: isDarkMode ? '#FFA500' : '#FF9052' 
          }]}>Peer Supporters</Text>
          <Text style={[styles.subtitle, { 
            color: isDarkMode ? '#FFB973' : '#FF9052' 
          }]}>Connect with understanding peers</Text>
        </View>

        {supporters.map(supporter => (
          <PeerSupporterCard 
            key={supporter.id}
            {...supporter}
          />
        ))}
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  titleSection: {
    marginBottom: 24,
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.9,
    marginBottom: 16,
  },
  card: {
    borderRadius: 20,
    marginBottom: 16,
    padding: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#FF9F45',
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  cardName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardPhone: {
    fontSize: 14,
    marginLeft: 4,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  cardBody: {
    marginBottom: 16,
  },
  cardBio: {
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  specialtyTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  specialtyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  availabilityText: {
    fontSize: 13,
    marginLeft: 6,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 12,
    overflow: 'hidden',
  },
  actionButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  actionButtonText: {
    color: '#FFF',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
  }
});

export default PeerSupporters;
