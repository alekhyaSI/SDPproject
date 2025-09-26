import React from "react";
import { useNavigate } from "react-router-dom";
import "./StudentDashBoard.css";

const StudentDashboard = () => {
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
          <h1>Welcome Back!</h1>
          <p>
            Find the perfect tutor, book your sessions, and track your learning
            progress.
          </p>
        </section>

        {/* Dashboard Cards */}
        <section className="dashboard-cards">
          <div className="card">
            <h3>My Profile</h3>
            <p>Update your personal information and preferences.</p>
            <button onClick={() => navigate("/student-profile")}>
              Go to Profile
            </button>
          </div>

          <div className="card">
            <h3>My Bookings</h3>
            <p>See all your scheduled sessions at a glance.</p>
            <button onClick={() => navigate("/my-bookings")}>
              Go to My Bookings
            </button>
          </div>

          <div className="card">
            <h3>Find Tutors</h3>
            <p>Search and book tutors for your subjects.</p>
            <button onClick={() => navigate("/find-tutors")}>
              Find Tutors
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default StudentDashboard;