import axios from "axios";

const API_BASE_URL = process.env.VITE_BACKEND_URL || "http://localhost:5000";

// 🔹 Debugging to check if API base URL is correct
console.log("🔹 API Base URL:", API_BASE_URL);

// Fetch central hospital data
export const fetchCentralData = async () => {
  try {
    const token = localStorage.getItem("token"); // ✅ Fetch token from storage
    console.log("🔹 FRONTEND: Sending Token to /api/central-data:", token); // ✅ Debugging

    const response = await axios.get(`${API_BASE_URL}/api/central-data`, {
      headers: { Authorization: `Bearer ${token}` }, // ✅ Ensure token is sent
    });

    console.log("✅ FRONTEND: Data received from /api/central-data:", response.data); // ✅ Debugging
    return response.data;
  } catch (error) {
    console.error("❌ FRONTEND: Error fetching central data:", error.response?.data || error.message);
    return null;
  }
};
