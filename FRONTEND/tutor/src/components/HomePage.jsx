import React from "react";
import "./HomePage.css"; // Your CSS

const HomePage = ({ onNavigate }) => {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            Find Your Perfect <span>Home Tutor</span>
          </h1>
          <p>
            Connect with qualified tutors in your area. Learn at your own pace,
            in the comfort of your home with personalized one-on-one sessions.
          </p>
          <div className="hero-buttons">
            <button onClick={() => onNavigate("register")} className="btn-primary">
              Get Started Today
            </button>
            <button onClick={() => onNavigate("about")} className="btn-secondary">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="section-header">
          <h2>Why Choose Us?</h2>
          <p>We provide the best platform to connect students with qualified tutors</p>
        </div>

        <div className="feature-grid">
          <div className="feature-card blue">
            <h3>Qualified Tutors</h3>
            <p>All our tutors are verified professionals with proven teaching experience.</p>
          </div>

          <div className="feature-card green">
            <h3>Flexible Timing</h3>
            <p>Schedule sessions at your convenience with 24/7 availability.</p>
          </div>

          <div className="feature-card orange">
            <h3>Guaranteed Results</h3>
            <p>Personalized learning approach designed to help you achieve your goals.</p>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats">
        <div className="section-header">
          <h2>Our Impact</h2>
        </div>

        <div className="stats-grid">
          <div className="stat">
            <div className="number blue">500+</div>
            <div className="label">Happy Students</div>
          </div>
          <div className="stat">
            <div className="number green">100+</div>
            <div className="label">Qualified Tutors</div>
          </div>
          <div className="stat">
            <div className="number orange">50+</div>
            <div className="label">Subjects Covered</div>
          </div>
          <div className="stat">
            <div className="number purple">98%</div>
            <div className="label">Success Rate</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>Ready to Start Learning?</h2>
        <p>Join thousands of students who have improved their grades with our tutoring platform</p>
        <button onClick={() => onNavigate("register")} className="btn-primary">
          Start Your Journey
        </button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <span>Home Tutor Finder</span>
            </div>
            <p>Connecting students with qualified tutors for personalized learning experiences.</p>
          </div>

          <div>
            <h4>For Students</h4>
            <ul>
              <li>Find Tutors</li>
              <li>Book Sessions</li>
              <li>Track Progress</li>
              <li>Reviews</li>
            </ul>
          </div>

          <div>
            <h4>For Tutors</h4>
            <ul>
              <li>Join as Tutor</li>
              <li>Manage Schedule</li>
              <li>Student Management</li>
              <li>Earnings</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Home Tutor Finder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
