import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './src/Logins/WelcomeScreen';
import StudentLoginScreen from './src/Logins/StudentLoginScreen';
import StudentRegister from './src/Logins/StudentRegisterScreen';
import TherapistScreen from './src/Logins/TherapistLoginScreen'; 
import TherapistRegisterScreen from './src/Logins/TherapistRegisterScreen';
import SplashScreen1 from './src/SplashPages/splash1';
import SplashScreen2 from './src/SplashPages/Splash2';
import SplashScreen3 from './src/SplashPages/Splash3';
import PasswordResetScreen from './src/Logins/PasswordResetScreen';
import EmailVerification from './src/Logins/EmailVerificationScreen';
import RegEmailVerification from './src/Logins/RegEmailVerificationScreen';
import DigitalDiary from './src/Therapy/DiaryEntry';
import OnlineTherapyPage from './src/Therapy/Onlinetherapy';
import PeerCounselingPage from './src/Therapy/PeerCounseling';
import MainPage from './src/Menu/MainPage';
import MoodControl from './src/Menu/MoodControl';
import TherapyButton from './src/Menu/TherapyButton';
import GroupChatApp from './src/ChatApp/GroupChat';
import Profile from './src/StudentProfile/Profile';
import AccessibilitySettings from './src/StudentProfile/AccessibilitySetting';
import MyProfile from './src/StudentProfile/MyProfile';
import CustomizableSettings from './src/StudentProfile/CustomizableSettings';
import Feedback from './src/StudentProfile/FeedbackandSupport';
import Emergency from './src/StudentProfile/EmergencyContact';
import SecurityInfo from './src/StudentProfile/SecurityInformation';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen1">
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="StudentLogin" component={StudentLoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="StudentRegister" component={StudentRegister} options={{ headerShown: false }} />
        <Stack.Screen name="TherapistScreen" component={TherapistScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TherapistRegisterScreen" component={TherapistRegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PasswordResetScreen" component={PasswordResetScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="EmailVerification" component={EmailVerification} options={{ headerShown: false }}/>
        <Stack.Screen name="SplashScreen1" component={SplashScreen1} options={{ headerShown: false }} />
        <Stack.Screen name="SplashScreen2" component={SplashScreen2} options={{ headerShown: false }} />
        <Stack.Screen name="SplashScreen3" component={SplashScreen3} options={{ headerShown: false }} />
        <Stack.Screen name="MainPage" component={MainPage} options={{ headerShown: false }} />
        <Stack.Screen name="RegEmailVerification" component={RegEmailVerification} options={{ headerShown: false }} />
        <Stack.Screen name="OnlineTherapy" component={OnlineTherapyPage} options={{ headerShown: false }} />
        <Stack.Screen name="PeerCounseling" component={PeerCounselingPage} options={{ headerShown: false }} />
        <Stack.Screen name="DigitalDiary" component={DigitalDiary} options={{ headerShown: false }} />
        <Stack.Screen name="MoodControl" component={MoodControl} options={{ headerShown: false }} />
        <Stack.Screen name="TherapyButton" component={TherapyButton} options={{ headerShown: false }} />
        <Stack.Screen name="GroupChatApp" component={GroupChatApp} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        <Stack.Screen name="MyProfile" component={MyProfile} options={{ headerShown: false }} />
        <Stack.Screen name="AccessibilitySettings" component={AccessibilitySettings} options={{ headerShown: false }} />
        <Stack.Screen name="CustomizableSettings" component={CustomizableSettings} options={{ headerShown: false }} />
        <Stack.Screen name="Feedback" component={Feedback} options={{ headerShown: false }} />
        <Stack.Screen name="Emergency" component={Emergency} options={{ headerShown: false }} />
        <Stack.Screen name="SecurityInfor" component={SecurityInfo} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
