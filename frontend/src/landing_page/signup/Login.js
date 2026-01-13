import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const submit = async () => {
    try {
      setError("");

      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/login`,
        form,
        { withCredentials: true }
      );
      
      // redirect to dashboard
      window.location.href = process.env.REACT_APP_DASHBOARD_URL;
      
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3>Login</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        className="form-control mb-3"
        placeholder="Email"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        type="password"
        className="form-control mb-3"
        placeholder="Password"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button className="btn btn-primary w-100" onClick={submit}>
        Login
      </button>

      <p className="mt-3 text-center">
        New user? <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
}

export default Login;
