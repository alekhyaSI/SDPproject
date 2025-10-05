import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("student");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    qualification: "",
    adminCode: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setFormData({ ...formData, qualification: "", adminCode: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      alert("Please fill all required fields!");
      return;
    }

    // Ensure VITE_BACKEND_URL = http://localhost:2025
    const BASE_URL = import.meta.env.VITE_BACKEND_URL;

    try {
      const response = await axios.post(
        `${BASE_URL}/api/user/register`, // <-- corrected endpoint
        { ...formData, role },
        { withCredentials: true }       // <-- ensures cookies sent if needed
      );

      alert("Registered successfully");
      console.log("Registered User: ", response.data);
      navigate("/login");
    } catch (err) {
      console.error("Error during registration:", err);
      if (err.response && err.response.data) {
        alert(`Registration failed: ${err.response.data.message || err.response.data}`);
      } else {
        alert("Registration failed! Check backend server.");
      }
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <label>
          Role:
          <select value={role} onChange={handleRoleChange}>
            <option value="student">Student</option>
            <option value="tutor">Tutor</option>
            <option value="admin">Admin</option>
          </select>
        </label>

        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </label>

        {role === "tutor" && (
          <label>
            Qualification:
            <input
              type="text"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
            />
          </label>
        )}

        {role === "admin" && (
          <label>
            Admin Code:
            <input
              type="text"
              name="adminCode"
              value={formData.adminCode}
              onChange={handleChange}
            />
          </label>
        )}

        <button type="submit" className="register-btn">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
