import React, { useContext } from "react";
import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

export default function AllExpenses() {
  const { expenses } = useContext(ExpensesContext);
  return (
    <ExpensesOutput
      fallbackText="No Expenses Resgistered Yet"
      expensesPeriod="Total"
      expenses={expenses}
    />
  );
}
