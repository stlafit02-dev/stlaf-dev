import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "https://stlaf-api-qlu3.onrender.com/api" || "http://http://localhost:5173/",
    headers: {
        "Content-Type": "application/json"
    }
});

api.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;