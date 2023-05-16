import { Provider } from "react-redux";
import ReminderApp from "./ReminderApp";
import store from "./redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <ReminderApp />
    </Provider>
  );
}