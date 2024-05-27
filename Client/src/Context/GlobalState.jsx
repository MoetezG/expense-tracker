import axios from "axios";
import { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  transactions: [],
  error: null,
  loading: true,
};
export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  async function getTransactions() {
    try {
      const res = await axios.get("http://localhost:8000/transaction");
      dispatch({
        type: "GET_TRANSACTIONS",
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  async function deleteTransaction(id) {
    await axios.delete(`http://localhost:8000/transaction/${id}`);
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });
  }
  async function addTransaction(transaction) {
    const res = await axios.post(
      "http://localhost:8000/transaction",
      transaction
    );

    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        deleteTransaction,
        addTransaction,
        getTransactions,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
