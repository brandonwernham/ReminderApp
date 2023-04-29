import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [reminder, setReminder] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Reminder App</Text>
        <TextInput 
          style={styles.input} 
          placeholder='Type a reminder here...'
          value={reminder}
          onChangeText={(text) => setReminder(text)}    
        />
      </View>
      <Text>{reminder}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#152542',
  },
  input: {
    borderColor: 'gray',
    width: '4',
    height: '1',
  },
});
