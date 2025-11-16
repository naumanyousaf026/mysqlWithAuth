// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // not logged in -> redirect to login
    return <Navigate to="/login" replace />;
  }

  // logged in -> show children
  return children;
}
