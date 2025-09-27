import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";

export default function TransactionForm({ initialData, onClose }) {
  const { addTransaction, updateTransaction } = useApp();

  const [type, setType] = useState("Expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  // Prefill form when initialData changes (edit mode)
  useEffect(() => {
    if (initialData) {
      setType(initialData.type || "Expense");
      setAmount(initialData.amount || "");
      setCategory(initialData.category || "");
      setDate(initialData.date || "");
      setDescription(initialData.description || "");
    } else {
      // Clear form for add mode
      setType("Expense");
      setAmount("");
      setCategory("");
      setDate("");
      setDescription("");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const transactionData = { type, amount, category, date, description };

    if (initialData) {
      updateTransaction(initialData.id, transactionData);
    } else {
      addTransaction(transactionData);
    }

    onClose(); // close form after submit
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3 mb-3">
      <div className="mb-2">
        <label className="form-label">Type</label>
        <select className="form-select" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
      </div>

      <div className="mb-2">
        <label className="form-label">Amount</label>
        <input
          type="number"
          className="form-control"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Category</label>
        <input
          type="text"
          className="form-control"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Date</label>
        <input
          type="date"
          className="form-control"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Description</label>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary">
          {initialData ? "Update Transaction" : "Add Transaction"}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
}
