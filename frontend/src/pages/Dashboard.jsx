import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);

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

  const income = transactions
    .filter((t) => t.type === "Income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = income - expense;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Finance Tracker Dashboard</h1>

      <h2>Total Balance: ₹{balance}</h2>
      <h3>Total Income: ₹{income}</h3>
      <h3>Total Expense: ₹{expense}</h3>

      <hr />

      <h2>Transactions</h2>

      {transactions.map((item) => (
        <div
          key={item._id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            margin: "10px 0"
          }}
        >
          <h3>{item.category}</h3>
          <p>Type: {item.type}</p>
          <p>Amount: ₹{item.amount}</p>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;