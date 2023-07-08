import React, { useState } from "react";
import { Alert, Text } from "react-native";
import Input from "./Input";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import Button from "../UI/Button";
import { getFormattedDate } from "../../utils/date";

const ExpenseForm = ({
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValues,
}) => {
  const [inputValue, setInputValue] = useState({
    amount: defaultValues?.amount?.toString() ?? "",
    date: defaultValues?.date ? getFormattedDate(defaultValues?.date) : "",
    description: defaultValues?.description ?? "",
  });

  const inputChangedHandler = (inputIdentifier, enteredValue) => {
    setInputValue((prevState) => ({
      ...prevState,
      [inputIdentifier]: enteredValue,
    }));
  };
  const submitHandler = () => {
    const expenseData = {
      amount: +inputValue.amount,
      date: new Date(inputValue.date),
      description: inputValue.description,
    };
    const amountValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseDate?.date?.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description?.trim().length > 0;
    if (!amountValid || !dateIsValid || !descriptionIsValid) {
      Alert.alert("Invalid input", "Please Input a Valid");
    }
    onSubmit(expenseData);
  };
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Expense Form</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            // onchangeText: inputChangedHandler.bind(this, 'amount'),
            onchangeText: (enteredText) => {
              inputChangedHandler("amount", enteredText);
            },
            value: inputValue.amount,
          }}
        />
        <Input
          label="Date"
          style={styles.rowInput}
          textInputConfig={{
            onchangeText: (enteredText) => {
              inputChangedHandler("date", enteredText);
            },
            placeHolder: "YYYY-MM-DD",
            maxLength: 10,
            value: inputValue.date,
          }}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          onchangeText: (enteredText) => {
            inputChangedHandler("description", enteredText);
          },
          maxLength: 10,
          multiLine: true,
          value: inputValue.description,
        }}
      />
      <View style={styles.buttons}>
        <Button style={styles.buttonStyle} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.buttonStyle} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;
const styles = StyleSheet.create({
  form: {
    marginTop: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonStyle: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
