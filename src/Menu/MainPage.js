import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback,
  Image,
  Platform,
  StatusBar,
  Dimensions,
  ScrollView,
} from 'react-native';
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Header from './Header';
import Footer from './Footer';
import { ThemeContext } from '../StudentProfile/ThemeContext'; // Import the ThemeContext
import DrawerContent from './DrawerContent'; // Import DrawerContent
import { auth, db } from '../../src/Configuration/firebase';
import { doc, getDoc } from 'firebase/firestore';

const dailyAffirmations = [
  { text: 'You are capable of achieving great things.', image: require('../images/affirmation1.jpg') },
  { text: 'Every day is a new opportunity to grow and improve.', image: require('../images/affirmation2.webp') },
  { text: 'You are worthy of love and respect.', image: require('../images/affirmation3.jpg') },
  { text: 'Believe in yourself and all that you are.', image: require('../images/affirmation4.jpg') },
  { text: 'You have the power to create the life you want.', image: require('../images/affirmation5.jpg') },
];

const { width } = Dimensions.get('window');

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const MainPageContent = () => {
  const [currentAffirmationIndex, setCurrentAffirmationIndex] = useState(0);
  const [username, setUsername] = useState('');
  const { isDarkMode } = useContext(ThemeContext);
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
      setCurrentAffirmationIndex(prevIndex => (prevIndex + 1) % dailyAffirmations.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        try {
          const userRef = doc(db, 'Students', user.uid);
          const docSnap = await getDoc(userRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            setUsername(userData.name.toUpperCase() || ''); // Set the user's name
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error fetching user data: ', error);
        }
      } else {
        setUsername(''); // Clear the username if the user is not authenticated
      }
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, []);

  const currentAffirmation = dailyAffirmations[currentAffirmationIndex];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: isDarkMode ? '#000' : '#fff' }]} >
      <TouchableWithoutFeedback onPress={() => navigation.openDrawer()}>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={[styles.content, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
              <Text style={[styles.greeting, { color: isDarkMode ? '#fff' : '#000' }]}>
                HELLO THERE {username}
              </Text>
              <ImageBackground
                source={currentAffirmation.image}
                style={styles.affirmationBackground}
                imageStyle={{ borderRadius: 10 }}
              >
                <Text style={styles.affirmationText}>{currentAffirmation.text}</Text>
                <Text style={styles.date}>{moment().format('MMMM D, YYYY')}</Text>
              </ImageBackground>
              <TouchableOpacity
                style={[styles.moodButton, { backgroundColor: isDarkMode ? '#FF6F00' : '#FF6F00' }]}
                onPress={() => navigation.navigate('MoodControl')}
              >
                <Text style={styles.moodButtonText}>Click to tell me how you feel</Text>
              </TouchableOpacity>
              <Text style={[styles.toolsText, { color: isDarkMode ? '#fff' : '#000' }]}>Tools</Text>
              <View style={[styles.toolsContainer, { backgroundColor: isDarkMode ? '#444' : '#f0f0f0' }]}>
                <ToolButton
                  title="Podcast and Videos"
                  image={require('../images/podcast.jpeg')}
                  onPress={() => navigation.navigate('UserVid')}
                />
                <ToolButton
                  title="Therapy"
                  image={require('../images/therapy.jpeg')}
                  onPress={() => navigation.navigate('TherapyButton')}
                />
                <ToolButton
                  title="Community Support"
                  image={require('../images/community.jpeg')}
                  onPress={() => navigation.navigate('userList')}
                />
                <ToolButton
                  title="Peer-to-Peer Support"
                  image={require('../images/peer.jpeg')}
                  onPress={() => navigation.navigate('userList')}
                />
                <ToolButton
                  title="Professional Medical Help"
                  image={require('../images/medical.jpeg')}
                  onPress={() => navigation.navigate('MedicalHelp')}
                />
                <ToolButton
                  title="Help Line"
                  image={require('../images/help.jpeg')}
                  onPress={() => navigation.navigate('HelpLine')}
                />
              </View>
            </View>
          </ScrollView>
          <Footer />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const ToolButton = ({ title, image, onPress }) => (
  <TouchableOpacity style={styles.toolButton} onPress={onPress}>
    <Image source={image} style={styles.buttonImage} />
    <Text style={styles.toolButtonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 20, // Ensure there's space for the footer
  },
  content: {
    padding: 20,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  affirmationBackground: {
    width: width - 40,
    height: 200,
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 20,
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
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
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
    borderRadius: 10,
    padding: 10,
  },
  toolButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    width: '48%',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2, // For shadow on Android
    shadowColor: '#000', // For shadow on iOS
    shadowOffset: { width: 0, height: 2 }, // For shadow on iOS
    shadowOpacity: 0.2, // For shadow on iOS
    shadowRadius: 2, // For shadow on iOS
  },
  toolButtonText: {
    fontSize: 14,
    marginTop: 5,
  },
  buttonImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
});

const MainPage = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        header: () => <Header />,
        drawerPosition: 'right', // Set the drawer on the right side
      }}
    >
      <Drawer.Screen name="Main" component={MainPageContent} />
    </Drawer.Navigator>
  );
};

export default MainPage;