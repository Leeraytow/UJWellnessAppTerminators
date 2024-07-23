import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView, ScrollView, TouchableWithoutFeedback, Dimensions,Platform,StatusBar } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { useNavigation, useRoute } from '@react-navigation/native';
import Header from './Header';
import Footer from './Footer';
import Emoji from './Emoji';

const MoodControl = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [moodData, setMoodData] = useState({});
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  
  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    if (route.params?.selectedEmotion) {
      setSelectedEmotion(route.params.selectedEmotion);
      const selectedEmotionValue = emotions.find(emotion => emotion.id === route.params.selectedEmotion).value;
      setMoodData(prevData => ({
        ...prevData,
        [selectedDate]: selectedEmotionValue
      }));
    }
  }, [route.params]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const emotions = [
    { emoji: '😃', label: 'Excited', id: 1, value: 5 },
    { emoji: '😊', label: 'Happy', id: 2, value: 4 },
    { emoji: '😍', label: 'Loved', id: 3, value: 3 },
    { emoji: '😐', label: 'Bored', id: 4, value: 2 },
    { emoji: '😨', label: 'Anxious', id: 5, value: 1 },
    { emoji: '😟', label: 'Worried', id: 6, value: 0 },
    { emoji: '😠', label: 'Angry', id: 7, value: -1 },
    { emoji: '😩', label: 'Frustrated', id: 8, value: -2 },
    { emoji: '😢', label: 'Sad', id: 9, value: -3 },
  ];

  const handleEmojiPress = (id) => {
    setSelectedEmotion(id);
    const selectedEmotionValue = emotions.find(emotion => emotion.id === id).value;
    setMoodData(prevData => ({
      ...prevData,
      [selectedDate]: selectedEmotionValue
    }));
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false
  };

  const screenWidth = Dimensions.get("window").width;

  const moodIcons = emotions.map(emotion => (
    <View key={emotion.id} style={styles.moodIcon}>
      <Text style={styles.moodIconEmoji}>{emotion.emoji}</Text>
    </View>
  ));

  const chartData = Object.entries(moodData).sort(([a], [b]) => moment(a).diff(moment(b)));

  return (
    <SafeAreaView style={styles.SafeArea}>
      <TouchableWithoutFeedback onPress={closeMenu}>
        <View style={styles.container}>
          <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} closeMenu={closeMenu} />
          
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <Text style={styles.heading}>How are you feeling right now?</Text>
            <View style={styles.emojiGrid}>
              {emotions.map((emotion) => (
                <Emoji
                  key={emotion.id}
                  emoji={emotion.emoji}
                  label={emotion.label}
                  onPress={() => handleEmojiPress(emotion.id)}
                  isSelected={selectedEmotion === emotion.id}
                />
              ))}
            </View>

            <Calendar
              onDayPress={handleDayPress}
              markedDates={{
                [selectedDate]: { selected: true, selectedColor: '#00adf5' },
                ...Object.keys(moodData).reduce((acc, date) => ({
                  ...acc,
                  [date]: { marked: true, dotColor: '#50cebb' }
                }), {})
              }}
              style={styles.calendar}
            />

            {chartData.length > 0 && (
              <View style={styles.chartContainer}>
                <LineChart
                  data={{
                    labels: chartData.map(([date]) => moment(date).format('DD MMM')),
                    datasets: [{
                      data: chartData.map(([, value]) => value)
                    }]
                  }}
                  width={screenWidth * 0.9}
                  height={220}
                  chartConfig={chartConfig}
                  bezier
                  style={styles.chart}
                />
              </View>
            )}
          </ScrollView>

          <Footer />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  SafeArea:{
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
 
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  emojiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 10,
  },
  moodIcon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moodIconEmoji: {
    fontSize: 24,
  },
  calendar: {
    width: '100%',
    marginTop: 20,
  },
  chartContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  chart: {
    borderRadius: 16,
  },
});

export default MoodControl;






