import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  reminders: [],
};

const reminderSlice = createSlice({
  name: 'reminder',
  initialState,
  reducers: {
    addReminder: (state, action) => {
      state.reminders.push(action.payload);
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

export const { addReminder, toggleCompleted } = reminderSlice.actions;

const reducer = reminderSlice.reducer;

const store = configureStore({
  reducer: reducer,
});

export default store;
