import axios from "axios";

/**
 * Central API instance
 * - Handles cookies
 * - Handles auth expiry globally
 */
const api = axios.create({
  baseURL: "http://localhost:3002",
  withCredentials: true,
});

// Global response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Session expired or invalid
      window.location.href = "http://localhost:3001/login";
    }
    return Promise.reject(error);
  }
);

export default api;
