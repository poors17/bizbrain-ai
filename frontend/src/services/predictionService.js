import axios from "axios";

export const runPrediction = (file) => {
  const storedData = JSON.parse(localStorage.getItem("user"));
  const token = storedData?.token;

  const formData = new FormData();
  formData.append("file", file);

  return axios.post(
    "http://localhost:5000/api/prediction",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};