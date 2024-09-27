// Topic3.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const Topic3 = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mindfulness-Based Stress Reduction (MBSR)</Text>
        {/* Placeholder for Image */}
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imageText}>Image Here</Text>
        </View>
      </View>

      {/* Introduction */}
      <Text style={styles.sectionTitle}>What is MBSR?</Text>
      <Text style={styles.paragraph}>
        Mindfulness-Based Stress Reduction (MBSR) is an evidence-based program designed to help individuals manage stress, anxiety, and pain. Developed by Jon Kabat-Zinn in 1979, MBSR combines mindfulness meditation with yoga and body awareness practices to promote mental clarity and emotional balance.
      </Text>

      {/* Key Elements of MBSR */}
      <Text style={styles.sectionTitle}>Key Elements of MBSR</Text>
      <Text style={styles.paragraph}>
        MBSR integrates several key components aimed at helping individuals become more aware of their thoughts, feelings, and physical sensations, without judgment:
      </Text>
      <Text style={styles.listItem}>1. Mindfulness Meditation: Practicing present-moment awareness through focused breathing and attention.</Text>
      <Text style={styles.listItem}>2. Body Scan: Bringing attention to different parts of the body to release tension and increase relaxation.</Text>
      <Text style={styles.listItem}>3. Gentle Yoga: Engaging in mindful movement to enhance body awareness.</Text>
      <Text style={styles.listItem}>4. Stress Reduction: Applying mindfulness techniques to reduce stress and increase resilience in daily life.</Text>

      {/* Benefits of MBSR */}
      <Text style={styles.sectionTitle}>Benefits of MBSR</Text>
      <Text style={styles.paragraph}>
        MBSR has been shown to improve both physical and mental health by reducing symptoms of stress, anxiety, and chronic pain. Regular practice can lead to greater emotional resilience, improved focus, and enhanced well-being.
      </Text>

      {/* The MBSR Process */}
      <Text style={styles.sectionTitle}>The MBSR Process</Text>
      <Text style={styles.paragraph}>
        MBSR is typically taught in an 8-week course, during which participants learn mindfulness techniques and engage in group discussions. The program encourages the daily practice of mindfulness, which can be applied to both simple and challenging life situations.
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

export default Topic3;
