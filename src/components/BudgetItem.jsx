import React from "react";
export default function BudgetItem({ category, limit, spent, onSet }) {
  const pct = Math.min(100, Math.round((spent / limit) * 100) || 0);
  const variant = pct > 100 ? "danger" : pct > 80 ? "warning" : "success";
  return (
    <div className="mb-3 card p-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div>
          <strong>{category}</strong>
          <div className="text-muted">
            {spent} spent of {limit}
          </div>
        </div>
        <div className="text-end">
          <span className={`badge bg-${variant}`}>{pct}%</span>
        </div>
      </div>
      <div className="progress" style={{ height: 8 }}>
        <div
          className={`progress-bar bg-${variant}`}
          role="progressbar"
          style={{ width: `${Math.min(100, pct)}%` }}
          aria-valuenow={pct}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
      <div className="mt-2 d-flex gap-2">
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={() => onSet(category)}
        >
          Set
        </button>
      </div>
    </div>
  );
}
