import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Footer from '../Menu/Footer'; 

const SupportOption = ({ image, title, description, navigateTo }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate(navigateTo)}>
      <View style={styles.cardContent}>
        <Image source={image} style={styles.cardImage} />
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardDescription}>{description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const HelpLine = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../images/Icon.png')} style={styles.logo} />
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={24} color="#FF6F00" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.mainTitle}>We are here for You</Text>
        <Text style={styles.subTitle}>Choose your suitable option</Text>
        <SupportOption 
          image={require('../images/MainPage.png')} 
          title="Contact Support" 
          description="Speak with someone right now" 
          navigateTo="ContactSupport"
        />
        <SupportOption 
          image={require('../images/EntryDiary.png')} 
          title="Message" 
          description="Chat with our available mentors" 
          navigateTo="Message"
        />
        <SupportOption 
          image={require('../images/ChatVideo img.png')} 
          title="Professional Support" 
          description="Speak with our available professional therapist" 
          navigateTo="ProfessionalSupport"
        />
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA', // Light cream background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20, // Adds space at the top
    paddingHorizontal: 10,
    backgroundColor: '#FAFAFA', // Peach puff background
    marginBottom: 80, // Adds space below the header
    borderBottomWidth: 1,
    borderBottomColor: '#FF6F00', // Dark orange border
  },
  logo: {
    width: 50,
    height: 50,
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
    color: '#FF6F00', // Dark orange title
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 16,
    color: '#FF8C00', // Light orange subtitle
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA', // Peach puff background
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    width: '100%',
    shadowColor: '#FF4500', // Orange shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    borderColor: '#FF6F00', // Dark orange border
    borderWidth: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  cardImage: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6F00', // Dark orange title
  },
  cardDescription: {
    fontSize: 14,
    color: '#555', // Dark gray description
  },
});

export default HelpLine;
