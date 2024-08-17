import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Footer from '../Menu/Footer';
import { ThemeContext } from '../StudentProfile/ThemeContext'; // Import the ThemeContext

const PeerSupporterCard = ({ image, name, phone, bio }) => {
  const { isDarkMode } = useContext(ThemeContext); // Use the ThemeContext
  return (
    <View style={[styles.card, { backgroundColor: isDarkMode ? '#333' : '#FAFAFA', borderColor: isDarkMode ? '#FF6F00' : '#FF6F00' }]}>
      <Image source={image} style={styles.profileImage} />
      <View style={styles.cardTextContainer}>
        <Text style={[styles.cardName, { color: isDarkMode ? '#FF6F00' : '#FF6F00' }]}>{name}</Text>
        <Text style={[styles.cardPhone, { color: isDarkMode ? '#FF6F00' : '#FF6F00' }]}>{phone}</Text>
        <Text style={[styles.cardBio, { color: isDarkMode ? '#FF8C00' : '#FF8C00' }]}>{bio}</Text>
      </View>
      <TouchableOpacity style={[styles.callButton, { backgroundColor: isDarkMode ? '#555' : '#FFEDD5', borderColor: isDarkMode ? '#FF6F00' : '#FF6F00' }]}>
        <Ionicons name="call-outline" size={24} color={isDarkMode ? '#FF6F00' : '#FF6F00'} />
      </TouchableOpacity>
    </View>
  );
};

const PeerSupporters = () => {
  const { isDarkMode } = useContext(ThemeContext); // Use the ThemeContext

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#FAFAFA' }]}>
      <View style={[styles.header, { backgroundColor: isDarkMode ? '#222' : '#FAFAFA', borderBottomColor: isDarkMode ? '#FF6F00' : '#FF6F00' }]}>
        <Image source={require('../images/Icon.png')} style={styles.logo} />
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="menu" size={24} color={isDarkMode ? '#FF6F00' : '#FF6F00'} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.mainTitle, { color: isDarkMode ? '#FF6F00' : '#FF6F00' }]}>Available Peer Supporters</Text>
        <PeerSupporterCard 
          image={require('../images/profile1.jpg')} 
          name="Khensani Mnisi" 
          phone="071-5678-4567" 
          bio="UJ Student in Bcom in Psychology" 
        />
        <PeerSupporterCard 
          image={require('../images/profile2.jpg')} 
          name="Reatlegile Lelele" 
          phone="071-5678-4567" 
          bio="UJ Student in Bcom Social Justice" 
        />
        <PeerSupporterCard 
          image={require('../images/profile3.jpg')} 
          name="Kendrick Damascus" 
          phone="098-9765-0976" 
          bio="UJ Chairperson Humanities community" 
        />
        <PeerSupporterCard 
          image={require('../images/profile2.jpg')} 
          name="Liloth Landon" 
          phone="098-9765-0976" 
          bio="UJ Chairperson Humanities community" 
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
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  card: {
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 1,
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
    marginBottom: 5,
  },
  cardPhone: {
    fontSize: 14,
  },
  cardBio: {
    fontSize: 14,
  },
  callButton: {
    padding: 10,
    borderRadius: 50,
    borderWidth: 1,
  },
});

export default PeerSupporters;
