import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
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
        <Ionicons name="chatbubble-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const PeerSupporters = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../images/Icon.png')} style={styles.logo} />
        <Text style={styles.headerText}>UJ WELLNESS</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="menu" size={24} color="black" />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF1D7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
  },
  logo: {
    width: 30,
    height: 30,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
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
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    marginVertical: 10,
    padding: 15,
    alignItems: 'center',
    width: '100%',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardBio: {
    fontSize: 14,
    color: 'grey',
  },
  chatButton: {
    padding: 10,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  navButton: {
    padding: 10,
  },
});

export default PeerSupporters;
