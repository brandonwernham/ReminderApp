import store, { addReminder, deleteReminder, toggleCompleted, setImportant } from './store';

describe('Reducer functions', () => {
    test('addReminder reducer should add a new reminder to the state', () => {
        const action = addReminder({ id: 1, text: 'Test reminder' });
      
        store.dispatch(action);

        const newState = store.getState().reminders;

        expect(newState.length).toBe(1);
        expect(newState[0].id).toBe(1);
        expect(newState[0].text).toBe('Test reminder');
    });

    test('deleteReminder reducer should remove a reminder from the state', () => {
        const initialReminders = [
            { id: 1, text: 'Reminder 1' },
            { id: 2, text: 'Reminder 2' },
        ];
        store.dispatch({ type: 'nonexistent_action' });
        initialReminders.forEach(reminder => {
            store.dispatch(addReminder(reminder));
        });

        const action = deleteReminder(1);

        store.dispatch(action);

        const newState = store.getState().reminders;

        expect(newState.length).toBe(1);
        expect(newState[0].id).toBe(2);
        expect(newState[0].text).toBe('Reminder 2');
    });
});