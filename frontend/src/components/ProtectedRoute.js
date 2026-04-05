import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // 🚫 Not logged in
  if (!user || !user.token) {
    return <Navigate to="/login" replace />;
  }

  // 🚫 Role mismatch
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  // ✅ Access granted
  return children;
};

export default ProtectedRoute;