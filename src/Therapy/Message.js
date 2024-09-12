import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Footer from '../Menu/Footer';
import { ThemeContext } from '../StudentProfile/ThemeContext'; 
import { FontSizeContext } from '../StudentProfile/FontSizeContext'; 

const PeerSupporterCard = ({ image, name, bio }) => {
  const { isDarkMode } = useContext(ThemeContext); 
  const { fontSize } = useContext(FontSizeContext); 

  return (
    <View style={[styles.card, { backgroundColor: isDarkMode ? '#333' : '#FAFAFA' }]}>
      <Image source={image} style={styles.profileImage} />
      <View style={styles.cardTextContainer}>
        <Text style={[styles.cardName, { color: isDarkMode ? '#FF6F00' : '#FF6F00', fontSize }]}>{name}</Text>
        <Text style={[styles.cardBio, { color: isDarkMode ? '#FF8C00' : '#FF8C00', fontSize: fontSize - 2 }]}>{bio}</Text>
      </View>
      <TouchableOpacity style={styles.chatButton}>
        <Ionicons name="chatbubble-outline" size={24} color={isDarkMode ? '#FF6F00' : '#FF6F00'} />
      </TouchableOpacity>
    </View>
  );
};

const PeerSupporters = () => {
  const { isDarkMode } = useContext(ThemeContext); 
  const { fontSize } = useContext(FontSizeContext); 

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#222' : '#FAFAFA' }]}>
      <View style={[styles.header, { backgroundColor: isDarkMode ? '#222' : '#FAFAFA', borderBottomColor: isDarkMode ? '#FF6F00' : '#FF6F00' }]}>
        <Image source={require('../images/Icon.png')} style={styles.logo} />
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="menu" size={24} color={isDarkMode ? '#FF6F00' : '#FF6F00'} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.mainTitle, { color: isDarkMode ? '#FF6F00' : '#FF6F00', fontSize }]}>Available Peer Supporters</Text>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
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
    fontSize: 22, // Removed hardcoded font size in favor of dynamic sizing from context
    fontWeight: 'bold',
    marginBottom: 40,
  },
  card: {
    flexDirection: 'row',
    borderRadius: 10,
    elevation: 3,
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
    fontSize: 18, // Removed hardcoded font size
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardBio: {
    fontSize: 14, // Removed hardcoded font size
  },
  chatButton: {
    padding: 10,
  },
});

export default PeerSupporters;
