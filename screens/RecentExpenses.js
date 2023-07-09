import React, { useContext, useState } from "react";
import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../utils/date";
import { getExpensesAsync } from "../utils/http";

export default function RecentExpenses() {
  const { expenses, setExpenses } = useContext(ExpensesContext);
  const [fetchedExpenses, setFetchedExpenses] = useState([]);
  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date > date7DaysAgo;
  });
  React.useEffect(() => {
    const getExpenses = async () => {
      const expenses = await getExpensesAsync();
      setExpenses(expenses);
    };
    getExpenses();
  }, []);
  return (
    <ExpensesOutput
      fallbackText={"No Expenses Registered for the last 7 days"}
      expensesPeriod="Last 7 Days"
      expenses={recentExpenses}
    />
  );
}
