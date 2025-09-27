import React, { createContext, useContext, useEffect, useState } from "react";
import { load, save } from "../utils/storage";
import { defaultData } from "../data/defaultData";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const AppContext = createContext(null);
export function useApp() {
  return useContext(AppContext);
}
export default function AppProvider({ children }) {
  const [data, setData] = useState(() => load("finance-data", defaultData));
  useEffect(() => {
    save("finance-data", data);
  }, [data]);
  function addTransaction(tx) {
    const next = { ...tx, id: Date.now() };
    setData((s) => ({ ...s, transactions: [next, ...s.transactions] }));
    toast.success("Transaction added");
    checkBudget(next);
  }
  function updateTransaction(id, patch) {
    setData((s) => ({
      ...s,
      transactions: s.transactions.map((t) =>
        t.id === id ? { ...t, ...patch } : t
      ),
    }));
    toast.success("Transaction updated");
  }
  function deleteTransaction(id) {
    setData((s) => ({
      ...s,
      transactions: s.transactions.filter((t) => t.id !== id),
    }));
    toast.success("Transaction deleted");
  }
  function setBudget(category, amount) {
    setData((s) => ({ ...s, budgets: { ...s.budgets, [category]: amount } }));
    toast.success("Budget saved");
    checkAllBudgets();
  }
  function updateProfile(profile) {
    setData((s) => ({ ...s, profile }));
    toast.success("Profile updated");
  }
  function setCurrency(currency) {
    setData((s) => ({ ...s, settings: { ...s.settings, currency } }));
  }
  function checkBudget(tx) {
    if (tx.type !== "expense") return;
    const spent =
      data.transactions
        .filter((t) => t.type === "expense" && t.category === tx.category)
        .reduce((a, b) => a + b.amount, 0) + tx.amount;
    const limit = data.budgets[tx.category];
    if (limit && spent > limit) {
      toast.error(`Budget exceeded for ${tx.category}`);
    }
  }
  function checkAllBudgets() {
    Object.keys(data.budgets).forEach((cat) => {
      const spent = data.transactions
        .filter((t) => t.type === "expense" && t.category === cat)
        .reduce((a, b) => a + b.amount, 0);
      if (spent > data.budgets[cat]) toast.error(`Budget exceeded for ${cat}`);
    });
  }
  return (
    <AppContext.Provider
      value={{
        data,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        setBudget,
        updateProfile,
        setCurrency,
      }}
    >
      {children}
      <ToastContainer position="top-right" />
    </AppContext.Provider>
  );
}
