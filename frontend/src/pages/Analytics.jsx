import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";

function Analytics() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (user?.id) {
      fetchTransactions();
    }
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(
        `https://finance-tracker-backend-1yx2.onrender.com/api/transactions/${user.id}`
      );

      setTransactions(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const chartData = transactions.map((item) => ({
    name: item.category,
    value: item.amount,
  }));

  const COLORS = [
    "#8b5cf6",
    "#22c55e",
    "#ef4444",
    "#3b82f6",
    "#f59e0b",
    "#ec4899",
    "#14b8a6",
  ];

  return (
    <div
      style={{
        background: "#0f172a",
        minHeight: "100vh",
        color: "white",
        padding: "20px",
      }}
    >
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

      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        📊 Analytics
      </h1>

      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          margin: "0 auto",
          background: "#1e293b",
          borderRadius: "20px",
          padding: "20px",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "400px",
          }}
        >
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                outerRadius="80%"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[index % COLORS.length]
                    }
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div
        style={{
          marginTop: "30px",
          maxWidth: "900px",
          marginInline: "auto",
        }}
      >
        <h2>Transaction Summary</h2>

        {transactions.map((item) => (
          <div
            key={item._id}
            style={{
              background: "#1e293b",
              padding: "15px",
              borderRadius: "10px",
              marginTop: "10px",
            }}
          >
            <h3>{item.category}</h3>

            <p>
              {item.type} - ₹{item.amount}
            </p>

            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Analytics;