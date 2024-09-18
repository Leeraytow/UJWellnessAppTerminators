import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BarChart } from 'react-native-chart-kit';
import moment from 'moment';

const Patient = () => {
  const [moodData, setMoodData] = useState({});
  const [diaries, setDiaries] = useState([]);
  const [expandedDiary, setExpandedDiary] = useState(null);
  const [feedback, setFeedback] = useState("");
  const currentDate = moment().format('MMMM D, YYYY');

  useEffect(() => {
    fetchMoodData();
    fetchDiaries();
  }, []);

  const fetchMoodData = () => {
    const fetchedMoodData = {
      '2023-05-01': 4, // Good mood
      '2023-05-02': 3, // Neutral mood
      '2023-05-03': 5, // Great mood
      '2023-05-04': 2, // Anxious mood
      '2023-05-05': 1, // Bad mood
    };
    setMoodData(fetchedMoodData);
  };

  const fetchDiaries = () => {
    const fetchedDiaries = [
      { id: 1, date: '2023-05-03', content: 'Had a great time with friends!', mood: 5 },
      { id: 2, date: '2023-05-02', content: 'I felt a bit anxious today.', mood: 2 },
      { id: 3, date: '2023-05-01', content: 'Today was a good day. I did great in my test.', mood: 4 },
    ];
    setDiaries(fetchedDiaries.sort((a, b) => new Date(b.date) - new Date(a.date)));
  };

  const handleExpandDiary = (diaryId) => {
    setExpandedDiary(expandedDiary === diaryId ? null : diaryId);
  };

  const handleSendFeedback = (diaryId) => {
    if (feedback) {
      console.log(`Sending feedback to diary ${diaryId}: ${feedback}`);
      setFeedback("");
    } else {
      console.log('Feedback is empty.');
    }
  };

  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    color: (opacity = 1) => `rgba(255, 140, 0, ${opacity})`,
    barPercentage: 0.6,
    fillShadowGradientOpacity: 0.9,
    fillShadowGradient: '#ff8c00',
    labelColor: (opacity = 1) => `rgba(51, 51, 51, ${opacity})`,
  };

  const chartData = {
    labels: Object.keys(moodData).map(date => moment(date).format('DD/MM')),
    datasets: [{ data: Object.values(moodData) }]
  };

  // Define mood styles and icons
  const moodStyles = {
    1: { backgroundColor: '#ffcccc', icon: 'sentiment-very-dissatisfied', description: 'Bad day 😞' },
    2: { backgroundColor: '#ffe6cc', icon: 'sentiment-dissatisfied', description: 'Anxious day 😕' },
    3: { backgroundColor: '#fff0b3', icon: 'sentiment-neutral', description: 'Neutral day 😐' },
    4: { backgroundColor: '#ccffcc', icon: 'sentiment-satisfied', description: 'Good day 😊' },
    5: { backgroundColor: '#b3e6ff', icon: 'sentiment-very-satisfied', description: 'Great day 😄' },
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Icon name="menu" size={24} color="#000" />
        <Text style={styles.title}>Dashboard</Text>
        <Icon name="account-circle" size={24} color="#000" />
      </View>

      <Text style={styles.dateDisplay}>{currentDate}</Text>

      {/* Patient Mood Section */}
      <View style={styles.moodSectionContainer}>
        <Text style={styles.sectionTitle}>Patient Mood</Text>
        <BarChart
          data={chartData}
          width={320}
          height={220}
          chartConfig={chartConfig}
          verticalLabelRotation={30}
          style={styles.chartStyle}
        />
      </View>

      {/* Recent Diaries Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Recent Diaries</Text>
        {diaries.map(diary => (
          <View key={diary.id} style={[styles.diaryItem, { backgroundColor: moodStyles[diary.mood].backgroundColor }]}>
            <TouchableOpacity onPress={() => handleExpandDiary(diary.id)}>
              <View style={styles.diaryHeader}>
                <Icon name={moodStyles[diary.mood].icon} size={20} color="#333" />
                <Text style={styles.diaryDate}>
                  {moment(diary.date).format('MMM DD, YYYY')} - {moodStyles[diary.mood].description}
                </Text>
              </View>
              <Text style={styles.diaryContent}>
                {expandedDiary === diary.id ? diary.content : `${diary.content.slice(0, 50)}...`}
              </Text>
            </TouchableOpacity>

            {expandedDiary === diary.id && (
              <View style={styles.feedbackContainer}>
                <TextInput
                  style={styles.feedbackInput}
                  placeholder="Write feedback..."
                  value={feedback}
                  onChangeText={setFeedback}
                />
                <TouchableOpacity style={styles.replyButton} onPress={() => handleSendFeedback(diary.id)}>
                  <Text style={styles.replyButtonText}>Reply</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  dateDisplay: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginVertical: 10,
    color: '#333',
  },
  moodSectionContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  chartStyle: {
    borderRadius: 10,
    marginVertical: 8,
  },
  sectionContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 16,
  },
  diaryItem: {
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  diaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  diaryDate: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
  diaryContent: {
    fontSize: 16,
    color: '#333',
    marginTop: 4,
  },
  feedbackContainer: {
    marginTop: 10,
  },
  feedbackInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  replyButton: {
    backgroundColor: '#ff8c00', // Dark orange
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  replyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Patient;
