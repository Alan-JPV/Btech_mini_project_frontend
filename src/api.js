import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Get all hospitals data
export const fetchHospitals = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/hospitals`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    return null;
  }
};

// Sync data between hospitals
export const syncData = async (token) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/sync`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error syncing data:", error);
    return null;
  }
};
