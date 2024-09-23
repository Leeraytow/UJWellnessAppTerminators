import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './src/Configuration/firebase'; // Adjust this path to where your Firebase config is located
import { ActivityIndicator, View } from 'react-native';
import { ThemeProvider } from './src/StudentProfile/ThemeContext'; 
import { FontSizeProvider } from './src/StudentProfile/FontSizeContext'; 
import WelcomeScreen from './src/Logins/WelcomeScreen';
import StudentLoginScreen from './src/Logins/StudentLoginScreen';
import StudentRegister from './src/Logins/StudentRegisterScreen';
import TherapistScreen from './src/Logins/TherapistLoginScreen'; 
import TherapistRegisterScreen from './src/Logins/TherapistRegisterScreen';
import TherapistLandingScreen from './src/TherapyPages/TherapistLandingScreen';
import ResourcesScreen from './src/TherapyPages/Resource';
import RegisterScreen from './src/TherapyPages/RegisterScreen';
import TherapyProfileScreen from './src/TherapyPages/TherapyProfileScreen';
import AppointmentsScreen from './src/TherapyPages/AppointmentsScreen';
import ChatTherapist from './src/TherapyPages/ChatTherapist';
import UpcomingAppointmentScreen from './src/TherapyPages/UpcomingAppointmentScreen';
import SplashScreen1 from './src/SplashPages/splash1';
import SplashScreen2 from './src/SplashPages/Splash2';
import SplashScreen3 from './src/SplashPages/Splash3';
import PasswordResetScreen from './src/Logins/PasswordResetScreen';
import EmailVerification from './src/Logins/EmailVerificationScreen';
import RegEmailVerification from './src/Logins/RegEmailVerificationScreen';
import DigitalDiary from './src/Therapy/DiaryEntry';
import BookingCompleted from './src/Therapy/BookingCompleted';
import PeerCounselingPage from './src/Therapy/PeerCounseling';
import ContactSupportScreen from './src/Therapy/ContactSupport'; 
import ProfessionalSupport from './src/Therapy/ProffesionalSupport';
import MessageScreen from './src/Therapy/Message';
import MainPage from './src/Menu/MainPage';
import AppointmentStudent from './src/Menu/AppointmentStudent';
import Notifications from './src/Menu/Notifications'; 
import Messages from './src/Menu/Messages'; 
import MoodControl from './src/Menu/MoodControl';
import TherapyButton from './src/Menu/TherapyButton';
// import GroupChatApp from './src/ChatApp/GroupChat';
import Profile from './src/StudentProfile/Profile';
import AccessibilitySettings from './src/StudentProfile/AccessibilitySetting';
import MyProfile from './src/StudentProfile/MyProfile';
import CustomizableSettings from './src/StudentProfile/CustomizableSettings';
import Feedback from './src/StudentProfile/FeedbackandSupport';
import Emergency from './src/StudentProfile/EmergencyContact';
import SecurityInfo from './src/StudentProfile/SecurityInformation';
import HelpLine from './src/HelpLine/Help';
import MedicalHelp from './src/MedicalHelp/MedicalHelp';
import UserVid from './src/Videos/UserVideos';
import Chat from './src/ChatApp/Chat';
import UserList from './src/ChatApp/userList';
import Users from './src/Admin/Users';
import UserFeedback from './src/Admin/UserFeedback';
import AdminHomeScreen from './src/Admin/AdminHomeScreen';
import UserHistory from './src/Admin/UserHistory';
import UserProfile from './src/ChatApp/userProfile';
import AdminSettings from './src/Admin/AdminSettings';
import BookingForm from "./src/BookingSystem/BookingForm";
import VerifyBookings from "./src/BookingSystem/VerifyBookings";
import ConfirmMeeting from "./src/BookingSystem/ConfirmMeeting";
import ScheduledAppointments from "./src/BookingSystem/ScheduledAppointments";
import TherapistAppointments from './src/BookingSystem/TherapistAppointments';
import ClientsPage from './src/ClientsPage/ClientsPage';
import Mainpost from './src/CommunitySupport/postmain';

