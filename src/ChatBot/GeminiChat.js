import React, { useState, useEffect } from "react";
import * as GoogleGenerativeAI from "@google/generative-ai";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as Speech from "expo-speech";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import FlashMessage, { showMessage } from "react-native-flash-message";

const GeminiChat = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSpeechPaused, setIsSpeechPaused] = useState(false);
  const [latestBotMessage, setLatestBotMessage] = useState("");

  const API_KEY = "AIzaSyBkUf_hulHEDa0WkisTZ2jXiE8BD2IdG-8";

  useEffect(() => {
    const startChat = async () => {
      const initialMessage =
        "Hi, Welcome to UJWellness App, I'm your SootheBot, now tell me, What's bothering you?";
      setMessages([{ text: initialMessage, user: false }]);
      showMessage({
        message: "Welcome to SootheBot 🤖",
        description: initialMessage,
        type: "info",
        icon: "info",
        duration: 2000,
      });
      setLatestBotMessage(initialMessage);
    };

    startChat();
  }, []);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = { text: userInput, user: true };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setUserInput("");

    const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = userMessage.text;
    setLoading(true);
    const result = await model.generateContent(prompt);
    const response = result.response;
    
    let cleanedText = response.text().replace(/\*/g, '').replace(/\\/g, '').trim();
    
    setMessages((prevMessages) => [...prevMessages, { text: cleanedText, user: false }]);
    setLoading(false);
    setLatestBotMessage(cleanedText);

    // Auto-speak the response if speech is active
    if (cleanedText && !isSpeechPaused) {
      Speech.speak(cleanedText, {
        onDone: () => setIsSpeaking(false),
      });
      setIsSpeaking(true);
    }
  };

  const handleSpeechToggle = () => {
    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
      setIsSpeechPaused(true);
    } else {
      if (latestBotMessage) {
        Speech.speak(latestBotMessage, {
          onDone: () => setIsSpeaking(false),
        });
        setIsSpeaking(true);
        setIsSpeechPaused(false);
      }
    }
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.user ? styles.userMessageContainer : styles.botMessageContainer,
      ]}
    >
      <Text
        style={[
          styles.messageText,
          item.user ? styles.userMessageText : styles.botMessageText,
        ]}
      >
        {item.text}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SootheBot🤖</Text> 
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end" }}
      />
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.speakerIcon} onPress={handleSpeechToggle}>
          {isSpeaking ? (
            <FontAwesome name="volume-off" size={24} color="white" />
          ) : (
            <FontAwesome name="volume-up" size={24} color="white" />
          )}
        </TouchableOpacity>
        <TextInput
          placeholder="Type a message"
          onChangeText={setUserInput}
          value={userInput}
          onSubmitEditing={sendMessage}
          style={styles.input}
          placeholderTextColor="#fff"
        />
        <TouchableOpacity style={styles.sendIcon} onPress={sendMessage}>
          <MaterialIcons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa", // Dark white/cream background
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "#333", // Dark color for the title text
  },
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 15,
    maxWidth: "75%",
  },
  userMessageContainer: {
    backgroundColor: "#FFA500",
    alignSelf: "flex-end",
  },
  botMessageContainer: {
    backgroundColor: "#800080",
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16,
    color: "white",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "#131314",
    borderRadius: 10,
    height: 50,
    color: "white",
  },
  speakerIcon: {
    padding: 10,
    backgroundColor: "#131314",
    borderRadius: 25,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  sendIcon: {
    padding: 10,
    backgroundColor: "#131314",
    borderRadius: 25,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 3,
  },
});

export default GeminiChat;
