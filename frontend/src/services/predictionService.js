import axios from "axios";
import BASE_URL from "../api";

export const runPrediction = (file) => {
  const storedData = JSON.parse(localStorage.getItem("user"));
  const token = storedData?.token;

  const formData = new FormData();
  formData.append("file", file);

  return axios.post(
    `${BASE_URL}/api/prediction`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};