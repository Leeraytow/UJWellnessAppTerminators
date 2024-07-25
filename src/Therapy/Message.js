import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Footer from '../Menu/Footer';

const PeerSupporterCard = ({ image, name, bio }) => {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.profileImage} />
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardName}>{name}</Text>
        <Text style={styles.cardBio}>{bio}</Text>
      </View>
      <TouchableOpacity style={styles.chatButton}>
        <Ionicons name="chatbubble-outline" size={24} color="#FF6F00" />
      </TouchableOpacity>
    </View>
  );
};

const PeerSupporters = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../images/Icon.png')} style={styles.logo} />
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="menu" size={24} color="#FF6F00" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.mainTitle}>Available Peer Supporters</Text>
        <PeerSupporterCard 
          image={require('../images/profile1.jpg')} 
          name="Khensani Mnisi" 
          bio="23 year old doing Bcom in Psychology\nI love nature walks and listening to Music." 
        />
        <PeerSupporterCard 
          image={require('../images/profile2.jpg')} 
          name="Liloith Landon" 
          bio="23 year old doing Bcom in Psychology\nI love nature walks and listening to Music." 
        />
        <PeerSupporterCard 
          image={require('../images/profile3.jpg')} 
          name="Liloith Landon" 
          bio="23 year old doing Bcom in Psychology\nI love nature walks and listening to Music." 
        />
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA', // Light orange background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15, // Reduced padding for a more compact header
    paddingHorizontal: 20,
    backgroundColor: '#FAFAFA', // Light orange background
    borderBottomWidth: 1,
    borderBottomColor: '#FF6F00', // Darker orange border
    marginTop: 30,
  },
  logo: {
    width: 30,
    height: 30,
  },
  menuButton: {
    padding: 5,
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF6F00', // Darker orange text color
    marginBottom: 40,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FAFAFA', // Light orange card background
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#FF6F00', // Orange shadow color
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    marginVertical: 10,
    padding: 15,
    alignItems: 'center',
    width: '100%',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6F00', // Darker orange text color
    marginBottom: 5,
  },
  cardBio: {
    fontSize: 14,
    color: '#FF8C00', // Slightly lighter orange text color
  },
  chatButton: {
    padding: 10,
  },
});

export default PeerSupporters;
