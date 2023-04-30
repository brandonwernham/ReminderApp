import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, FlatList, TouchableOpacity } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function App() {
  const [reminder, setReminder] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [date, setDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [time, setTime] = useState(null);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [reminders, setReminders] = useState([]);

  const inputFocus = () => setIsFocused(true);
  const inputBlur = () => setIsFocused(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Reminder App</Text>

        {/* Typing the reminder */}
        <TextInput 
          style={[
            styles.input,
            {borderColor: isFocused ? '#ef7c7a' : '#dce4f4'}
          ]} 
          placeholder='Type a reminder... (ex. hire Brandon Wernham)'
          placeholderTextColor='#3E547C'
          value={reminder}
          onChangeText={(text) => setReminder(text)}
          onFocus={inputFocus}
          onBlur={inputBlur}
        />

        {/* Choosing the date */}
        <TouchableOpacity style={styles.datePickerButton} onPress={showDatePicker}>
          <Text style={styles.datePickerButtonText}>
            {date !== null ? date.toLocaleDateString() : 'Choose a date'}
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={(selectedDate) => {
            setDate(selectedDate);
            setDatePickerVisibility(false);
          }}
          onCancel={() => setDatePickerVisibility(false)}
        />

        {/* Choosing the time */}
        <TouchableOpacity style={styles.datePickerButton} onPress={showTimePicker}>
          <Text style={styles.datePickerButtonText}>
          {time !== null ? time.toLocaleTimeString([], {hour: 'numeric', minute: 'numeric', hour12: true}) : 'Choose a time'}
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={(selectedTime) => {
            setTime(selectedTime);
            setTimePickerVisibility(false);
          }}
          onCancel={() => setTimePickerVisibility(false)}
        />

        {/* Create the reminder */}
        

      </View>
      <Text>{reminder}</Text>
      <Text>{date !== null ? date.toLocaleDateString() : 'No Date Selected'}</Text>
      <Text>{time !== null ? time.toLocaleTimeString([], {hour: 'numeric', minute: 'numeric', hour12: true}) : 'No Time Selected'}</Text>
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
  datePickerButton: {
    backgroundColor: '#1495cd',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginTop: 10,
    alignItems: 'center',
    width: 200,
  },
  datePickerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
