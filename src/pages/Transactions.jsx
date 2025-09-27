import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import TransactionForm from "../components/TransactionForm";
import TransactionTable from "../components/TransactionTable";

export default function Transactions() {
  const { data } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const handleEdit = (tx) => {
    setEditingTransaction(tx);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setEditingTransaction(null);
    setShowForm(false);
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Transactions</h3>
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditingTransaction(null);
            setShowForm((s) => !s);
          }}
        >
          {showForm ? "Close" : "Add Transaction"}
        </button>
      </div>

      {showForm && (
        <TransactionForm
          key={editingTransaction ? editingTransaction.id : "add-form"}
          initialData={editingTransaction}
          onClose={handleCloseForm}
        />
      )}

      <TransactionTable items={data.transactions} onEdit={handleEdit} />
    </div>
  );
}
