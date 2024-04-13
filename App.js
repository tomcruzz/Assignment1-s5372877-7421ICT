import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, Alert, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home', headerTitleAlign: 'center' }} />
        <Stack.Screen name="AddTodo" component={AddTodoScreen} options={{ title: 'Add New Todo', headerTitleAlign: 'center' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const savedTodos = await AsyncStorage.getItem('todos');
      if (savedTodos !== null) {
        setTodos(JSON.parse(savedTodos));
      }
    } catch (error) {
      console.error('Error loading todos:', error);
    }
  };

  const saveTodos = async (updatedTodos) => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
    } catch (error) {
      console.error('Error saving todos:', error);
    }
  };

  const addTodo = (newTodo) => {
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const deleteTodo = (todoId) => {
    const updatedTodos = todos.filter(todo => todo.id !== todoId);
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const toggleTodoCompletion = (todoId) => {
    const updatedTodos = todos.map(todo =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Todo List</Text>
      <View style={styles.line}></View>
      <FlatList
        data={todos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TodoItem
            todo={item}
            onDelete={() => deleteTodo(item.id)}
            onToggleCompletion={() => toggleTodoCompletion(item.id)}
          />
        )}
      />

<View style={styles.line}></View>

      <TouchableOpacity
        style={[styles.addButton, {backgroundColor:'#0080ff'}]}
        onPress={() => navigation.navigate('AddTodo', { addTodo })}
      >
        <Ionicons name="add-circle-outline" size={40} color="white" style={{position:'relative', left:'150%'}} />
        <Text style={[styles.addButtonText, {color:'white'}]}>Add New Todo</Text>
      </TouchableOpacity>
    </View>
  );
}

const TodoItem = ({ todo, onDelete, onToggleCompletion }) => {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <View style={styles.todoItemContainer}>
      <TouchableOpacity onPress={onToggleCompletion}>
        <Ionicons name={todo.completed ? 'checkmark-circle' : 'ellipse-outline'} size={30} color={todo.completed ? 'green' : 'black'} />
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <Text style={[styles.todoItemText, { textDecorationLine: todo.completed ? 'line-through' : 'none' }]}>{todo.text}</Text>
        {showDescription && <Text style={styles.description}>Description: {todo.description}</Text>}
      </View>
      <TouchableOpacity onPress={() => setShowDescription(!showDescription)}>
        <Ionicons name={showDescription ? 'caret-up' : 'caret-down'} size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete}>
        <Ionicons name="trash-outline" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
};

const AddTodoScreen = ({ navigation, route }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSaveTodo = () => {
    if (!title.trim() || !description.trim()) {
      return;
    }
    const newTodo = {
      id: Date.now(),
      text: title,
      description,
      completed: false,
    };

    route.params.addTodo(newTodo);
    Alert.alert('Success', 'Todo Added Successfully.');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Todo</Text>
      <View style={styles.line}></View>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={text => setTitle(text)}
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Description"
        multiline={true}
        value={description}
        onChangeText={text => setDescription(text)}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={30} color="white" />
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#008ae6' }]} onPress={handleSaveTodo}>
        <Ionicons name="checkmark-circle-outline" size={30} color="white" />
          <Text style={[styles.buttonText, { color: 'white' }]}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e6e6',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  addButtonText: {
    fontSize: 18,
    marginLeft: 70,
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
    flexDirection: 'row',
    backgroundColor: 'lightgray',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '45%',
    height: '20%',
    alignItems: 'center',
    marginTop: 280,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
  },
  todoItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  todoItemText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 18,
  },
  description: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginLeft: 5,
    
  },
  line: {
    width: '100%',
    height: 2,
    backgroundColor: 'black',
    marginBottom: 20,
  },
});
