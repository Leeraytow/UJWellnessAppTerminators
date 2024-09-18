import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../Components/Dashboard';
import Patient from '../Components/Patient';

const Stack = createStackNavigator();

const ClientsPage = () => {
  return (
   
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
        <Stack.Screen name="Patient" component={Patient} options={{ headerShown: false }} />
      </Stack.Navigator>
   
  );
};

export default ClientsPage;
