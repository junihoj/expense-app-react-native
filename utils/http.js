import axios from "axios";
const urlRoot =
  "https://expensify-react-native-cb57b-default-rtdb.firebaseio.com";
export const storeExpense = async (expenseData) => {
  const response = await axios.post(`${urlRoot}/expenses.json`, expenseData);
  const id = response.data.name;
  return id;
};

export const getExpensesAsync = async () => {
  try {
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
  } catch (err) {
    console.log("firebase error", err);
  }
};

export const updateExpenseAsync = (id, expenseData) => {
  return axios.put(`${urlRoot}/expenses/${id}.json`, expenseData);
};
export const deleteExpenseAsync = (id) => {
  return axios.delete(`${urlRoot}/expenses/${id}.json`);
};
