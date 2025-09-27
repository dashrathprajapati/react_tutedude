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

  function totalByType(type, overrideTransactions) {
    const list = Array.isArray(overrideTransactions ? overrideTransactions : data.transactions)
      ? (overrideTransactions ? overrideTransactions : data.transactions)
      : [];
    return list
      .filter((t) => String(t.type || "").toLowerCase() === String(type).toLowerCase())
      .reduce((a, b) => a + Number(b.amount || 0), 0);
  }

  function checkExpenseAllowed(amount, extraTransactions) {
    const income = totalByType("income", extraTransactions);
    const expense = totalByType("expense", extraTransactions);
    return expense + Number(amount || 0) <= income;
  }
  function addTransaction(tx) {
    const payload = { ...tx, amount: Number(tx.amount || 0) };
    if (String(payload.type || "").toLowerCase() === "expense") {
      if (!checkExpenseAllowed(payload.amount)) {
        toast.error("Cannot add expense: total expenses would exceed total income");
        return false;
      }
    }
    const next = { ...payload, id: Date.now() };
    setData((s) => ({ ...s, transactions: [next, ...(Array.isArray(s.transactions) ? s.transactions : [])] }));
    toast.success("Transaction added");
    checkBudget(next);
    return true;
  }
  function updateTransaction(id, patch) {
    const existing = (data.transactions || []).find((t) => t.id === id);
    if (!existing) return false;
    const updated = { ...existing, ...patch, amount: Number(patch.amount ?? existing.amount) };
    const all = (data.transactions || []).map((t) => (t.id === id ? updated : t));
    if (String(updated.type || "").toLowerCase() === "expense") {
      if (!checkExpenseAllowed(updated.amount, all)) {
        toast.error("Cannot update: total expenses would exceed total income");
        return false;
      }
    }
    setData((s) => ({ ...s, transactions: all }));
    toast.success("Transaction updated");
    return true;
  }
  function deleteTransaction(id) {
    setData((s) => ({ ...s, transactions: s.transactions.filter((t) => t.id !== id) }));
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
      (data.transactions || [])
        .filter((t) => t.type === "expense" && t.category === tx.category)
        .reduce((a, b) => a + b.amount, 0) + tx.amount;
    const limit = data.budgets[tx.category];
    if (limit && spent > limit) {
      toast.error(`Budget exceeded for ${tx.category}`);
    }
  }
  function checkAllBudgets() {
    Object.keys(data.budgets || {}).forEach((cat) => {
      const spent = (data.transactions || [])
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
