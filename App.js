import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
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

      <Button
        title="Add New Todo"
        onPress={() => console.log("Add new todo button pressed")}
        style={styles.addButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign:'center',
    marginBottom: 20,
    marginTop: 30,
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
    marginTop: 20,
  },
});