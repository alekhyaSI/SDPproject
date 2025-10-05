// src/components/Nav.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  const navigate = useNavigate();
  const raw = localStorage.getItem("user");
  const user = raw ? JSON.parse(raw) : null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/"><h1 className="logo">Home Tutor Finder</h1></Link>
      </div>

      <div className="navbar-right">
        <Link to="/about"><li>About</li></Link>

        {!user && (
          <>
            <Link to="/login"><li>Login</li></Link>
            <Link to="/register"><li>Register</li></Link>
          </>
        )}

        {user && user.role === "student" && (
          <>
            <Link to="/student-dashboard"><li>Dashboard</li></Link>
            <Link to="/find-tutors"><li>Find Tutors</li></Link>
          </>
        )}

        {user && user.role === "tutor" && (
          <>
            <Link to="/tutor-dashboard"><li>Dashboard</li></Link>
            <Link to="/tutor-profile"><li>Profile</li></Link>
            <Link to="/my-students"><li>Students</li></Link>
          </>
        )}

        {user && user.role === "admin" && (
          <>
            <Link to="/admin-dashboard"><li>Admin</li></Link>
            <Link to="/admin-approvals"><li>Approvals</li></Link>
          </>
        )}

        {user && (
          <>
            <li style={{ cursor: "pointer" }} onClick={handleLogout}>Logout</li>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
