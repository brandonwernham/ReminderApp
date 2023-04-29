import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [reminder, setReminder] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const inputFocus = () => setIsFocused(true);
  const inputBlur = () => setIsFocused(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Reminder App</Text>
        <TextInput 
          style={[
            styles.input,
            {borderColor: isFocused ? '#ef7c7a' : '#dce4f4'}
          ]} 
          placeholder='Type a reminder here...'
          placeholderTextColor='#3E547C'
          value={reminder}
          onChangeText={(text) => setReminder(text)}
          onFocus={inputFocus}
          onBlur={inputBlur}
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
    marginBottom: 15,
    color: '#152542',
  },
  input: {
    borderWidth: 1,
    width: '80%',
    height: 40,
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
  },
});
