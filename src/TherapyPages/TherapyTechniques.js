import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const TherapyTechniques = ({ navigation }) => {
  const techniques = [
    { title: 'Cognitive Behavioral Therapy (CBT)', description: 'Changing negative thought patterns.', icon: 'analytics', route: 'CBTDetails' },
    { title: 'Dialectical Behavior Therapy (DBT)', description: 'Combines CBT with mindfulness.', icon: 'heart', route: 'DBTDetails' },
    { title: 'Mindfulness-Based Stress Reduction (MBSR)', description: 'Reduces stress through mindfulness.', icon: 'sunny', route: 'MBSRDetails' },
    { title: 'Acceptance and Commitment Therapy (ACT)', description: 'Encourages acceptance of thoughts.', icon: 'checkmark-done', route: 'ACTDetails' },
    { title: 'Exposure Therapy', description: 'Confronts fears through gradual exposure.', icon: 'happy', route: 'ExposureDetails' },
    { title: 'Narrative Therapy', description: 'Encourages storytelling to reframe experiences.', icon: 'book', route: 'NarrativeDetails' },
    { title: 'Somatic Experiencing', description: 'Body-centered approach to trauma relief.', icon: 'body', route: 'SomaticDetails' },
    { title: 'Gestalt Therapy', description: 'Focuses on present moment awareness.', icon: 'hourglass', route: 'GestaltDetails' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {techniques.map((technique, index) => (
          <View key={index} style={styles.techniqueCard}>
            <View style={styles.iconContainer}>
              <Icon name={technique.icon} size={30} color="#4b0082" />
            </View>
            <Text style={styles.techniqueTitle}>{technique.title}</Text>
            <Text style={styles.techniqueDescription}>{technique.description}</Text>
            <TouchableOpacity 
              style={styles.learnMoreButton} 
              onPress={() => navigation.navigate(technique.route)}>
              <Text style={styles.learnMoreText}>Learn More</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f2e8ff',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
    paddingHorizontal: 15,
  },
  techniqueCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    flexDirection: 'column',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: '#E0B0FF',
    borderRadius: 50,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  techniqueTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4b0082',
    marginBottom: 5,
    textAlign: 'center',
  },
  techniqueDescription: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  learnMoreButton: {
    backgroundColor: '#6a0dad',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  learnMoreText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TherapyTechniques;
