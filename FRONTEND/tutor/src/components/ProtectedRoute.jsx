// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

/**
 * Protects routes by checking localStorage 'user' and role(s).
 * usage: <Route element={<ProtectedRoute allowedRoles={['admin']}><AdminPage/></ProtectedRoute>} />
 */
const ProtectedRoute = ({ allowedRoles = [], children }) => {
  const raw = localStorage.getItem("user");
  if (!raw) return <Navigate to="/login" replace />;

  let user;
  try {
    user = JSON.parse(raw);
  } catch {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.length) return children; // no role restriction
  if (!user.role || !allowedRoles.includes(user.role)) {
    // unauthorized -> send to role-specific dashboard if available, else home
    if (user.role === "admin") return <Navigate to="/admin-dashboard" replace />;
    if (user.role === "tutor") return <Navigate to="/tutor-dashboard" replace />;
    if (user.role === "student") return <Navigate to="/student-dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
