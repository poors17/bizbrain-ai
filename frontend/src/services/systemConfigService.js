import axios from "axios";
import BASE_URL from "../api";

export const getConfig = () =>
  axios.get(`${BASE_URL}/api/system-config`);

export const updateConfig = (data) =>
  axios.put(`${BASE_URL}/api/system-config`, data);