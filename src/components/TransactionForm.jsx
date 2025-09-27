import React, { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";

export default function TransactionForm({ initialData, onClose }) {
  const { addTransaction, updateTransaction } = useApp();
  const [form, setForm] = useState({
    type: "expense",
    amount: "",
    category: "",
    date: "",
    description: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        type: initialData.type || "expense",
        amount: initialData.amount || "",
        category: initialData.category || "",
        date: initialData.date || "",
        description: initialData.description || "",
      });
    } else {
      setForm({
        type: "expense",
        amount: "",
        category: "",
        date: "",
        description: "",
      });
    }
  }, [initialData]);

  function change(key, val) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  async function submit(e) {
    e.preventDefault();
    const payload = { ...form, amount: Number(form.amount || 0) };
    let ok = true;
    if (initialData) {
      ok = updateTransaction(initialData.id, payload);
    } else {
      ok = addTransaction(payload);
    }
    if (!ok) return;
    onClose && onClose();
    if (!initialData) {
      setForm({
        type: "expense",
        amount: "",
        category: "",
        date: "",
        description: "",
      });
    }
  }

  return (
    <form onSubmit={submit} className="card p-3 mb-3">
      <div className="row g-2">
        <div className="col-4">
          <select
            className="form-select"
            value={form.type}
            onChange={(e) => change("type", e.target.value)}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        <div className="col-4">
          <input
            className="form-control"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => change("amount", e.target.value)}
          />
        </div>
        <div className="col-4">
          <input
            className="form-control"
            placeholder="Category"
            value={form.category}
            onChange={(e) => change("category", e.target.value)}
          />
        </div>
      </div>

      <div className="row g-2 mt-2">
        <div className="col-6">
          <input
            className="form-control"
            type="date"
            value={form.date}
            onChange={(e) => change("date", e.target.value)}
          />
        </div>
        <div className="col-6">
          <input
            className="form-control"
            placeholder="Description"
            value={form.description}
            onChange={(e) => change("description", e.target.value)}
          />
        </div>
      </div>

      <div className="d-flex gap-2 mt-3">
        <button className="btn btn-primary" type="submit">
          {initialData ? "Update" : "Save"}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
}
