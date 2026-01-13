import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const landing = process.env.REACT_APP_LANDING_URL;
      window.location.href = landing
        ? `${landing}/login`
        : "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
