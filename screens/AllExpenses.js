import React from "react";
import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

export default function AllExpenses() {
  return <ExpensesOutput expensesPeriod="Total" />;
}
