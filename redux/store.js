import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  reminders: [],
};

const reminderSlice = createSlice({
  name: 'reminder',
  initialState,
  reducers: {
    addReminder: (state, action) => {
        state.reminders = state.reminders.concat(action.payload);
    },
    deleteReminder: (state, action) => {
        const idToDelete = action.payload;
        state.reminders = state.reminders.filter((reminder) => reminder.id !== idToDelete);
    },
    toggleCompleted: (state, action) => {
      const { id } = action.payload;
      const reminder = state.reminders.find((item) => item.id === id);
      if (reminder) {
        reminder.completed = !reminder.completed;
      }
    },
  },
});

export const { addReminder, deleteReminder, toggleCompleted } = reminderSlice.actions;

const reducer = reminderSlice.reducer;

const store = configureStore({
  reducer: reducer,
});

export default store;
