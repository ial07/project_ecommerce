import axios from "axios";

const api = axios.create({
  baseURL: "/api", // hit Next.js API routes
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Only add localStorage token when running on client
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
