import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView, ScrollView, TouchableWithoutFeedback, Dimensions, Platform, StatusBar } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { useNavigation, useRoute } from '@react-navigation/native';
import Header from './Header';
import Footer from './Footer';
import Emoji from './Emoji';
import { ThemeContext } from '../StudentProfile/ThemeContext';

const MoodControl = () => {
  const { isDarkMode } = useContext(ThemeContext);
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
    backgroundGradientFrom: isDarkMode ? "#333" : "#fff",
    backgroundGradientTo: isDarkMode ? "#333" : "#fff",
    color: (opacity = 1) => isDarkMode ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: isDarkMode ? "#00f" : "#f00" // Use contrasting colors for dots
    },
    propsForBackgroundLines: {
      stroke: isDarkMode ? "#444" : "#eee", // Lighten gridlines for better contrast
      strokeDasharray: "" // Solid gridlines
    },
  };

  const screenWidth = Dimensions.get("window").width;

  const chartData = Object.entries(moodData).sort(([a], [b]) => moment(a).diff(moment(b)));

  return (
    <SafeAreaView style={[styles.SafeArea, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
      <TouchableWithoutFeedback onPress={closeMenu}>
        <View style={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
          <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} closeMenu={closeMenu} />
          
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <Text style={[styles.heading, { color: isDarkMode ? '#fff' : '#000' }]}>How are you feeling right now?</Text>
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
                [selectedDate]: { selected: true, selectedColor: isDarkMode ? '#00adf5' : '#00adf5' },
                ...Object.keys(moodData).reduce((acc, date) => ({
                  ...acc,
                  [date]: { marked: true, dotColor: isDarkMode ? '#50cebb' : '#50cebb' }
                }), {})
              }}
              theme={{
                calendarBackground: isDarkMode ? '#333' : '#fff',
                textSectionTitleColor: isDarkMode ? '#b6c1cd' : '#2d4150',
                todayTextColor: isDarkMode ? '#00adf5' : '#00adf5',
                dayTextColor: isDarkMode ? '#fff' : '#2d4150',
                arrowColor: isDarkMode ? '#fff' : '#2d4150',
                monthTextColor: isDarkMode ? '#fff' : '#2d4150',
                textDisabledColor: isDarkMode ? '#d9e1e8' : '#d9e1e8',
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
                  fromZero
                  withDots
                  withInnerLines
                  withVerticalLabels
                  withHorizontalLabels
                />
                <Text style={styles.chartLabel}>Mood Over Time</Text>
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
  SafeArea: {
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
  chartLabel: {
    fontSize: 16,
    color: '#888',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default MoodControl;
