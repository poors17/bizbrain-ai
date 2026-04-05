import axios from "axios";

export const getConfig = () =>
  axios.get("/api/system-config");

export const updateConfig = (data) =>
  axios.put("/api/system-config", data);