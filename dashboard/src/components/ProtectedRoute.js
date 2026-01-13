import { useEffect, useState } from "react";
import api from "../api";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/me").finally(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p style={{ padding: "20px" }}>Redirecting to login...</p>;
  }

  // 🔥 Explicit redirect
  const landing = process.env.REACT_APP_LANDING_URL;
  window.location.href = landing
    ? `${landing}/login`
    : "/login";

  return null;
};

export default ProtectedRoute;
