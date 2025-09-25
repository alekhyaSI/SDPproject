import React from "react";
import "./Nav.css"; // attach CSS
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="logo">Home Tutor Finder</h1>
      </div>
      <div className="navbar-right">
        <li>About Us</li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
      </div>
    </nav>
  );
};

export default Nav;