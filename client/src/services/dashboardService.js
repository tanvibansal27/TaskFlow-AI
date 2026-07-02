import axios from "axios";

const API = "https://taskflow-ai-9ln0.onrender.com/api/dashboard";

const getToken = () => localStorage.getItem("token");

export const getDashboard = async () => {
  const res = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return res.data;
};