import React, { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductForm from "./pages/ProductForm";
import ProductList from "./pages/ProductList";

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [showRegister, setShowRegister] = useState(false);

  // Load token from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    if (savedToken) setToken(savedToken);
  }, []);

  // Logout logic
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
  };

  // If user not logged in → show login/register toggle
  if (!token) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        {showRegister ? (
          <>
            <Register />
            <p>
              Already have an account?{" "}
              <button
                style={{ color: "#007bff", background: "none", border: "none", cursor: "pointer" }}
                onClick={() => setShowRegister(false)}
              >
                Login
              </button>
            </p>
          </>
        ) : (
          <>
            <Login onLogin={setToken} />
            <p>
              Don’t have an account?{" "}
              <button
                style={{ color: "#007bff", background: "none", border: "none", cursor: "pointer" }}
                onClick={() => setShowRegister(true)}
              >
                Register
              </button>
            </p>
          </>
        )}
      </div>
    );
  }

  // If logged in → show dashboard
  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 20 }}>
      <h1 style={{ textAlign: "center" }}>Product Dashboard</h1>
      <button
        onClick={handleLogout}
        style={{
          float: "right",
          marginBottom: 20,
          padding: "6px 10px",
          border: "1px solid #ddd",
          borderRadius: 4,
          backgroundColor: "#f8f8f8",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
      <ProductForm />
      <hr />
      <ProductList />
    </div>
  );
};

export default App;
