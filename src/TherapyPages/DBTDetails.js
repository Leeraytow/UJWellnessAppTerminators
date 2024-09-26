// Topic2.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const Topic2 = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dialectical Behavior Therapy (DBT)</Text>
        {/* Placeholder for Image */}
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imageText}>Image Here</Text>
        </View>
      </View>

      {/* Introduction */}
      <Text style={styles.sectionTitle}>What is DBT?</Text>
      <Text style={styles.paragraph}>
        Dialectical Behavior Therapy (DBT) is a type of cognitive-behavioral therapy designed to help people manage intense emotions and develop skills to improve their emotional and mental well-being. Originally developed to treat borderline personality disorder (BPD), it is now used to address a variety of mental health conditions, including anxiety, depression, and PTSD.
      </Text>

      {/* Core Components of DBT */}
      <Text style={styles.sectionTitle}>Core Components of DBT</Text>
      <Text style={styles.paragraph}>
        DBT is structured around four core components, often referred to as "modules":
      </Text>
      <Text style={styles.listItem}>1. Mindfulness: Being present and fully engaged in the current moment.</Text>
      <Text style={styles.listItem}>2. Distress Tolerance: Developing skills to tolerate pain and stressful situations.</Text>
      <Text style={styles.listItem}>3. Emotional Regulation: Learning to identify and manage emotions effectively.</Text>
      <Text style={styles.listItem}>4. Interpersonal Effectiveness: Building healthy relationships and improving communication.</Text>

      {/* The DBT Process */}
      <Text style={styles.sectionTitle}>The DBT Process</Text>
      <Text style={styles.paragraph}>
        DBT combines individual therapy with group skills training. Clients work with a therapist to address specific challenges while learning practical skills in a supportive group setting. DBT emphasizes balancing acceptance and change, helping individuals recognize their current emotional state while also working towards meaningful changes in behavior.
      </Text>

      {/* Effectiveness of DBT */}
      <Text style={styles.sectionTitle}>Effectiveness of DBT</Text>
      <Text style={styles.paragraph}>
        DBT has been proven effective in treating individuals with intense emotional reactions and self-destructive behaviors. It is especially useful for those who have difficulty regulating their emotions and managing interpersonal relationships. The therapy teaches life-long coping strategies to manage emotional difficulties.
      </Text>

      {/* Placeholder for another image */}
      <View style={styles.imagePlaceholder}>
        <Text style={styles.imageText}>Image Here</Text>
      </View>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f2e8ff', // Light purple background
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5d3fd3', // Deep purple color for the title
    textAlign: 'center',
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#e0d4f7',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  imageText: {
    color: '#5d3fd3', // Same purple for consistency
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#5d3fd3',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 15,
  },
  listItem: {
    fontSize: 16,
    color: '#5d3fd3',
    marginVertical: 5,
    paddingLeft: 10,
  },
});

export default Topic2;
