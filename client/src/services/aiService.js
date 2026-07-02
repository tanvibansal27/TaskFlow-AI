import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/ai`;

const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.token;
};

export const chatWithAI = async (prompt) => {
  const res = await axios.post(
    `${API}/chat`,
    { prompt },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return res.data;
};