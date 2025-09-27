import React from "react";
import { useApp } from "../context/AppContext";
import CurrencySelect from "../components/CurrencySelect";
export default function Profile() {
  const { data, updateProfile, setCurrency } = useApp();
  function save() {
    const name = prompt("Name", data.profile.name);
    const email = prompt("Email", data.profile.email);
    if (name && email) updateProfile({ name, email });
  }
  return (
    <div>
      <h3>Profile</h3>
      <div className="card p-3 mb-3">
        <div>
          <strong>Name:</strong> {data.profile.name}
        </div>
        <div>
          <strong>Email:</strong> {data.profile.email}
        </div>
        <div className="d-flex gap-2 align-items-center mt-2">
          Default currency{" "}
          <CurrencySelect
            value={data.settings.currency}
            onChange={setCurrency}
          />
        </div>
        <div className="mt-3">
          {" "}
          <button className="btn btn-primary" onClick={save}>
            Edit Profile
          </button>
        </div>
      </div>
      <div className="card p-3">
        <div>
          <strong>Lifetime Expenses:</strong>{" "}
          {data.transactions
            .filter((t) => t.type === "expense")
            .reduce((a, b) => a + b.amount, 0)}
        </div>
        <div>
          <strong>Lifetime Savings:</strong>{" "}
          {Math.max(
            0,
            data.transactions
              .filter((t) => t.type === "income")
              .reduce((a, b) => a + b.amount, 0) -
              data.transactions
                .filter((t) => t.type === "expense")
                .reduce((a, b) => a + b.amount, 0)
          )}
        </div>
      </div>
    </div>
  );
}
