import axios from "axios";

const API = "http://localhost:5000/api/admin";

const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.token;
};

/* ================= USERS ================= */

export const getAllUsers = () => {
  return axios.get(`${API}/users`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
};

export const deleteUser = (id) => {
  return axios.delete(`${API}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
};

export const updateUserStatus = (id, status) => {
  return axios.put(
    `${API}/users/${id}/status`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );
};

/* ================= ANALYTICS ================= */

export const getAnalytics = () => {
  return axios.get(`${API}/analytics`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
};