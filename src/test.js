
import React from "react";
import Todo from "./Todo";
import { View, Text, Button, TextInput,StyleSheet,Image ,TouchableOpacity,ScrollView} from 'react-native';
import { useNavigation } from "@react-navigation/native";

import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../src/Configuration/firebase";

function Store() {
  const [todos, setTodos] = React.useState([]);
  const navigation =useNavigation();
  
  React.useEffect(() => {
    const q = query(collection(db, "Posts"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArray);
    });
    return () => unsub();
  }, []);

  const handleEdit = async (todo, title) => {
    await updateDoc(doc(db, "products", todo.id), { title: title });
  };
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "products", todo.id), { completed: !todo.completed });
  };
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "products", id));
  };
  
  
  

return (
  <ScrollView style={styles.mainContainer} >
     <View>
              <TextInput
              placeholder='search'
              style={styles.searchInput}
              />
          </View>
          

          <Text style={styles.categoryTitle}>
              Traditional Attires
            </Text>
          <ScrollView style={styles.imageContainer} horizontal={true}>
            
            
            {todos.map((todo)=>{
              
                return(
                  <Todo
                  key={todo.id}
                  todo={todo}
                  toggleComplete={toggleComplete}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
                )
              
         })
      }
              
            
      </ScrollView>
      <Text style={styles.categoryTitle}>
              Clay Work
            </Text>
          <ScrollView style={styles.imageContainer} horizontal={true}>
            
            
            {todos.map((todo)=>{
              if (todo.category == "Clay work"){
                return(
                  <Todo
                  key={todo.id}
                  todo={todo}
                  toggleComplete={toggleComplete}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
                )
              }
         })
      }
              
            
      </ScrollView>
      <Text style={styles.categoryTitle}>
              Wood Work
            </Text>
          <ScrollView style={styles.imageContainer} horizontal={true}>
            
            
            {todos.map((todo)=>{
              if (todo.category == "Wood work"){
                return(
                  <Todo
                  key={todo.id}
                  todo={todo}
                  toggleComplete={toggleComplete}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
                )
              }
         })
      }
              
            
      </ScrollView>
      <Text style={styles.categoryTitle}>
              Toys
            </Text>
          <ScrollView style={styles.imageContainer} horizontal={true}>
            
            
            {todos.map((todo)=>{
              if (todo.category == "Toys"){
                return(
                  <Todo
                  key={todo.id}
                  todo={todo}
                  toggleComplete={toggleComplete}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
                )
              }
         })
      }
              
            
      </ScrollView>
      <Text style={styles.categoryTitle}>
              Accessories
            </Text>
          <ScrollView style={styles.imageContainer} horizontal={true}>
            
            
            {todos.map((todo)=>{
              if (todo.category == "Accessories"){
                return(
                  <Todo
                  key={todo.id}
                  todo={todo}
                  toggleComplete={toggleComplete}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
                )
              }
         })
      }
              
            
      </ScrollView>
      <Text style={styles.categoryTitle}>
              Craft Work
            </Text>
          <ScrollView style={styles.imageContainer} horizontal={true}>
            
            
            {todos.map((todo)=>{
              if (todo.category == "Craft work"){
                return(
                  <Todo
                  key={todo.id}
                  todo={todo}
                  toggleComplete={toggleComplete}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
                )
              }
         })
      }
              
            
      </ScrollView>
      <Text style={styles.categoryTitle}>
              Other
            </Text>
          <ScrollView style={styles.imageContainer} horizontal={true}>
            
            
            {todos.map((todo)=>{
              if (todo.category == "Other"){
                return(
                  <Todo
                  key={todo.id}
                  todo={todo}
                  toggleComplete={toggleComplete}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
                )
              }
         })
      }
              
            
      </ScrollView>
      
  </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor:'white',
    paddingHorizontal: 20,
  },
  searchInput: {
    marginVertical: 10,
    height: 30,
    backgroundColor: '#fff',
    paddingLeft: 10,
    borderRadius: 15,
    borderWidth: 1,
    width: 200,
    alignSelf: 'center',
  },
  imageContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8a2be2', // Dark purple
    marginBottom: 10,
  },

});
export default Store;