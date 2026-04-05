import axios from "axios";

export const getReports = () => {
  const token = JSON.parse(localStorage.getItem("user"))?.token;

  return axios.get(
    "http://localhost:5000/api/reports",
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};