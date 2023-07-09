import axios from "axios";
const urlRoot =
  "https://expensify-react-native-cb57b-default-rtdb.firebaseio.com";
export const storeExpense = (expenseData) => {
  axios.post(`${urlRoot}/expenses.json`, expenseData);
};

export const getExpenses = async (expenseData) => {
  const response = await axios.get(`${urlRoot}/expenses.json`);
  const expenses = [];
  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };

    expenses.push(expenseObj);
  }
  return expenses;
};
