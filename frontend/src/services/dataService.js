import axios from "axios";

const API_URL = "https://bizbrain-ai-production.up.railway.app/api/data";

export const uploadBusinessData = async (file) => {
  // 🔥 Get token from user object
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