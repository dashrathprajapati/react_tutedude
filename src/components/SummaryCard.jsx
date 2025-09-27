import React from "react";
export default function SummaryCard({
  title,
  value,
  children,
  variant = "light",
}) {
  return (
    <div className="col-md-3 col-6 mb-3">
      <div className={`card text-bg-${variant} h-100`}>
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <h6 className="card-subtitle mb-2">{title}</h6>
            <h4 className="card-title">{value}</h4>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
