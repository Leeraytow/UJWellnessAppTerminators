import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './src/WelcomeScreen';
import StudentLoginScreen from './src/StudentLoginScreen';
import StudentRegister from './src/StudentRegisterScreen';
import TherapistScreen from './src/TherapistScreen'; 
import TherapistRegisterScreen from './src/TherapistRegisterScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="StudentLogin" component={StudentLoginScreen} options={{ headerShown: false }} />
         <Stack.Screen name="StudentRegister" component={StudentRegister} options={{ headerShown: false }} />
           <Stack.Screen name="TherapistScreen" component={TherapistScreen} options={{ headerShown: false }} />
             <Stack.Screen name="TherapistRegisterScreen" component={TherapistRegisterScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
