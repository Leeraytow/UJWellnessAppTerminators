import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Footer from '../Menu/Footer';
const PeerSupporterCard = ({ image, name, phone, bio }) => {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.profileImage} />
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardName}>{name}</Text>
        <Text style={styles.cardPhone}>{phone}</Text>
        <Text style={styles.cardBio}>{bio}</Text>
      </View>
      <TouchableOpacity style={styles.callButton}>
        <Ionicons name="call-outline" size={24} color="#FF6F00" />
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
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#FAFAFA',
    borderBottomWidth: 1,
    borderBottomColor: '#FF6F00',
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
    color: '#FF6F00',
    marginBottom: 40,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FF6F00',
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
    color: '#FF6F00',
    marginBottom: 5,
  },
  cardPhone: {
    fontSize: 14,
    color: '#FF6F00',
  },
  cardBio: {
    fontSize: 14,
    color: '#FF8C00',
  },
  callButton: {
    padding: 10,
    backgroundColor: '#FFEDD5',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#FF6F00',
  },
});

export default PeerSupporters;
