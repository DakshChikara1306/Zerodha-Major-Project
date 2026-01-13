import { useEffect, useState } from "react";
import api from "../api";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    api
      .get("/me")
      .then(() => {
        // ✅ token valid
        setAuthorized(true);
      })
      .catch(() => {
        // ❌ token invalid
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
    const landing = process.env.REACT_APP_LANDING_URL;
    window.location.href = landing
      ? `${landing}/login`
      : "/login";
    return null;
  }

  // ✅ AUTHORIZED → render dashboard
  return children;
};

export default ProtectedRoute;
