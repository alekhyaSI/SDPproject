import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <nav className="top-nav"><div className="logo">TutorFinder Admin</div></nav>
      <div className="main-content">
        <section className="hero-section">
          <h1>Welcome Back, Admin!</h1>
          <p>Manage tutors, students, bookings and reports.</p>
        </section>

        <section className="dashboard-cards">
          <div className="card">
            <h3>Pending Tutors</h3>
            <button onClick={() => navigate("/admin-tutors")}>Manage Tutors</button>
          </div>
          <div className="card">
            <h3>Pending Students</h3>
            <button onClick={() => navigate("/admin-students")}>Manage Students</button>
          </div>
          <div className="card">
            <h3>Bookings</h3>
            <button onClick={() => navigate("/admin-bookings")}>Manage Bookings</button>
          </div>
          <div className="card">
            <h3>Reports</h3>
            <button onClick={() => navigate("/admin/reports")}>View Reports</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
