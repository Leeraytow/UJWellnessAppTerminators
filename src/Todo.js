import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Todo({ todo }) {
  const [newTitle, setNewTitle] = useState(todo.title);
  const navigation = useNavigation();

  const SeeProduct = () => {
    navigation.navigate('product', {
      image: todo.pickedImage,
      name: todo.Name,
      price: todo.Price,
      description: todo.description,
      available: todo.quantity,
      reviews: todo.reviews
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={SeeProduct}>
        <Image
          style={styles.image}
          source={{ uri: todo.image }}
        />
      </TouchableOpacity>
      <Text style={{fontWeight:"bold",fontSize:15}}>{todo.text}</Text>
      <Text style={{fontWeight:"bold",fontSize:15}}>Price:{todo.author}</Text>
      <Text style={{color:'blue'}}>{todo.description}</Text>
      <Text>Available: {todo.quantity}</Text>
      <TouchableOpacity style={styles.addButton} onPress={SeeProduct}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical:20,
    borderColor:"black",
    borderWidth:1,
    alignItems: 'center',
    margin: 10,
    width:200,
   
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  addButton: {
    backgroundColor: "#8a2be2",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
