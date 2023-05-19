import { configureStore, createSlice } from '@reduxjs/toolkit';
const initialState = {
    reminders: [],
};

// Slice of reducers
const reminderSlice = createSlice({
    name: 'reminder',
    initialState,
    reducers: {
        addReminder: (state, action) => {
            // Concatenates the existing array with the new reminder
            state.reminders = state.reminders.concat(action.payload);
        },
        deleteReminder: (state, action) => {
            const id = action.payload;
            // Filters the reminder to delete
            state.reminders = state.reminders.filter((item) => item.id !== id);
        },
        toggleCompleted: (state, action) => {
            const id = action.payload;
            const reminder = state.reminders.find((item) => item.id === id);

            // Inverts the state of completed
            if (reminder) {
                reminder.completed = !reminder.completed;
            }
        },
        setImportant: (state, action) => {
            const id = action.payload;
            const reminder = state.reminders.find((item) => item.id === id);
            const reminderIndex = state.reminders.findIndex((item) => item.id === id);

            // If it's not important move it to the end, if it is then bring it to the front
            if (reminder) {
                reminder.important = !reminder.important;

                if (!reminder.important) {
                    if (reminderIndex !== -1) {
                        const [removedReminder] = state.reminders.splice(reminderIndex, 1);
                        state.reminders.push(removedReminder);
                    }
                } else {
                    if (reminderIndex !== -1) {
                        const [removedReminder] = state.reminders.splice(reminderIndex, 1);
                        state.reminders.unshift(removedReminder);
                    }
                }
            }
        },
    },
});

export const { addReminder, deleteReminder, toggleCompleted, setImportant } = reminderSlice.actions;

const reducer = reminderSlice.reducer;

const store = configureStore({
    reducer: reducer,
});

export default store;