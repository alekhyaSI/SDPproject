// src/components/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/user/login`, formData, {
        withCredentials: true,
      });

      const message = res.data.message;
      const user = res.data.data;

      // Handle pending approval
      if (message.includes("pending admin approval")) {
        alert("Your account is pending admin approval. Please wait.");
        return;
      }

      if (!user || !user.id) {
        alert("Login failed: invalid response from server");
        return;
      }

      localStorage.setItem("user", JSON.stringify(user));

      // Redirect based on role
      if (user.role === "admin") navigate("/admin-dashboard");
      else if (user.role === "tutor") navigate("/tutor-dashboard");
      else if (user.role === "student") navigate("/student-dashboard");
      else navigate("/");

    } catch (err) {
      console.error("Login error", err);
      if (err.response?.data?.message) {
        alert(`Login failed: ${err.response.data.message}`);
      } else {
        alert("Login failed! Check backend server.");
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="login-btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
