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
        <Stack.Screen name="SplashScreen1" component={SplashScreen1} options={{ headerShown: false }} />
        <Stack.Screen name="SplashScreen2" component={SplashScreen2} options={{ headerShown: false }} />
        <Stack.Screen name="SplashScreen3" component={SplashScreen3} options={{ headerShown: false }} />
        <Stack.Screen name="Homepage" component={Homepage} options={{ headerShown: false }} />

      

      </Stack.Navigator>
    </NavigationContainer>
  );
}
