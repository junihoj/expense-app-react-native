import React, { useContext, useState } from "react";
import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../utils/date";
import { getExpensesAsync } from "../utils/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

export default function RecentExpenses() {
  const { expenses, setExpenses } = useContext(ExpensesContext);
  const [isFetching, setIsFetching] = useState(true);
  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date > date7DaysAgo;
  });
  const [error, setError] = useState();
  React.useEffect(() => {
    const getExpenses = async () => {
      try {
        setIsFetching(true);
        const expenses = await getExpensesAsync();

        setExpenses(expenses);
      } catch (error) {
        setError("could not fetch expenses");
      }
      setIsFetching(false);
    };
    getExpenses();
  }, []);
  if (isFetching) {
    return <LoadingOverlay />;
  }
  const resetError = () => {
    setError(null);
  };
  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={resetError} />;
  }
  return (
    <ExpensesOutput
      fallbackText={"No Expenses Registered for the last 7 days"}
      expensesPeriod="Last 7 Days"
      expenses={recentExpenses}
    />
  );
}
