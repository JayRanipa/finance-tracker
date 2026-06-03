import { useEffect, useState } from "react";
import axios from "axios";

function Budget() {
  const [transactions, setTransactions] = useState([]);

  const budget = 20000;

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/transactions"
      );

      setTransactions(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const spent = transactions
    .filter((t) => t.type === "Expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const remaining = budget - spent;

  return (
    <div
      style={{
        background: "#0f172a",
        minHeight: "100vh",
        color: "white",
        padding: "30px",
      }}
    >
      <h1>🎯 Budget Tracker</h1>

      <h2>Budget: ₹{budget}</h2>
      <h2>Spent: ₹{spent}</h2>
      <h2>Remaining: ₹{remaining}</h2>

      <progress
        value={spent}
        max={budget}
        style={{
          width: "500px",
          height: "25px",
        }}
      />

      {spent > budget && (
        <h2 style={{ color: "red" }}>
          ⚠ Budget Exceeded
        </h2>
      )}
    </div>
  );
}

export default Budget;