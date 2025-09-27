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

function generateColors(n) {
  const colors = [];
  for (let i = 0; i < n; i++) {
    const hue = Math.round((i * 137.508) % 360);
    colors.push(`hsl(${hue} 70% 55%)`);
  }
  return colors;
}

export default function Dashboard() {
  const { data } = useApp();
  const trans = Array.isArray(data.transactions) ? data.transactions : [];
  const isExpense = (t) => String(t.type || "").toLowerCase() === "expense";
  const totalIncome = trans
    .filter((t) => String(t.type || "").toLowerCase() === "income")
    .reduce((a, b) => a + Number(b.amount || 0), 0);
  const totalExpense = trans.filter(isExpense).reduce((a, b) => a + Number(b.amount || 0), 0);
  const remaining = totalIncome - totalExpense;
  const savings = Math.max(0, remaining);
  const days = [...new Set(trans.map((t) => t.date))].sort();
  const monthlyData = {
    labels: days,
    datasets: [
      {
        label: "Spending",
        data: days.map((d) =>
          trans.filter((t) => t.date === d && isExpense(t)).reduce((a, b) => a + Number(b.amount || 0), 0)
        ),
        backgroundColor: "rgba(54, 162, 235, 0.7)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };
  const categoryMap = {};
  trans.filter(isExpense).forEach((t) => {
    const cat = (t.category || "Uncategorized").trim();
    if (cat) categoryMap[cat] = (categoryMap[cat] || 0) + Number(t.amount || 0);
  });
  const entries = Object.entries(categoryMap).filter(([, v]) => v > 0);
  const pieLabels = entries.map(([k]) => k);
  const pieValues = entries.map(([, v]) => v);
  const pieColors = generateColors(pieLabels.length);
  const pieData = {
    labels: pieLabels,
    datasets: [
      {
        data: pieValues,
        backgroundColor: pieColors,
        borderWidth: 1,
      },
    ],
  };
  const today = new Date().toISOString().slice(0, 10);
  const todays = trans.filter((t) => t.date === today);
  return (
    <div>
      <div className="row mb-3">
        <SummaryCard title="Total Income" value={`${data.settings?.currency || "₹"}${totalIncome}`} variant="light" />
        <SummaryCard title="Total Expenses" value={`${data.settings?.currency || "₹"}${totalExpense}`} variant="light" />
        <SummaryCard title="Remaining" value={`${data.settings?.currency || "₹"}${remaining}`} variant="light" />
        <SummaryCard title="Savings" value={`${data.settings?.currency || "₹"}${savings}`} variant="light" />
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
                  <div key={t.id} className="list-group-item d-flex justify-content-between align-items-start">
                    <div>
                      <div className="fw-bold">{t.category || "Uncategorized"}</div>
                      <div className="text-muted small">{t.description}</div>
                    </div>
                    <div className="text-end">
                      {data.settings?.currency || "₹"}
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
            {pieLabels.length === 0 ? (
              <div className="text-muted p-3">No expense categories yet</div>
            ) : (
              <Pie data={pieData} />
            )}
          </div>

          <div className="card p-3">
            <h5>Date Filter</h5>
            <div className="row g-2">
              <div className="col-6">
                <input className="form-control" type="date" />
              </div>
              <div className="col-6">
                <input className="form-control" type="date" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
