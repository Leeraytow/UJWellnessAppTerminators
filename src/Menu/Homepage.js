import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function Homepage({navigation}) {
  const route = useRoute();
  const { userName, userEmail } = route.params;

  const handlePress = () => {
    navigation.navigate('Test', { userName, userEmail });
  };


  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>We welcome you, {userName}</Text>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  welcomeText: {
    fontSize: 15,
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
});
