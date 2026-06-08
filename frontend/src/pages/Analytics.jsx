import { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import { useNavigate } from "react-router-dom";

function Analytics() {
  const navigate = useNavigate();
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
  ];

  return (
    <div
      style={{
        background: "#0f172a",
        minHeight: "100vh",
        color: "white",
        padding: "30px",
      }}
    >
      <button
  onClick={() => navigate("/")}
  style={{
    background:"transparent",
    color:"white",
    border:"none",
    fontSize:"18px",
    marginBottom:"20px",
    cursor:"pointer"
  }}
>
  ← Back to Dashboard
</button>

      <h1>📊 Analytics</h1>

      <PieChart width={500} height={500}>
        <Pie
          data={chartData}
          dataKey="value"
          outerRadius={150}
          label
        >
          {chartData.map((entry, index) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>

        <Tooltip />
      </PieChart>
    </div>
  );
}

export default Analytics;