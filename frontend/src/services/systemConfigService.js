import axios from "axios";
import BASE_URL from "../api";

const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.token;
};

export const getConfig = () =>
  axios.get(`${BASE_URL}/api/system-config`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

export const updateConfig = (data) =>
  axios.put(`${BASE_URL}/api/system-config`, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });