import axios from "axios";

// Use environment variable for backend URL
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true, // if you use cookies for auth
});

export default axiosInstance;
