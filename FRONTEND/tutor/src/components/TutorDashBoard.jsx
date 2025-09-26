import React from "react";
import { useNavigate } from "react-router-dom";
import "./TutorDashBoard.css"; // you can reuse the same CSS

const TutorDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      {/* Top Navbar */}
      <nav className="top-nav">
        <div className="logo">TutorFinder</div>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        {/* Hero Section */}
        <section className="hero-section">
          <h1>Welcome Back, Tutor!</h1>
          <p>Manage your profile, schedule, students, and earnings all in one place.</p>
        </section>

        {/* Dashboard Cards */}
        <section className="dashboard-cards">
          <div className="card">
            <h3>My Profile</h3>
            <p>Update your bio, subjects, qualifications, and fees.</p>
            <button onClick={() => navigate("/tutor-profile")}>Go to Profile</button>
          </div>

          <div className="card">
            <h3>Manage Schedule</h3>
            <p>Set your available time slots for students.</p>
            <button onClick={() => navigate("/manage-schedule")}>Manage Schedule</button>
          </div>

          <div className="card">
            <h3>My Students</h3>
            <p>View students who booked your sessions.</p>
            <button onClick={() => navigate("/my-students")}>View Students</button>
          </div>

          <div className="card">
            <h3>Earnings</h3>
            <p>Track your total income from bookings.</p>
            <button onClick={() => navigate("/earnings")}>View Earnings</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TutorDashboard;