import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home', headerTitleAlign: "center"}} />
        <Stack.Screen name="AddTodo" component={AddTodoScreen} options={{ title: 'Add New Todo', headerTitleAlign:"center" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
  const todos = [
    { id: 1, text: "Buy Milk", completed: false },
    { id: 2, text: "Buy Bread", completed: false },
    { id: 3, text: "Buy Eggs", completed: false }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Todo List</Text>

      <View style={styles.line}></View>

      <View style={styles.todoList}>
        {todos.map(todo => (
          <View key={todo.id} style={styles.todoItemContainer}>
            <Text style={styles.todoItemText}>{todo.text}</Text>
          </View>
        ))}
      </View>

      <View style={styles.line}></View>
      
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddTodo')}
      >
        <Ionicons name="add-circle-outline" size={40} color="blue" />
        <Text style={styles.addButtonText}>Add New Todo</Text>
      </TouchableOpacity>
    </View>
  );
}

function AddTodoScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Todo</Text>
      <View style={styles.line}></View>

      <TextInput
        style={styles.input}
        placeholder="Title"
      />

      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Description"
        multiline={true}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.button}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'blue' }]}
          onPress={() => console.log("Save button pressed")}
        >
          <Text style={[styles.buttonText, { color: 'white' }]}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  line: {
    width: '100%',
    height: 2,
    backgroundColor: 'black',
    marginBottom: 20,
  },
  todoList: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  todoItemContainer: {
    backgroundColor: '#0d6efd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 50,
  },
  todoItemText: {
    fontSize: 16,
    color: 'white',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 18,
    marginLeft: 10,
    color: 'blue',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: 'lightgray',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
  },
});
