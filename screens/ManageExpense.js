import React, { useContext, useLayoutEffect } from "react";
import { Text } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import {
  deleteExpenseAsync,
  storeExpense,
  updateExpenseAsync,
} from "../utils/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

export default function ManageExpenses({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  const { deleteExpense, updateExpense, expenses, addExpense } =
    useContext(ExpensesContext);

  const selectedExpenses = expenses.find(
    (expense) => expense.id === editedExpenseId
  );
  const deleteExpenseHandler = async () => {
    setIsSubmitting(true);
    try {
      await deleteExpenseAsync(editedExpenseId);

      deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setIsSubmitting(false);
      setError("Could not delete Expense, Please try again");
    }
  };
  const cancelHandler = () => {
    navigation.goBack();
  };
  const confirmHandler = async (expenseData) => {
    setIsSubmitting(true);
    if (isEditing) {
      updateExpense(editedExpenseId, expenseData);
      await updateExpenseAsync(editedExpenseId, expenseData);
    } else {
      const id = await storeExpense(expenseData);
      addExpense({ ...expenseData, id: id });
    }
    navigation.goBack();
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);
  const resetError = () => {
    setError(null);
  };
  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} onConfirm={resetError} />;
  }
  if (error && !isSubmitting) {
    return <ErrorOverlay />;
  }
  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitButtonLabel={isEditing ? "update" : "Add"}
        defaultValues={selectedExpenses}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
});
