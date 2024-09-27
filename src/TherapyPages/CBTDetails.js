// Topic1.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const Topic1 = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cognitive Behavioral Therapy (CBT)</Text>
        {/* Placeholder for Image */}
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imageText}>Image Here</Text>
        </View>
      </View>

      {/* Introduction */}
      <Text style={styles.sectionTitle}>What is CBT?</Text>
      <Text style={styles.paragraph}>
        Cognitive Behavioral Therapy (CBT) is a widely recognized form of psychological treatment that focuses on identifying and restructuring negative thought patterns and behaviors. By understanding the relationship between our thoughts, feelings, and actions, CBT empowers individuals to create positive changes in their lives.
      </Text>

      {/* Core Principles of CBT */}
      <Text style={styles.sectionTitle}>Core Principles</Text>
      <Text style={styles.paragraph}>
        CBT is based on several core principles, including:
      </Text>
      <Text style={styles.listItem}>
        1. Psychological problems are often based on faulty or unhelpful ways of thinking.
      </Text>
      <Text style={styles.listItem}>
        2. Psychological problems are often based on learned patterns of unhelpful behavior.
      </Text>
      <Text style={styles.listItem}>
        3. People suffering from psychological problems can learn better ways of coping, leading to relief of their symptoms and improved well-being.
      </Text>

      {/* The CBT Process */}
      <Text style={styles.sectionTitle}>The CBT Process</Text>
      <Text style={styles.paragraph}>
        CBT typically involves working with a therapist to identify problematic thoughts and behaviors. During therapy, individuals learn specific techniques to challenge and replace negative thoughts with more realistic and positive alternatives. This often includes:
      </Text>
      <Text style={styles.listItem}>• Identifying automatic negative thoughts.</Text>
      <Text style={styles.listItem}>• Reframing negative thoughts into positive, productive thoughts.</Text>
      <Text style={styles.listItem}>• Developing problem-solving skills.</Text>
      <Text style={styles.listItem}>• Practicing relaxation and stress reduction techniques.</Text>

      {/* Effectiveness of CBT */}
      <Text style={styles.sectionTitle}>Effectiveness of CBT</Text>
      <Text style={styles.paragraph}>
        Numerous studies have shown CBT to be an effective treatment for a range of mental health conditions, including anxiety, depression, panic disorders, and more. One of the key advantages of CBT is its focus on teaching practical skills that can be used long after therapy has ended.
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

export default Topic1;
