import axios from "axios";

/* ✅ UPDATED BASE URL */
const BASE_URL = "https://bizbrain-ai.onrender.com";

/* ✅ DATA API */
const API_URL = `${BASE_URL}/api/data`;

export const uploadBusinessData = async (file) => {
  // 🔥 Get token from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const token = storedUser?.token;

  const formData = new FormData();
  formData.append("file", file);

  return axios.post(API_URL, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    }
  });
};