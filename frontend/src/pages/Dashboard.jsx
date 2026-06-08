import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/sidebar";


function Dashboard() {
  const user = JSON.parse(
  localStorage.getItem("user")
);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
  const user = localStorage.getItem("user");

  if (!user) {
    window.location.href = "/auth";
  }

  fetchTransactions();
}, []);

  const [transactions, setTransactions] = useState([]);

  const [type, setType] = useState("Income");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");


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

  const addTransaction = async (e) => {
  e.preventDefault();

  try {
    await axios.post(
      "https://finance-tracker-backend-1yx2.onrender.com/api/transactions/add",
      {
        userId: user._id,
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
  `https://finance-tracker-backend-1yx2.onrender.com/api/transactions/${id}`
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
  const budget =
  Number(localStorage.getItem("budget")) || 20000;

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
          padding: "50px",
maxWidth: "1600px",
width: "100%",
margin: "0 auto"
        }}
      >
        <div style={{ marginBottom: "40px" }}>
  <h1
    style={{
      fontSize: "50px",
      fontWeight: "700",
      marginBottom: "10px",
    }}
  >
   
  Welcome Back, {user?.name} 👋

  </h1>

  <p
    style={{
      color: "#94a3b8",
      fontSize: "18px",
    }}
  >
    Track. Save. Grow.
  </p>
</div>

        {/* Cards */}
        <div
  style={{
    display: "grid",
   gridTemplateColumns:
  "repeat(auto-fit,minmax(250px,1fr))",

    gap: "25px",
    marginTop: "20px",
  }}
>
  <div
  style={{
    ...cardStyle,
    background:
      "linear-gradient(135deg,#7c3aed,#a855f7)",
  }}
>
  <h3>💰 Balance</h3>
  <h1>₹{balance}</h1>
</div>

 <div
  style={{
    ...cardStyle,
    background:
      "linear-gradient(135deg,#7c3aed,#a855f7)",
  }}
>
    <h3>📈 Income</h3>
    <h1>₹{income}</h1>
  </div>

  <div
    style={{
      ...cardStyle,
      background:
        "linear-gradient(135deg,#dc2626,#ef4444)",
    }}
  >
    <h3>📉 Expense</h3>
    <h1>₹{expense}</h1>
  </div>

  <div
    style={{
      ...cardStyle,
      background:
        "linear-gradient(135deg,#2563eb,#3b82f6)",
    }}
  >
    <h3>🎯 Budget</h3>
    <h1>₹{budget}</h1>
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
  flex: 1,
  minWidth: "280px",
  padding: "30px",
  borderRadius: "30px",
  color: "white",
  boxShadow: "0 15px 35px rgba(0,0,0,.25)",
  transition: "0.3s",
};
export default Dashboard;