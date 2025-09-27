import React from "react";
export default function CurrencySelect({ value, onChange }) {
  const opts = ["₹", "$", "€", "£"];
  return (
    <select
      className="form-select form-select-sm"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {opts.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}
