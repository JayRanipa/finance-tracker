import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const navigate = useNavigate();
const user = JSON.parse(
  localStorage.getItem("user")
);
  const [transactions, setTransactions] = useState([]);

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

  const totalTransactions = transactions.length;

  const totalIncome = transactions
    .filter((t) => t.type === "Income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = totalIncome - totalExpense;

  const currentBudget =
    Number(localStorage.getItem("budget")) || 20000;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "40px",
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
          cursor: "pointer",
          marginBottom: "30px",
        }}
      >
        ← Back to Dashboard
      </button>

      <div
        style={{
          width: "100%",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: "42px",
            marginBottom: "30px",
          }}
        >
          👤 My Profile
        </h1>

        {/* Profile Header */}
        <div
          style={{
            background: "#1e293b",
            borderRadius: "25px",
            padding: "40px",
            display: "flex",
            flexWrap: "wrap",
            gap: "40px",
            alignItems: "center",
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              background:
                "linear-gradient(135deg,#8b5cf6,#3b82f6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "60px",
              fontWeight: "bold",
            }}
          >
            J
          </div>

          {/* User Details */}
          <div style={{ flex: 1 }}>
            <h2
              style={{
                fontSize: "32px",
                marginBottom: "10px",
              }}
            >
             {user?.name || "User"}
            </h2>

            <p
              style={{
                color: "#94a3b8",
                fontSize: "18px",
              }}
            >
             {user?.email}
            </p>

            <p
              style={{
                marginTop: "10px",
                color: "#94a3b8",
              }}
            >
              Finance Tracker Premium User
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          <div style={cardStyle}>
            <h3>Total Transactions</h3>
            <h1>{totalTransactions}</h1>
          </div>

          <div style={cardStyle}>
            <h3>Total Income</h3>
            <h1>₹{totalIncome}</h1>
          </div>

          <div style={cardStyle}>
            <h3>Total Expenses</h3>
            <h1>₹{totalExpense}</h1>
          </div>

          <div style={cardStyle}>
            <h3>Current Budget</h3>
            <h1>₹{currentBudget}</h1>
          </div>

          <div style={cardStyle}>
            <h3>Current Balance</h3>
            <h1>₹{balance}</h1>
          </div>
        </div>

        {/* Actions */}
        <div
          style={{
            marginTop: "40px",
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <button style={btnStyle}>
            🔒 Change Password
          </button>

         <button
  onClick={() => {
    localStorage.removeItem("user");
    window.location.href = "/auth";
  }}
  style={{
    ...btnStyle,
    background: "#ef4444",
  }}
>
  🚪 Logout
</button>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#1e293b",
  padding: "25px",
  borderRadius: "20px",
  textAlign: "center",
  transition: "0.3s",
};

const btnStyle = {
  background: "#8b5cf6",
  color: "white",
  border: "none",
  padding: "15px 25px",
  borderRadius: "12px",
  cursor: "pointer",
  fontSize: "16px",
};

export default Profile;