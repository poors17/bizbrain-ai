import axios from "axios";
import BASE_URL from "../api";

export const getReports = () => {
  const token = JSON.parse(localStorage.getItem("user"))?.token;

  return axios.get(
    `${BASE_URL}/api/reports`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};