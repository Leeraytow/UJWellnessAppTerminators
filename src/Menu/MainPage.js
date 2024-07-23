import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, SafeAreaView, TouchableWithoutFeedback, AsyncStorage, Image, Platform, StatusBar,Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import Footer from './Footer';
import { useRoute } from '@react-navigation/native';

const dailyAffirmations = [
  { text: "You are capable of achieving great things.", image: require('../images/affirmation1.jpg') },
  { text: "Every day is a new opportunity to grow and improve.", image: require('../images/affirmation2.webp') },
  { text: "You are worthy of love and respect.", image: require('../images/affirmation3.jpg') },
  { text: "Believe in yourself and all that you are.", image: require('../images/affirmation4.jpg') },
  { text: "You have the power to create the life you want.", image: require('../images/affirmation5.jpg') },
];
const { width } = Dimensions.get('window');

const MainPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentAffirmationIndex, setCurrentAffirmationIndex] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    const checkAffirmation = async () => {
      try {
        const lastIndex = await AsyncStorage.getItem('affirmationIndex');
        const lastDate = await AsyncStorage.getItem('affirmationDate');
        const today = moment().startOf('day');
        const storedDate = moment(lastDate, 'YYYY-MM-DD');

        let newIndex = 0;

        if (lastIndex !== null && lastDate !== null && today.diff(storedDate, 'days') < 1) {
          newIndex = parseInt(lastIndex);
        } else {
          newIndex = (parseInt(lastIndex) + 1) % dailyAffirmations.length;
          await AsyncStorage.setItem('affirmationIndex', newIndex.toString());
          await AsyncStorage.setItem('affirmationDate', today.format('YYYY-MM-DD'));
        }

        setCurrentAffirmationIndex(newIndex);
      } catch (error) {
        console.error('Failed to load the affirmation index.', error);
      }
    };

    checkAffirmation();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAffirmationIndex(prevIndex => {
        const newIndex = (prevIndex + 1) % dailyAffirmations.length;
        return newIndex;
      });
    }, 6000); 

    return () => clearInterval(interval);
  }, []);

  const currentAffirmation = dailyAffirmations[currentAffirmationIndex];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };
  const route = useRoute();
  const { userName, userEmail } = route.params;
  
  const [upperCaseUserName, setUpperCaseUserName] = useState('');
  useEffect(() => {
    if (userName) {
      setUpperCaseUserName(userName.toUpperCase());
    }
  }, [userName]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={closeMenu}>
        <View style={styles.container}>
          <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} closeMenu={closeMenu} />
          <View style={styles.content}>
            <Text style={styles.greeting}>HELLO THERE {upperCaseUserName}</Text>
            <ImageBackground
              source={currentAffirmation.image}
              style={styles.affirmationBackground}
              imageStyle={{ borderRadius: 10 }}
            >
              <Text style={styles.affirmationText}>{currentAffirmation.text}</Text>
              <Text style={styles.date}>{moment().format('MMMM D, YYYY')}</Text>
            </ImageBackground>
            <TouchableOpacity style={styles.moodButton} onPress={() => navigation.navigate('MoodControl')}>
              <Text style={styles.moodButtonText}>Click to tell me how you feel</Text>
            </TouchableOpacity>
            <Text style={styles.toolsText}>Tools</Text>
            <View style={styles.toolsContainer}>
              <TouchableOpacity style={styles.toolButton} onPress={() => navigation.navigate('Video')}>
                <Image source={require('../images/podcast.jpeg')} style={styles.buttonImage} />
                <Text style={styles.toolButtonText}>Podcast and Videos</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.toolButton} onPress={() => navigation.navigate('TherapyButton')}>
                <Image source={require('../images/therapy.jpeg')} style={styles.buttonImage} />
                <Text style={styles.toolButtonText}>Therapy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.toolButton} onPress={() => navigation.navigate('GroupChatApp')}>
                <Image source={require('../images/community.jpeg')} style={styles.buttonImage} />
                <Text style={styles.toolButtonText}>Community Support</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.toolButton} onPress={() => navigation.navigate('PeerToPeerSupport')}>
                <Image source={require('../images/peer.jpeg')} style={styles.buttonImage} />
                <Text style={styles.toolButtonText}>Peer-to-Peer Support</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.toolButton} onPress={() => navigation.navigate('AddVideoSlider')}>
                <Image source={require('../images/medical.jpeg')} style={styles.buttonImage} />
                <Text style={styles.toolButtonText}>Professional Medical Help</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.toolButton} onPress={() => navigation.navigate('HelpLine')}>
                <Image source={require('../images/help.jpeg')} style={styles.buttonImage} />
                <Text style={styles.toolButtonText}>Help Line</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Footer />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  
  },
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    padding: 20,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  affirmationBackground: {
    width: 350, // Fixed width
    height:200,
    alignSelf: 'center', // Center the image horizontally
    justifyContent: 'center',
// Reduced margin to accommodate the button
  },
  affirmationText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 10,
  },
  date: {
    fontSize: 12,
    textAlign: 'center',
    color: '#fff',
    marginTop: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
    borderRadius: 10,
  },
  moodButton: {
    backgroundColor: '#FFA500', 
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20, // Space around the button
  },
  moodButtonText: {
    color: '#fff', 
    fontSize: 16,
    fontWeight: 'bold',
  },
  toolsText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 18,
  },
  toolsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
   
  },
  toolButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    width: '48%', // Set a fixed width for the buttons
  },
  toolButtonText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 12,
    marginTop: 5,
  },
  buttonImage: {
    width: 48,
    height: 48,
  },
});

export default MainPage; 
