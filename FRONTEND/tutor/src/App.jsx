// src/App.jsx
import { Routes, Route, useLocation } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import StudentDashBoard from "./components/StudentDashBoard";
import TutorDashBoard from "./components/TutorDashBoard";
import AdminDashBoard from "./components/AdminDashboard";
import HomePage from "./components/HomePage";
import Navbar from "./components/Nav";

import TutorProfile from "./components/TutorProfile";
import StudentProfile from "./components/StudentProfile";
import FindTutors from "./components/FindTutor";
import AdminManageBookings from "./components/AdminManageBooking";
import TutorMyStudents from "./components/TutorMyStudents";
import StudentViewTutor from "./components/StudentsViewTutor";
import AdminApprovals from "./components/AdminApprovals";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const location = useLocation();

  // Hide navbar on certain routes if needed
  const hideNavbarRoutes = [
    "/student-dashboard",
    "/tutor-dashboard",
    "/admin-dashboard",
  ];
  const showNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Student routes */}
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentDashBoard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student-profile"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/find-tutors"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <FindTutors />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentViewTutor />
            </ProtectedRoute>
          }
        />

        {/* Tutor routes */}
        <Route
          path="/tutor-dashboard"
          element={
            <ProtectedRoute allowedRoles={["tutor"]}>
              <TutorDashBoard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tutor-profile"
          element={
            <ProtectedRoute allowedRoles={["tutor"]}>
              <TutorProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-students"
          element={
            <ProtectedRoute allowedRoles={["tutor"]}>
              <TutorMyStudents />
            </ProtectedRoute>
          }
        />

        {/* Admin routes */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashBoard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-bookings"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminManageBookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-tutors"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminApprovals type="tutor" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-students"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminApprovals type="student" />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
