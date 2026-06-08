import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Budget() {
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([]);
  const [budget, setBudget] = useState(
    Number(localStorage.getItem("budget")) || 20000
  );

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(
        "https://finance-tracker-backend-1yx2.onrender.com/api/transactions"
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

  const percentage =
    budget > 0
      ? Math.min((spent / budget) * 100, 100)
      : 0;

  const saveBudget = () => {
    localStorage.setItem("budget", budget);
    alert("Budget Saved ✅");
  };

  return (
    <div
      style={{
        background: "#0f172a",
        minHeight: "100vh",
        color: "white",
        padding: "30px",
      }}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        style={{
          background: "transparent",
          color: "white",
          border: "none",
          fontSize: "18px",
          marginBottom: "20px",
          cursor: "pointer",
        }}
      >
        ← Back to Dashboard
      </button>

      <h1>🎯 Budget Planner</h1>

      {/* Budget Input Card */}
      <div
        style={{
          background: "#1e293b",
          padding: "20px",
          borderRadius: "15px",
          marginBottom: "30px",
          maxWidth: "400px",
        }}
      >
        <h3>Set Monthly Budget</h3>

        <input
          type="number"
          value={budget}
          onChange={(e) =>
            setBudget(Number(e.target.value))
          }
          style={{
            padding: "12px",
            width: "100%",
            borderRadius: "10px",
            border: "none",
            marginTop: "10px",
          }}
        />

        <button
          onClick={saveBudget}
          style={{
            marginTop: "15px",
            width: "100%",
          }}
        >
          Save Budget
        </button>
      </div>

      {/* Summary Cards */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div style={cardStyle}>
          <h3>💰 Budget</h3>
          <h1>₹{budget}</h1>
        </div>

        <div style={cardStyle}>
          <h3>📉 Spent</h3>
          <h1>₹{spent}</h1>
        </div>

        <div style={cardStyle}>
          <h3>📈 Remaining</h3>
          <h1>₹{remaining}</h1>
        </div>
      </div>

      {/* Progress Section */}
      <div
        style={{
          marginTop: "30px",
          background: "#1e293b",
          padding: "20px",
          borderRadius: "15px",
        }}
      >
        <h3>Budget Usage</h3>

        <div
          style={{
            width: "100%",
            height: "20px",
            background: "#334155",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${percentage}%`,
              height: "100%",
              background:
                percentage > 80
                  ? "#ef4444"
                  : "#22c55e",
              transition: "0.4s",
            }}
          />
        </div>

        <p style={{ marginTop: "10px" }}>
          {percentage.toFixed(0)}% Used
        </p>

        {spent > budget && (
          <h3
            style={{
              color: "#ef4444",
              marginTop: "15px",
            }}
          >
            ⚠ Budget Exceeded
          </h3>
        )}
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#1e293b",
  padding: "20px",
  borderRadius: "15px",
  width: "250px",
  textAlign: "center",
};

export default Budget;