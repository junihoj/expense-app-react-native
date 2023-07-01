import React from "react";
import { Text } from "react-native";
import { FlatList } from "react-native";
import ExpenseItem from "./ExpenseItem";

const renderExpensesItem = (itemData) => {
  return <ExpenseItem {...itemData.item} />;
};
export default function ExpensesList({ expenses }) {
  return (
    <FlatList
      keyExtractor={(item) => item.id}
      data={expenses}
      renderItem={renderExpensesItem}
    />
  );
}
