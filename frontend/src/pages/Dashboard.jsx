import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);

  const [transactions, setTransactions] = useState([]);

  const [type, setType] = useState("Income");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

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

  const addTransaction = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/transactions/add",
        {
          type,
          amount: Number(amount),
          category,
          description,
        }
      );

      setAmount("");
      setCategory("");
      setDescription("");

      fetchTransactions();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/transactions/${id}`
      );

      fetchTransactions();
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
    <div
      style={{
        display: "flex",
        background: "#0f172a",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <div
        style={{
          flex: 1,
          padding: "30px",
        }}
      >
        <h1>💰 Finance Tracker Dashboard</h1>

        {/* Cards */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >
          <div style={cardStyle}>
            <h3>Balance</h3>
            <h1>₹{balance}</h1>
          </div>

          <div
            style={{
              ...cardStyle,
              background: "#22c55e",
            }}
          >
            <h3>Income</h3>
            <h1>₹{income}</h1>
          </div>

          <div
            style={{
              ...cardStyle,
              background: "#ef4444",
            }}
          >
            <h3>Expense</h3>
            <h1>₹{expense}</h1>
          </div>
        </div>

        {/* Add Transaction */}
        <div
          style={{
            background: "#1e293b",
            padding: "20px",
            marginTop: "30px",
            borderRadius: "15px",
          }}
        >
          <h2>Add Transaction</h2>

          <form onSubmit={addTransaction}>
            <select
              value={type}
              onChange={(e) =>
                setType(e.target.value)
              }
            >
              <option>Income</option>
              <option>Expense</option>
            </select>

            <br /><br />

            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value)
              }
            />

            <br /><br />

            <input
              placeholder="Category"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            />

            <br /><br />

            <input
              placeholder="Description"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
            />

            <br /><br />

            <button type="submit">
              ➕ Add Transaction
            </button>
          </form>
        </div>

        {/* Transactions */}
        <div
          style={{
            marginTop: "30px",
          }}
        >
          <h2>Recent Transactions</h2>

          {transactions.map((item) => (
            <div
              key={item._id}
              style={{
                background: "#1e293b",
                padding: "15px",
                marginTop: "10px",
                borderRadius: "10px",
              }}
            >
              <h3>{item.category}</h3>

              <p>
                Type:
                <span
                  style={{
                    color:
                      item.type === "Income"
                        ? "#22c55e"
                        : "#ef4444",
                  }}
                >
                  {" "}
                  {item.type}
                </span>
              </p>

              <p>Amount: ₹{item.amount}</p>

              <p>{item.description}</p>

              <button
                onClick={() =>
                  deleteTransaction(item._id)
                }
              >
                🗑 Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#8b5cf6",
  padding: "20px",
  borderRadius: "15px",
  width: "250px",
};

export default Dashboard;