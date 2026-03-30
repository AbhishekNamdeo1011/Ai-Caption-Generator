import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../component/Login";
import CaptionGenerator from "../component/CaptionGenerator";

function AppRoutes({ isAuthenticated, setIsAuthenticated }) {
  return (
    <Routes>
      {/* Default route */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/caption" />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* Login route */}
      <Route
        path="/login"
        element={<Login onAuthSuccess={() => setIsAuthenticated(true)} />}
      />

      {/* Protected Caption Generator */}
      <Route
        path="/caption"
        element={
          isAuthenticated ? (
            <CaptionGenerator setIsAuthenticated={setIsAuthenticated} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<h2>404 - Page Not Found</h2>} />
    </Routes>
  );
}

export default AppRoutes;
