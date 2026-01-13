import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    api
      .get("/me")
      .then(() => {
        setAuthorized(true);
      })
      .catch(() => {
        setAuthorized(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p style={{ padding: "20px" }}>Checking authentication...</p>;
  }

  if (!authorized) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