const Stack = createStackNavigator();

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [initialRoute, setInitialRoute] = useState("StudentLogin");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        // Check email domain to set initial route
        if (user.email.endsWith('@gmail.com')) {
          setInitialRoute('TherapistLandingScreen');
        } else {
          setInitialRoute('MainPage');
        }
      } else {
        setInitialRoute('StudentLogin');
      }
      if (initializing) setInitializing(false);
    });

    // Clean up the subscription
    return () => unsubscribe();
  }, [initializing]);

  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ThemeProvider>
      <FontSizeProvider>
        <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute}>
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="StudentLogin" component={StudentLoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="StudentRegister" component={StudentRegister} options={{ headerShown: false }} />
            <Stack.Screen name="TherapistScreen" component={TherapistScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TherapistRegisterScreen" component={TherapistRegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TherapistLandingScreen" component={TherapistLandingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Resources" component={ResourcesScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="PasswordResetScreen" component={PasswordResetScreen} options={{ headerShown: false }} />
            <Stack.Screen name="EmailVerification" component={EmailVerification} options={{ headerShown: false }} />
            <Stack.Screen name="SplashScreen1" component={SplashScreen1} options={{ headerShown: false }} />
            <Stack.Screen name="SplashScreen2" component={SplashScreen2} options={{ headerShown: false }} />
            <Stack.Screen name="SplashScreen3" component={SplashScreen3} options={{ headerShown: false }} />
            <Stack.Screen name="MainPage" component={MainPage}   options={{ headerShown: false }} />
            <Stack.Screen name="AppointmentStudent" component={AppointmentStudent}   options={{ headerShown: false }} />
            <Stack.Screen name="Notifications" component={Notifications}   options={{ headerShown: false }} />
            <Stack.Screen name="Messages" component={Messages} options={{ headerShown: false }} />
            <Stack.Screen name="RegEmailVerification" component={RegEmailVerification} options={{ headerShown: false }} />
            <Stack.Screen name="BookingCompleted" component={BookingCompleted} options={{ headerShown: false }} />
            <Stack.Screen name="PeerCounseling" component={PeerCounselingPage} options={{ headerShown: false }} />
            <Stack.Screen name="DigitalDiary" component={DigitalDiary} options={{ headerShown: false }} />
            <Stack.Screen name="Message" component={MessageScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ContactSupport" component={ContactSupportScreen} options={{ headerShown: false }} />
            <Stack.Screen name="MoodControl" component={MoodControl} options={{ headerShown: false }} />
            <Stack.Screen name="TherapyButton" component={TherapyButton} options={{ headerShown: false }} />
            <Stack.Screen name="ProfessionalSupport" component={ProfessionalSupport} options={{ headerShown: false }} />
            {/* <Stack.Screen name="GroupChatApp" component={GroupChatApp} options={{ headerShown: false }} /> */}
            <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
            <Stack.Screen name="MyProfile" component={MyProfile} options={{ headerShown: false }} />
            <Stack.Screen name="AccessibilitySettings" component={AccessibilitySettings} options={{ headerShown: false }} />
            <Stack.Screen name="CustomizableSettings" component={CustomizableSettings} options={{ headerShown: false }} />
            <Stack.Screen name="Feedback" component={Feedback} options={{ headerShown: false }} />
            <Stack.Screen name="Emergency" component={Emergency} options={{ headerShown: false }} />
            <Stack.Screen name="SecurityInfo" component={SecurityInfo} options={{ headerShown: false }} />
            <Stack.Screen name="HelpLine" component={HelpLine} options={{ headerShown: false }} />
            <Stack.Screen name="MedicalHelp" component={MedicalHelp} options={{ headerShown: false }} />
            <Stack.Screen name="UserVid" component={UserVid} options={{ headerShown: false }} />
            <Stack.Screen name="Chat" component={Chat} />
            <Stack.Screen name="userList" component={UserList} options={{ headerShown: false }} />
            <Stack.Screen name="AdminHomeScreen" component={AdminHomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Users" component={Users} options={{ headerShown: false }} />
            <Stack.Screen name="UserFeedback" component={UserFeedback} options={{ headerShown: false }} />
            <Stack.Screen name="UserHistory" component={UserHistory} options={{ headerShown: false }} />
            <Stack.Screen name="UserProfile" component={UserProfile} options={{ headerShown: false }} />
            <Stack.Screen name="AdminSettings" component={AdminSettings} options={{ headerShown: false }} />
            <Stack.Screen name="TherapyProfile" component={TherapyProfileScreen} />
            <Stack.Screen name="Appointments" component={AppointmentsScreen} />
            <Stack.Screen name="ChatTherapist" component={ChatTherapist} />
            <Stack.Screen name="UpcomingAppointment" component={UpcomingAppointmentScreen} />
            <Stack.Screen name="BookingForm" component={BookingForm} options={{ headerShown: false }} />
            <Stack.Screen name="VerifyBookings" component={VerifyBookings} options={{ headerShown: false }} />
            <Stack.Screen name="ConfirmMeeting" component={ConfirmMeeting} options={{ headerShown: false }} />
            <Stack.Screen name="ScheduledAppointments" component={ScheduledAppointments} options={{ headerShown: false }} />
            <Stack.Screen name="TherapistAppointments" component={TherapistAppointments} options={{ headerShown: false }} />
            <Stack.Screen name="ClientsPage" component={ClientsPage} options={{ headerShown: false }} />
            <Stack.Screen name="MainPost" component={Mainpost} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </FontSizeProvider>
    </ThemeProvider>
  );
}