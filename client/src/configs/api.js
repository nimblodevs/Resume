import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// Response Interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      // Clear auth state and redirect to login
      localStorage.removeItem("token");
      window.location.href = "/";
      toast.error("Session expired. Please login again.");
    }
    // Handle 403 Forbidden
    else if (error.response?.status === 403) {
      toast.error("You don't have permission to access this resource.");
    }
    // Handle 404 Not Found
    else if (error.response?.status === 404) {
      toast.error("Resource not found.");
    }
    // Handle 500 Server Error
    else if (error.response?.status === 500) {
      toast.error("Server error. Please try again later.");
    }
    // Handle network errors
    else if (!error.response) {
      toast.error("Network error. Please check your connection.");
    }

    return Promise.reject(error);
  }
);

export default api;
