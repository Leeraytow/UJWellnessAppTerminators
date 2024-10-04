import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import CommentsScreen from './CommentScreen';

const Stack = createStackNavigator();

export default function Mainpost() {
  return (
  
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen}  options={{ headerShown: false }}/>
        <Stack.Screen name="Comments" component={CommentsScreen}  options={{ headerShown: false }}/>
      </Stack.Navigator>
    
  );
}