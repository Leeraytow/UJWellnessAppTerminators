import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Footer from '../Menu/Footer'; 
import { ThemeContext } from '../StudentProfile/ThemeContext'; 

const SupportOption = ({ image, title, description, navigateTo }) => {
  const navigation = useNavigation();
  const { isDarkMode } = useContext(ThemeContext); 

  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: isDarkMode ? '#333' : '#FAFAFA', borderColor: isDarkMode ? '#666' : '#FF6F00' }]} onPress={() => navigation.navigate(navigateTo)}>
      <View style={styles.cardContent}>
        <Image source={image} style={styles.cardImage} />
        <View style={styles.cardTextContainer}>
          <Text style={[styles.cardTitle, { color: isDarkMode ? '#FF6F00' : '#FF6F00' }]}>{title}</Text>
          <Text style={[styles.cardDescription, { color: isDarkMode ? '#ddd' : '#555' }]}>{description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const HelpLine = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useContext(ThemeContext); // Use the ThemeContext

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#222' : '#FAFAFA' }]}>
      <View style={[styles.header, { backgroundColor: isDarkMode ? '#333' : '#FAFAFA', borderBottomColor: isDarkMode ? '#666' : '#FF6F00' }]}>
        <Image source={require('../images/Icon.png')} style={styles.logo} />
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={24} color={isDarkMode ? '#fff' : '#FF6F00'} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.mainTitle, { color: isDarkMode ? '#FF6F00' : '#FF6F00' }]}>We are here for You</Text>
        <Text style={[styles.subTitle, { color: isDarkMode ? '#FF8C00' : '#FF8C00' }]}>Choose your suitable option</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20, 
    paddingHorizontal: 10,
    marginBottom: 80, 
    borderBottomWidth: 1,
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
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    width: '100%',
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
  },
  cardDescription: {
    fontSize: 14,
  },
});

export default HelpLine;
