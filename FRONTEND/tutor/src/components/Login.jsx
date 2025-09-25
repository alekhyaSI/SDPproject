import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

// Vite backend URL
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Input change handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit login form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/user/login`, formData);
      const user = response.data;

      if (!user.id) {
        alert("Login failed: No user ID returned from backend!");
        console.error("Invalid login response:", user);
        return;
      }

      alert("Login successful!");
      console.log("Logged in user:", user);

      // Save user in localStorage
      localStorage.setItem("user", JSON.stringify(user));

    } catch (err) {
      console.error("Login failed:", err);
      if (err.response && err.response.data) {
        alert(`Login failed: ${err.response.data}`);
      } else {
        alert("Invalid email or password!");
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