import { useState } from "react";
import axios from "axios";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const res = await axios.post(
          "https://finance-tracker-backend-1yx2.onrender.com/api/auth/login",
          {
            email,
            password,
          }
        );

        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );

        alert("Login Successful ✅");

        window.location.href = "/";
      } else {
        await axios.post(
          "https://finance-tracker-backend-1yx2.onrender.com/api/auth/register",
          {
            name,
            email,
            password,
          }
        );

        localStorage.setItem(
          "user",
          JSON.stringify({
            name,
            email,
          })
        );

        alert("Registration Successful ✅");

        window.location.href = "/";
      }
    } catch (err) {
      const message =
        err.response?.data?.message;

      if (
        message === "User not found"
      ) {
        alert(
          "Account not found. Please register."
        );

        setIsLogin(false);
      } else {
        alert(message || "Something went wrong");
      }
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0f172a,#1e293b)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          background: "#1e293b",
          borderRadius: "25px",
          padding: "40px",
          color: "white",
          boxShadow:
            "0 15px 40px rgba(0,0,0,.3)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          💎 Finance Pro
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#94a3b8",
            marginBottom: "30px",
          }}
        >
          Manage your money like a pro
        </p>

        <div
          style={{
            display: "flex",
            marginBottom: "25px",
            background: "#0f172a",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <button
            onClick={() =>
              setIsLogin(true)
            }
            style={{
              flex: 1,
              padding: "12px",
              border: "none",
              cursor: "pointer",
              background: isLogin
                ? "#8b5cf6"
                : "transparent",
              color: "white",
            }}
          >
            Login
          </button>

          <button
            onClick={() =>
              setIsLogin(false)
            }
            style={{
              flex: 1,
              padding: "12px",
              border: "none",
              cursor: "pointer",
              background: !isLogin
                ? "#8b5cf6"
                : "transparent",
              color: "white",
            }}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                style={inputStyle}
              />
              <br />
              <br />
            </>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            style={inputStyle}
          />

          <br />
          <br />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            style={inputStyle}
          />

          <br />
          <br />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              border: "none",
              borderRadius: "12px",
              background: "#8b5cf6",
              color: "white",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            {isLogin
              ? "Login"
              : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  borderRadius: "12px",
  border: "none",
  background: "#334155",
  color: "white",
  fontSize: "15px",
  boxSizing: "border-box",
};

export default Auth;