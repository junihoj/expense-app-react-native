import NavigationConfiguration from "./navigation/NavigationConfiguration";
import ExpensesContextProvider from "./store/expenses-context";

export default function App() {
  return (
    <ExpensesContextProvider>
      <NavigationConfiguration />
    </ExpensesContextProvider>
  );
}
