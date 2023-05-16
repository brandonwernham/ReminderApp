import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { connect } from 'react-redux';
import { addReminder, deleteReminder, toggleCompleted, setImportant } from './redux/store';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const ReminderApp = ({ reminders, addReminder, deleteReminder, toggleCompleted, setImportant }) => {
    const [reminder, setReminder] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [date, setDate] = useState(null);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [time, setTime] = useState(null);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  
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
            date: date.toISOString(),
            time: time.toISOString(),
            completed: false,
        };
    
        setReminder('');
        setDate(null);
        setTime(null);
        setDatePickerVisibility(false);
        setTimePickerVisibility(false);
    
        addReminder(newReminder);
    };
  
    const Reminder = ({ id, text, date, time, completed, important }) => {
        const toggleReminderCompleted = () => {
            toggleCompleted({ id });
        };

        const deleteFromReminders = () => {
            deleteReminder(id);
        };

        const setReminderImportant = () => {
            setImportant({ id });
        };

        const formattedDate = new Date(date).toLocaleDateString();
        const formattedTime = new Date(time).toLocaleTimeString([], {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
  
        return (
            <View style={[
                styles.reminderContainer,
                {borderColor: '#dce4f4'}
            ]}>
                <View style={styles.textAndDelete}>
                    <Text style={styles.reminderText}>{text}</Text>
                    <TouchableOpacity onPress={deleteFromReminders} style={styles.deleteButton}>
                        <AntDesignIcon
                            name='delete'
                            size={30}
                            color='#152542' 
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.reminderDateTime}>{formattedDate}, {formattedTime}</Text>

                {/* Completed or not completed */}
                <TouchableOpacity onPress={toggleReminderCompleted}>
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

                {/* Important or not important */}
                <TouchableOpacity onPress={setReminderImportant}>
                    {important ? (
                        <View 
                        style={[
                            styles.checkboxChecked,
                            {borderColor: '#dce4f4'}
                        ]}
                        >
                        <Text style={styles.checkboxCompletedText}>IMPORTANT</Text>
                        </View>
                    ) : (
                        <View 
                        style={[
                            styles.checkbox,
                            {borderColor: '#dce4f4'}
                        ]}
                        >
                        <Text style={styles.checkboxText}>Set high importance</Text>
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
  
        <View style={styles.dateAndTimeView}>
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
        </View>
        
  
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
};

const mapStateToProps = (state) => ({
    reminders: state.reminders,
});

const mapDispatchToProps = {
    addReminder,
    deleteReminder,
    toggleCompleted,
    setImportant,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReminderApp);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'top',
  },
  header: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 40,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#152542',
  },
  input: {
    borderWidth: 1,
    width: 350,
    height: 50,
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
  },
  dateAndTimeView: {
    display: 'flex',
    flexDirection: 'row',
  },
  datePickerButton: {
    backgroundColor: '#1495cd',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginTop: 10,
    alignItems: 'center',
    width: 173,
    marginLeft: 2,
    marginRight: 2,
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
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    width: 350,
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
    width: 350,
    height: 'auto',
    marginTop: 15,
    marginBottom: 30,
    borderRadius: 8,
    borderWidth: 1,
    paddingBottom: 20,
    paddingTop: 20,
  },
  reminderContainer: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 7,
    marginBottom: 7,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
  },
  textAndDelete: {
    display: 'flex',
    flexDirection: 'row',
  },
  reminderText: {
    color: '#3E547C',
  },
  deleteButton: {
    position: 'absolute',
    right: 2,
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