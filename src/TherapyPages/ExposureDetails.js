// Topic5.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const Topic5 = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Exposure Therapy</Text>
        {/* Placeholder for Image */}
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imageText}>Image Here</Text>
        </View>
      </View>

      {/* Introduction */}
      <Text style={styles.sectionTitle}>What is Exposure Therapy?</Text>
      <Text style={styles.paragraph}>
        Exposure Therapy is a psychological treatment designed to help individuals confront their fears. By gradually and repeatedly exposing individuals to the source of their anxiety in a safe and controlled environment, the therapy aims to reduce the intensity of their emotional reactions over time. It is often used to treat phobias, anxiety disorders, and PTSD.
      </Text>

      {/* Types of Exposure Therapy */}
      <Text style={styles.sectionTitle}>Types of Exposure Therapy</Text>
      <Text style={styles.paragraph}>
        There are several forms of exposure therapy, each tailored to the specific needs of the individual:
      </Text>
      <Text style={styles.listItem}>1. In Vivo Exposure: Directly facing the feared object or situation in real life.</Text>
      <Text style={styles.listItem}>2. Imaginal Exposure: Confronting the feared object or situation through imagination.</Text>
      <Text style={styles.listItem}>3. Virtual Reality Exposure: Using VR technology to simulate the feared situation.</Text>
      <Text style={styles.listItem}>4. Interoceptive Exposure: Facing physical sensations that are feared in panic disorders, such as increased heart rate.</Text>

      {/* The Exposure Therapy Process */}
      <Text style={styles.sectionTitle}>The Exposure Therapy Process</Text>
      <Text style={styles.paragraph}>
        Exposure Therapy involves creating a fear hierarchy, where the individual and therapist work together to rank feared situations from least to most anxiety-provoking. The individual is then gradually exposed to these situations, starting with the least distressing, and working up the hierarchy. Over time, as repeated exposure occurs, the individual learns that the feared situation is not as dangerous as they had imagined, and their anxiety decreases.
      </Text>

      {/* Effectiveness of Exposure Therapy */}
      <Text style={styles.sectionTitle}>Effectiveness of Exposure Therapy</Text>
      <Text style={styles.paragraph}>
        Research shows that Exposure Therapy is highly effective in treating anxiety disorders, phobias, OCD, and PTSD. It helps individuals regain control over their fears and reduces avoidance behaviors, allowing them to lead a fuller and more active life.
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

export default Topic5;
