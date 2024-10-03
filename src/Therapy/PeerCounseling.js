import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Footer from '../Menu/Footer';
import { ThemeContext } from '../StudentProfile/ThemeContext';
import Header from '../Menu/Header';
import { LinearGradient } from 'expo-linear-gradient';

const SupportOption = ({ image, title, description, navigateTo }) => {
  const navigation = useNavigation();
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <TouchableOpacity onPress={() => navigation.navigate(navigateTo)}>
      <LinearGradient
        colors={isDarkMode ? ['#FF8C00', '#FF6F00'] : ['#FFF6F2', '#FFE3D8']}
        style={styles.card}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Image source={image} style={styles.cardImage} />
        <View style={styles.cardTextContainer}>
          <Text style={[styles.cardTitle, { color: isDarkMode ? '#FFF' : '#FF7A45' }]}>{title}</Text>
          <Text style={[styles.cardDescription, { color: isDarkMode ? '#FFEFD5' : '#555555' }]}>{description}</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#FFF" />
      </LinearGradient>
    </TouchableOpacity>
  );
};

const HelpLine = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#1A1A1A' : '#FFFFFF' }]}>
      <Header title="HelpLine" navigation={navigation} />
      
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.mainTitle, { color: isDarkMode ? '#FFA500' : '#FF7A45' }]}>We are here for You</Text>
        <Text style={[styles.subTitle, { color: isDarkMode ? '#FFD700' : '#FF9052' }]}>Choose your suitable option</Text>

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
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 32,  // Adjusted from TherapyButton
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#FF7A45',  // Color matching TherapyButton
  },
  subTitle: {
    fontSize: 18,
    marginBottom: 30,
    textAlign: 'center',
    color: '#555555',  // Color matching subtitle from TherapyButton
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderColor: '#FF9052',  // Matching border color from TherapyButton
    borderWidth: 1,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardImage: {
    width: 60,
    height: 60,
    marginRight: 15,
    borderRadius: 30,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',  // Adjusted from TherapyButton
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
  },
});

export default HelpLine;
