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
import Homepage from './src/Menu/Homepage';
import PasswordResetScreen from './src/Logins/PasswordResetScreen';
import EmailVerification from './src/Logins/EmailVerificationScreen';
import RegEmailVerification from './src/Logins/RegEmailVerificationScreen';
import TherapyType from './src/Therapy/Therapytype';
import DigitalDiary from './src/Therapy/DiaryEntry';
import GroupChatApp from './src/Chat/GroupChat';
import AccessibilitySettings from './src/Profiles/AccessibilitySettings';
import CustomizableSettings from './src/Profiles/CustomizableSettings';
import Emergency from './src/Profiles/EmergencyContacts';
import Feedback from './src/Profiles/FeedbackandSupport';
import MyProfile from './src/Profiles/MyProfile';
import Profile from './src/Profiles/Profile';
import SecurityInfo from './src/Profiles/SecurityInformation';
import SignOut from './src/Profiles/SignOut';


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
        <Stack.Screen name="Homepage" component={Homepage} options={{ headerShown: false }} />
        <Stack.Screen name="RegEmailVerification" component={RegEmailVerification} options={{ headerShown: false }} />
        <Stack.Screen name="TherapyType" component={TherapyType} options={{ headerShown: false }} />
        <Stack.Screen name="DigitalDiary" component={DigitalDiary} options={{ headerShown: false }} />
        <Stack.Screen name="GroupChatApp" component={GroupChatApp} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name ="My Profile" component = {MyProfile}/>
        <Stack.Screen name="Accessibility Settings" component={AccessibilitySettings} />
        <Stack.Screen name="Customizable Settings" component={CustomizableSettings} />
        <Stack.Screen name="Emergency Contacts" component={Emergency} />
        <Stack.Screen name="Feedback And Support" component={Feedback} />
        <Stack.Screen name="Security" component={SecurityInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
