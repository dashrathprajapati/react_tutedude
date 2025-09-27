import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import BudgetItem from "../components/BudgetItem";
export default function Budgets() {
  const { data, setBudget } = useApp();
  const cats = Object.keys(data.budgets);
  function setFor(cat) {
    const val = prompt(
      `Set monthly budget for ${cat}`,
      String(data.budgets[cat] || 0)
    );
    if (val != null) setBudget(cat, Number(val));
  }
  return (
    <div>
      <h3>Budgets</h3>
      <div className="row">
        {cats.map((cat) => {
          const spent = data.transactions
            .filter((t) => t.type === "expense" && t.category === cat)
            .reduce((a, b) => a + b.amount, 0);
          return (
            <div className="col-md-6" key={cat}>
              <BudgetItem
                category={cat}
                limit={data.budgets[cat]}
                spent={spent}
                onSet={setFor}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
