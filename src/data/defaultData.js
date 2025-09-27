export const defaultData = {
  currency: "₹",
  profile: { name: "Dashrath", email: "dashrath@mailinator.com" },
  transactions: [
    {
      id: 1,
      type: "income",
      amount: 50000,
      category: "Salary",
      date: "2025-09-01",
      description: "Augut salary",
    },
    {
      id: 2,
      type: "expense",
      amount: 10000,
      category: "Rent",
      date: "2025-09-02",
      description: "August rent",
    },
    {
      id: 3,
      type: "expense",
      amount: 1200,
      category: "Groceries",
      date: "2025-09-05",
      description: "Weekly groceries",
    }
  ],
  budgets: { Groceries: 8000, Rent: 12500 },
  settings: { currency: "₹" },
};
