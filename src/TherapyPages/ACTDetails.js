// Topic4.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const Topic4 = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Acceptance and Commitment Therapy (ACT)</Text>
        {/* Placeholder for Image */}
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imageText}>Image Here</Text>
        </View>
      </View>

      {/* Introduction */}
      <Text style={styles.sectionTitle}>What is ACT?</Text>
      <Text style={styles.paragraph}>
        Acceptance and Commitment Therapy (ACT) is a type of psychotherapy that encourages individuals to accept their thoughts and feelings rather than trying to fight or control them. The goal of ACT is to help individuals live a meaningful life by aligning actions with personal values, despite the challenges that may arise.
      </Text>

      {/* Core Principles of ACT */}
      <Text style={styles.sectionTitle}>Core Principles of ACT</Text>
      <Text style={styles.paragraph}>
        ACT is built around six core principles designed to cultivate psychological flexibility:
      </Text>
      <Text style={styles.listItem}>1. Cognitive Defusion: Learning to observe thoughts without getting entangled in them.</Text>
      <Text style={styles.listItem}>2. Acceptance: Allowing thoughts and feelings to come and go without trying to change or suppress them.</Text>
      <Text style={styles.listItem}>3. Contact with the Present Moment: Being fully aware of the here and now, with openness and curiosity.</Text>
      <Text style={styles.listItem}>4. The Observing Self: Distinguishing between thoughts and the part of the mind that observes them.</Text>
      <Text style={styles.listItem}>5. Values: Identifying what is truly important and meaningful in life.</Text>
      <Text style={styles.listItem}>6. Committed Action: Taking concrete steps towards living in alignment with those values.</Text>

      {/* The ACT Process */}
      <Text style={styles.sectionTitle}>The ACT Process</Text>
      <Text style={styles.paragraph}>
        ACT is not about eliminating difficult feelings but rather learning to coexist with them while taking positive action. The therapy helps individuals break free from the control of their thoughts and emotions and empowers them to take meaningful steps toward their goals.
      </Text>

      {/* Effectiveness of ACT */}
      <Text style={styles.sectionTitle}>Effectiveness of ACT</Text>
      <Text style={styles.paragraph}>
        Research has shown that ACT is effective for a wide range of mental health conditions, including anxiety, depression, and stress. By focusing on values-based action, ACT encourages individuals to lead a life that is fulfilling and purposeful, even in the presence of challenges.
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

export default Topic4;
