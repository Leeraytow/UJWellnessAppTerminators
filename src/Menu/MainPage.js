import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Animated, SafeAreaView, ScrollView, Alert } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../Menu/Footer';
import Header from '../Menu/Header';
import { Ionicons } from '@expo/vector-icons'; 

const MainScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(''); // Set initial name to an empty string
  const [fadeAnim] = useState(new Animated.Value(0));
  const [pickedImage, setPickedImage] = useState(null);

  // Fetch real user name from AsyncStorage or route params
  useEffect(() => {
    const loadUserName = async () => {
      try {
        const storedName = await AsyncStorage.getItem('userName');
        if (storedName) {
          setName(storedName);
        } else if (route.params?.userName) {
          setName(route.params.userName);
          await AsyncStorage.setItem('userName', route.params.userName);
        }
      } catch (error) {
        console.error('Error fetching user name:', error);
      }
    };

    loadUserName();
  }, [route.params]);

  const toggleEditing = () => setIsEditing(!isEditing);

  const handleEditName = async () => {
    toggleEditing();
    if (isEditing) {
      console.log('Name Updated:', name);
      try {
        await AsyncStorage.setItem('userName', name); // Save updated name
      } catch (error) {
        console.error('Error saving user name:', error);
      }
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Sorry, we need media library permissions to select an image.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPickedImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  // Example emotions data
  const emotions = [
    { id: 1, emoji: '😊', label: 'Happy' },
    { id: 2, emoji: '😢', label: 'Sad' },
    { id: 3, emoji: '😡', label: 'Angry' },
    { id: 4, emoji: '😴', label: 'Tired' },
    { id: 5, emoji: '😎', label: 'Cool' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient colors={['#E0B0FF', '#8ec5fc']} style={styles.container}>
          <Animated.View style={[styles.wrapper, { opacity: fadeAnim }]}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.iconsContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
                  <Feather name="bell" size={24} color="#6a1b9a" style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Messages')}>
                  <Feather name="message-circle" size={24} color="#6a1b9a" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={pickImage} style={styles.profileImageContainer}>
              <Image
  source={{ uri: pickedImage || 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png' }}
  style={styles.profileImage}
  onError={(e) => {
    console.error('Error loading image:', e.nativeEvent.error);
    setPickedImage(null); // Optional: clear image if there's an error
  }}
/>
              </TouchableOpacity>
            </View>

            <View style={styles.nameContainer}>
              {isEditing ? (
                <TextInput
                  value={name}
                  onChangeText={setName}
                  style={styles.nameInput}
                  placeholder="Enter your name"
                  placeholderTextColor="gray"
                />
              ) : (
                <Text style={styles.name}>Welcome, {name}</Text>
              )}
              <TouchableOpacity onPress={handleEditName} style={styles.editIcon}>
                <MaterialIcons name="edit-square" size={24} color="#6a1b9a" />
              </TouchableOpacity>
            </View>

            {/* Appointments */}
            <TouchableOpacity onPress={() => navigation.navigate('AppointmentStudent')}>
              <LinearGradient colors={['#7DDFF8', '#B1ADE2']} style={styles.appointmentsContainer}>
                <Text style={styles.sectionTitle}>Next Appointments</Text>
                <View style={styles.appointmentCards}>
                  <View style={styles.appointmentCard}>
                    <Text style={styles.appointmentDate}>03 Feb</Text>
                    <Text style={styles.appointmentDetails}>16:00</Text>
                    <Text style={styles.appointmentDetails}>Online Session</Text>
                  </View>
                  <View style={styles.appointmentCard}>
                    <Text style={styles.appointmentDate}>10 Feb</Text>
                    <Text style={styles.appointmentDetails}>14:00</Text>
                    <Text style={styles.appointmentDetails}>Face to Face</Text>
                  </View>
                  <View style={styles.appointmentCard}>
                    <Text style={styles.appointmentDate}>17 Feb</Text>
                    <Text style={styles.appointmentDetails}>11:30</Text>
                    <Text style={styles.appointmentDetails}>Online Session</Text>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            {/* Emotions */}
            <View style={styles.emotionsSection}>
              <Text style={styles.sectionFeel}>How do you feel?</Text>
              <View style={styles.emotionsRow}>
                {emotions.map((emotion) => (
                  <TouchableOpacity key={emotion.id} style={styles.emotionButton}>
                    <Text style={styles.emojiText}>{emotion.emoji}</Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('MoodControl')}>
                  <Ionicons name="add-circle" size={40} color="#6a1b9a" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.tapToRecord}>
                <Text style={styles.tapToRecordText}>Tap to record</Text>
              </TouchableOpacity>
            </View>

            {/* Diary */}
            <TouchableOpacity onPress={() => navigation.navigate('DigitalDiary')}>
              <LinearGradient colors={['#fbc2eb', '#a6c1ee']} style={styles.diaryContainer}>
                <Text style={styles.sectionTitle}>Diary</Text>
                <Text style={styles.diaryText}>
                  Your emotions matter. Log your thoughts today for a personalized resource to support your mental well-being.
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </LinearGradient>
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  wrapper: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 40,
    shadowColor: '#800080',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
    width: '100%',
    borderWidth: 2,
    borderColor: '#6a1b9a',
    marginTop: 10,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImageContainer: {
    marginBottom: 5,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 80,
    borderColor: '#9966CC',
    borderWidth: 3,
  },
  nameContainer: {
    alignItems: 'center',
    position: 'relative',
    width: '100%',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#720e9e',
    textAlign: 'center',
    marginBottom: 9,
  },
  nameInput: {
    fontSize: 22,
    borderBottomWidth: 1,
    borderBottomColor: '#6a1b9a',
    color: '#6a1b9a',
    textAlign: 'center',
    marginBottom: 10,
  },
  editIcon: {
    position: 'absolute',
    right: 30,
    bottom: 13,
  },
  iconsContainer: {
    position: 'absolute',
    left: -20,
    top: -25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 6,
  },
  appointmentsContainer: {
    padding: 20,
    borderRadius: 10,
    marginBottom:30,
    width: '90%',
    backgroundColor: '#ffffff',
  },
  appointmentCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -11,
  },
  appointmentCard: {
    backgroundColor: '#fff',
    padding: 7,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 10,
    shadowRadius: 15,
    elevation: 10,
    width: 95,
    alignItems: 'center',
  },
  appointmentDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#647DEE',
  },
  appointmentDetails: {
    fontSize: 14,
    color: '#647DEE',
    marginTop: 5,
    textAlign: 'center',
  },
  emotionsSection: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1.41,
    elevation: 2,
    width: '120%', // Set width to create a rectangle
    height: 80,  // Set a fixed height for the rectangle
    marginBottom: 20, // Add margin to create space below
},

emotionsRow: {
  flexDirection: 'row',
  justifyContent: 'flex-start', // Adjust alignment to left-center
  alignItems: 'center',
  flexWrap: 'nowrap', // Ensure all elements are on the same line
  marginLeft: 190, // Align under the other container
  marginTop: -40,  // Move the row upwards
},

  emotionButton: {
     marginRight: -19,
  },
  emojiText: {
    fontSize: 30,
  },
  addButton: {
    backgroundColor: 'white',
    padding: 6,
    borderRadius: 20,
    marginLeft: -6,
  },
  plusText: {
    fontSize: 15,
    color: '#fff',
  },
  tapToRecord: {
    marginTop: -30,
  },
  tapToRecordText: {
    fontSize: 14,
    color: '#666',
  },
  diaryContainer: {
    padding: 20,
    borderRadius: 15,
    width: '100%',
    backgroundColor: '#fff',
    marginBottom: -10,
  },
  diaryText: {
    fontSize: 16,
    color: '#6a1b9a',
    marginTop: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
  },
  sectionFeel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 30,
  },
});

export default MainScreen;
