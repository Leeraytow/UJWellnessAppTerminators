// Topic6.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const Topic6 = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Narrative Therapy</Text>
        {/* Placeholder for Image */}
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imageText}>Image Here</Text>
        </View>
      </View>

      {/* Introduction */}
      <Text style={styles.sectionTitle}>What is Narrative Therapy?</Text>
      <Text style={styles.paragraph}>
        Narrative Therapy is a therapeutic approach that centers on the stories people tell about their lives. It views individuals as separate from their problems and helps them re-author their life stories by focusing on strengths, skills, and values that may be overlooked. Narrative Therapy empowers individuals to reshape their narratives and see themselves as capable of change.
      </Text>

      {/* Key Concepts of Narrative Therapy */}
      <Text style={styles.sectionTitle}>Key Concepts of Narrative Therapy</Text>
      <Text style={styles.paragraph}>
        Narrative Therapy involves several key concepts that guide the therapeutic process:
      </Text>
      <Text style={styles.listItem}>1. Externalization: Separating the person from their problem, allowing them to address issues more objectively.</Text>
      <Text style={styles.listItem}>2. Re-Authoring: Helping individuals reframe their stories to highlight strengths and resilience.</Text>
      <Text style={styles.listItem}>3. Identifying Unique Outcomes: Exploring moments where the problem did not dominate, focusing on times of strength and success.</Text>
      <Text style={styles.listItem}>4. Thickening the Narrative: Adding depth to positive stories by examining values, goals, and successes in more detail.</Text>

      {/* The Process of Narrative Therapy */}
      <Text style={styles.sectionTitle}>The Narrative Therapy Process</Text>
      <Text style={styles.paragraph}>
        In Narrative Therapy, the therapist helps clients explore their personal narratives and identify how these stories shape their experiences. Through the process of questioning and reflection, clients are encouraged to deconstruct negative narratives and create new, empowering stories that align with their values and strengths.
      </Text>

      {/* Effectiveness of Narrative Therapy */}
      <Text style={styles.sectionTitle}>Effectiveness of Narrative Therapy</Text>
      <Text style={styles.paragraph}>
        Narrative Therapy is effective in treating a range of issues, including depression, anxiety, and trauma. It helps individuals break free from limiting stories and fosters a sense of agency, allowing them to live in accordance with their values and goals.
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

export default Topic6;
