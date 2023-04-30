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

  const createReminder = () => {
    if (!reminder || !date || !time) {
      return;
    }
  
    const newReminder = {
      id: Date.now().toString(),
      text: reminder,
      date: date,
      time: time,
      completed: false,
    };
  
    setReminders((prevReminders) => [...prevReminders, newReminder]);
    setReminder('');
    setDate(null);
    setTime(null);
    setDatePickerVisibility(false);
    setTimePickerVisibility(false);
  };
  
  const Reminder = ({ id, text, date, time, completed }) => {

    const toggleCompleted = () => {
      const updatedReminders = reminders.map((reminder) => {
        if (reminder.id === id) {
          return {
            ...reminder,
            completed: !reminder.completed,
          };
        } else {
          return reminder;
        }
      });
      setReminders(updatedReminders);
    };

    return (
      <View style={[
        styles.reminderContainer,
        {borderColor: '#dce4f4'}
      ]}>
        <Text style={styles.reminderText}>{text}</Text>
        <Text style={styles.reminderDateTime}>{date.toLocaleDateString()}, {time.toLocaleTimeString([], {hour: 'numeric', minute: 'numeric', hour12: true})}</Text>
        <TouchableOpacity onPress={toggleCompleted}>
          {completed ? (
            <View 
              style={[
                styles.checkboxChecked,
                {borderColor: '#dce4f4'}
              ]}
            >
              <Text style={styles.checkboxCompletedText}>Completed</Text>
            </View>
          ) : (
            <View 
              style={[
                styles.checkbox,
                {borderColor: '#dce4f4'}
              ]}
            >
              <Text style={styles.checkboxText}>Not Completed</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
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
        <TouchableOpacity style={styles.createReminderButton} onPress={createReminder}>
          <Text style={styles.createReminderButtonText}>
            Create Reminder
          </Text>
        </TouchableOpacity>
  
        {/* Display the reminders */}
        <FlatList
          data={reminders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Reminder {...item} />}
          contentContainerStyle={[
            styles.remindersList,
            {borderColor: '#ef7c7a'}
          ]}
        />
      </View>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'top',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 70
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#152542',
  },
  input: {
    borderWidth: 1,
    width: '80%',
    height: 50,
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
  createReminderButton: {
    backgroundColor: '#ef7c7a',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 15,
    alignItems: 'center',
    width: 300,
    width: 300,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  createReminderButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  remindersList: {
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    width: 400,
    height: 500,
    marginTop: 15,
    borderRadius: 8,
    borderWidth: 1,
  },
  reminderContainer: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
  },
  reminderText: {
    color: '#3E547C',
  },
  reminderDateTime: {
    color: '#3E547C',
  },
  checkbox: {
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 10,
    height: 30,
    width: 150,
    padding: 5,
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#ef7c7a',
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 10,
    height: 30,
    width: 150,
    padding: 5,
    alignItems: 'center',
  },
  checkboxText: {
    color: '#3E547C',
  },
  checkboxCompletedText: {
    color: 'white',
  },
});
