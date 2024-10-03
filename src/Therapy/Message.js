import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Footer from '../Menu/Footer';
import { ThemeContext } from '../StudentProfile/ThemeContext'; 
import { FontSizeContext } from '../StudentProfile/FontSizeContext'; 
import Header from '../Menu/Header';

const PeerSupporterCard = ({ image, name, bio, specialties, availability }) => {
  const { isDarkMode } = useContext(ThemeContext); 
  const { fontSize } = useContext(FontSizeContext); 

  return (
    <View style={[styles.card, { 
      backgroundColor: isDarkMode ? '#333' : '#fff',
      borderColor: isDarkMode ? '#444' : '#eee'
    }]}>
      <View style={styles.cardHeader}>
        <Image source={image} style={styles.profileImage} />
        <View style={styles.cardTextContainer}>
          <Text style={[styles.cardName, { 
            color: isDarkMode ? '#FF6F00' : '#FF9052', 
            fontSize: fontSize + 2 
          }]}>{name}</Text>
          <View style={styles.statusContainer}>
            <View style={[styles.statusDot, { 
              backgroundColor: '#4CAF50' 
            }]} />
            <Text style={[styles.statusText, { 
              color: isDarkMode ? '#ddd' : '#666',
              fontSize: fontSize - 4
            }]}>Online</Text>
          </View>
        </View>
      </View>

      <View style={styles.cardBody}>
        <Text style={[styles.cardBio, { 
          color: isDarkMode ? '#ddd' : '#666',
          fontSize: fontSize - 2 
        }]}>{bio}</Text>

        <View style={styles.specialtiesContainer}>
          {['Anxiety', 'Depression', 'Stress'].map((specialty, index) => (
            <View key={index} style={[styles.specialtyTag, {
              backgroundColor: isDarkMode ? '#444' : '#FFF3E0'
            }]}>
              <Text style={[styles.specialtyText, {
                color: isDarkMode ? '#FF6F00' : '#FF6F00',
                fontSize: fontSize - 4
              }]}>{specialty}</Text>
            </View>
          ))}
        </View>

        <View style={styles.availabilityContainer}>
          <Ionicons name="time-outline" size={16} color={isDarkMode ? '#ddd' : '#666'} />
          <Text style={[styles.availabilityText, {
            color: isDarkMode ? '#ddd' : '#666',
            fontSize: fontSize - 3
          }]}>Available: Mon-Fri, 9AM-5PM</Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <TouchableOpacity style={[styles.chatButton, {
          backgroundColor: isDarkMode ? '#FF6F00' : '#FF9052'
        }]}>
          <Ionicons name="chatbubble-outline" size={20} color="#fff" />
          <Text style={[styles.chatButtonText, {
            fontSize: fontSize - 2
          }]}>Start Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.scheduleButton, {
          borderColor: isDarkMode ? '#FF6F00' : '#FF9052'
        }]}>
          <Text style={[styles.scheduleButtonText, {
            color: isDarkMode ? '#FF6F00' : '#FF9052',
            fontSize: fontSize - 2
          }]}>Schedule Call</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const PeerSupporters = () => {
  const { isDarkMode } = useContext(ThemeContext); 
  const { fontSize } = useContext(FontSizeContext); 

  const supporters = [
    {
      id: 1,
      image: require('../images/profile1.jpg'),
      name: "Khensani Mnisi",
      bio: "3rd year Psychology student passionate about mental health. Experienced in helping peers navigate academic stress and personal growth.",
      specialties: ["Anxiety", "Depression", "Stress"],
      availability: "Mon-Fri, 9AM-5PM"
    },
    {
      id: 2,
      image: require('../images/profile2.jpg'),
      name: "Liloith Landon",
      bio: "Graduate student with focus on youth counseling. Certified in peer support and crisis intervention.",
      specialties: ["Self-esteem", "Relationships", "Academic"],
      availability: "Tue-Sat, 10AM-6PM"
    },
    {
      id: 3,
      image: require('../images/profile3.jpg'),
      name: "Sarah Johnson",
      bio: "Psychology major with experience in wellness coaching. Specialized in stress management and academic support.",
      specialties: ["Stress", "Wellness", "Academic"],
      availability: "Mon-Thu, 11AM-7PM"
    }
  ];

  return (
    <SafeAreaView style={[styles.container, { 
      backgroundColor: isDarkMode ? '#222' : '#f5f5f5' 
    }]}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={[styles.mainTitle, { 
            color: isDarkMode ? '#FF6F00' : '#FF9052',
            fontSize: fontSize + 4
          }]}>Peer Supporters</Text>
          <Text style={[styles.subtitle, {
            color: isDarkMode ? '#ddd' : '#666',
            fontSize: fontSize - 2
          }]}>Connect with trained peers who understand your journey</Text>
        </View>

        {supporters.map((supporter) => (
          <PeerSupporterCard 
            key={supporter.id}
            image={supporter.image}
            name={supporter.name}
            bio={supporter.bio}
            specialties={supporter.specialties}
            availability={supporter.availability}
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
  titleContainer: {
    marginBottom: 24,
  },
  mainTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    opacity: 0.8,
  },
  card: {
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  cardTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cardName: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    opacity: 0.8,
  },
  cardBody: {
    padding: 16,
  },
  cardBio: {
    lineHeight: 20,
    marginBottom: 12,
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  specialtyTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  specialtyText: {
    fontWeight: '500',
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  availabilityText: {
    marginLeft: 6,
  },
  cardFooter: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  chatButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  chatButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  scheduleButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  scheduleButtonText: {
    fontWeight: 'bold',
  },
});

export default PeerSupporters;