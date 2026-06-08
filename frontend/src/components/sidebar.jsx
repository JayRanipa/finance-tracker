import { Link } from "react-router-dom";

function Sidebar({ isOpen, setIsOpen }) {
  return (
    <>
      {/* Hamburger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          top: "20px",
          left: "20px",
          zIndex: 1000,
          fontSize: "24px",
          background: "#8b5cf6",
          color: "white",
          border: "none",
          borderRadius: "10px",
          padding: "10px 15px",
          cursor: "pointer",
        }}
      >
       {isOpen ? "✕" : "☰"}
      </button>

      {/* Sidebar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: isOpen ? "0" : "-300px",
          width: "300px",
          height: "100vh",
          background: "#1e293b",
          padding: "25px",
          transition: "0.3s",
          zIndex: 999,
        }}
      >
        <h2 style={{ color: "white" }}>
          💰 Finance Tracker
        </h2>

        <div style={{ marginTop: "40px" }}>
          <Link to="/" style={linkStyle}>
            🏠 Dashboard
          </Link>

          <Link to="/analytics" style={linkStyle}>
            📊 Analytics
          </Link>

          <Link to="/budget" style={linkStyle}>
            🎯 Budget
          </Link>

          <Link to="/profile" style={linkStyle}>
            👤 Profile
          </Link>
        </div>
      </div>
    </>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  display: "block",
  marginBottom: "20px",
  fontSize: "18px",
};

export default Sidebar;