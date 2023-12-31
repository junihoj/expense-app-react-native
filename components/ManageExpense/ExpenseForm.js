import React, { useState } from "react";
import { Alert, Text } from "react-native";
import Input from "./Input";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import Button from "../UI/Button";
import { getFormattedDate } from "../../utils/date";
import { GlobalStyles } from "../../constants/styles";

function ExpenseForm({ onCancel, onSubmit, submitButtonLabel, defaultValues }) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }
  const submitHandler = () => {
    const expenseData = {
      amount: +inputs.amount?.value,
      date: new Date(inputs.date?.value),
      description: inputs.description?.value,
    };
    const amountValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData?.date?.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description?.trim().length > 0;
    if (!amountValid || !dateIsValid || !descriptionIsValid) {
      setInputs((prevState) => ({
        amount: { value: prevState?.amount?.value, isValid: amountValid },
        date: { value: prevState?.date?.value, isValid: dateIsValid },
        description: {
          value: prevState?.description?.value,
          isValid: descriptionIsValid,
        },
      }));
      return;
    }
    onSubmit(expenseData);
  };
  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Expense Form</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="amount"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
        />
        <Input
          label="Date"
          style={styles.rowInput}
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.date.isValid}
        textInputConfig={{
          onChangeText: inputChangedHandler.bind(this, "description"),
          maxLength: 10,
          multiLine: true,
          value: inputs.description.value,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.erroText}>Invalid Input Values</Text>
      )}
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
}

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
  erroText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});
