// Topic8.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const Topic8 = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Gestalt Therapy</Text>
        {/* Placeholder for Image */}
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imageText}>Image Here</Text>
        </View>
      </View>

      {/* Introduction */}
      <Text style={styles.sectionTitle}>What is Gestalt Therapy?</Text>
      <Text style={styles.paragraph}>
        Gestalt Therapy is a client-centered approach that emphasizes personal responsibility and focuses on the present moment. It helps individuals gain awareness of their thoughts, feelings, and actions in the here and now, rather than focusing on past experiences. By enhancing self-awareness, Gestalt Therapy encourages individuals to take ownership of their lives and make more conscious choices.
      </Text>

      {/* Key Concepts of Gestalt Therapy */}
      <Text style={styles.sectionTitle}>Key Concepts of Gestalt Therapy</Text>
      <Text style={styles.paragraph}>
        Gestalt Therapy operates on several core principles that shape its approach:
      </Text>
      <Text style={styles.listItem}>1. The Here and Now: Emphasizing the present moment and what is happening right now.</Text>
      <Text style={styles.listItem}>2. Awareness: Encouraging clients to become more aware of their thoughts, emotions, and bodily sensations.</Text>
      <Text style={styles.listItem}>3. Contact: Fostering genuine connections with others and the environment.</Text>
      <Text style={styles.listItem}>4. The Empty Chair Technique: A therapeutic exercise where clients engage in a dialogue with parts of themselves or with significant others.</Text>

      {/* The Gestalt Therapy Process */}
      <Text style={styles.sectionTitle}>The Gestalt Therapy Process</Text>
      <Text style={styles.paragraph}>
        In Gestalt Therapy, the therapist helps clients become aware of their thoughts and feelings in the present moment. Techniques like role-playing, the "empty chair," and body awareness exercises are used to bring unresolved issues to the surface. The goal is to help clients achieve insight and clarity, enabling them to resolve unfinished business and move forward with their lives.
      </Text>

      {/* Effectiveness of Gestalt Therapy */}
      <Text style={styles.sectionTitle}>Effectiveness of Gestalt Therapy</Text>
      <Text style={styles.paragraph}>
        Gestalt Therapy is effective for individuals struggling with issues like anxiety, depression, and relationship problems. It empowers people to take control of their emotions, improve their self-awareness, and engage more fully in their lives and relationships.
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

export default Topic8;
