// Topic7.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const Topic7 = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Somatic Experiencing</Text>
        {/* Placeholder for Image */}
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imageText}>Image Here</Text>
        </View>
      </View>

      {/* Introduction */}
      <Text style={styles.sectionTitle}>What is Somatic Experiencing?</Text>
      <Text style={styles.paragraph}>
        Somatic Experiencing (SE) is a therapeutic approach focused on resolving trauma and stress through body awareness. It is based on the idea that trauma is stored in the body and can be released by gently guiding individuals to become more aware of their physical sensations, helping them discharge pent-up energy and restore balance to their nervous system.
      </Text>

      {/* Key Concepts of Somatic Experiencing */}
      <Text style={styles.sectionTitle}>Key Concepts of Somatic Experiencing</Text>
      <Text style={styles.paragraph}>
        Somatic Experiencing is grounded in understanding how trauma affects the nervous system and focuses on resolving trauma through physical sensations rather than re-experiencing the trauma itself:
      </Text>
      <Text style={styles.listItem}>1. Pendulation: The process of moving between states of tension and relaxation to gradually release stored energy.</Text>
      <Text style={styles.listItem}>2. Titration: Breaking down the release of traumatic energy into small, manageable steps to avoid overwhelming the individual.</Text>
      <Text style={styles.listItem}>3. Resourcing: Identifying positive memories, sensations, or external sources of support to help the individual feel safe.</Text>
      <Text style={styles.listItem}>4. SIBAM: The acronym for Sensation, Image, Behavior, Affect, and Meaning, guiding the process of trauma resolution.</Text>

      {/* The Somatic Experiencing Process */}
      <Text style={styles.sectionTitle}>The Somatic Experiencing Process</Text>
      <Text style={styles.paragraph}>
        Somatic Experiencing helps individuals reconnect with their bodies by focusing on physical sensations. This process allows the nervous system to release trapped energy in a gradual and controlled manner, helping the individual feel safe and empowered as they work through trauma.
      </Text>

      {/* Effectiveness of Somatic Experiencing */}
      <Text style={styles.sectionTitle}>Effectiveness of Somatic Experiencing</Text>
      <Text style={styles.paragraph}>
        Somatic Experiencing has been shown to be effective in treating trauma-related conditions such as PTSD, anxiety, and chronic stress. By focusing on the body's natural ability to heal, it helps individuals resolve the physical and emotional effects of trauma and restore a sense of calm and well-being.
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

export default Topic7;
