import React from "react";
import { useApp } from "../context/AppContext";
import SummaryCard from "../components/SummaryCard";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);
export default function Dashboard() {
  const { data } = useApp();
  const trans = data.transactions;
  const totalIncome = trans
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);
  const totalExpense = trans
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);
  const remaining = totalIncome - totalExpense;
  const savings = Math.max(0, remaining);
  const days = [...new Set(trans.map((t) => t.date))].sort();
  const monthlyData = {
    labels: days,
    datasets: [
      {
        label: "Spending",
        data: days.map((d) =>
          trans
            .filter((t) => t.date === d && t.type === "expense")
            .reduce((a, b) => a + b.amount, 0)
        ),
      },
    ],
  };
  const categoryMap = {};
  trans
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
    });
  const pieData = {
    labels: Object.keys(categoryMap),
    datasets: [{ data: Object.values(categoryMap) }],
  };
  const today = new Date().toISOString().slice(0, 10);
  const todays = trans.filter((t) => t.date === today);
  return (
    <div>
      <div className="row mb-3">
        <SummaryCard
          title="Total Income"
          value={`${data.settings.currency}${totalIncome}`}
          variant="light"
        />
        <SummaryCard
          title="Total Expenses"
          value={`${data.settings.currency}${totalExpense}`}
          variant="light"
        />
        <SummaryCard
          title="Remaining"
          value={`${data.settings.currency}${remaining}`}
          variant="light"
        />
        <SummaryCard
          title="Savings"
          value={`${data.settings.currency}${savings}`}
          variant="light"
        />
      </div>
      <div className="row g-3">
        <div className="col-md-8">
          <div className="card p-3 mb-3">
            <h5>Monthly Trend</h5>
            <Bar data={monthlyData} />
          </div>
          <div className="card p-3">
            <h5>Today's Expenses</h5>
            <div className="list-group list-group-flush">
              {todays.length === 0 ? (
                <div className="text-muted p-3">No expenses today</div>
              ) : (
                todays.map((t) => (
                  <div
                    key={t.id}
                    className="list-group-item d-flex justify-content-between align-items-start"
                  >
                    <div>
                      <div className="fw-bold">{t.category}</div>
                      <div className="text-muted small">{t.description}</div>
                    </div>
                    <div className="text-end">
                      {data.settings.currency}
                      {t.amount}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 mb-3">
            <h5>Category Split</h5>
            <Pie data={pieData} />
          </div>
          <div className="card p-3">
            <h5>Date Filter</h5>
            <div className="d-flex gap-1">
              <input type="date" className="form-control" />
              <input type="date" className="form-control" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
