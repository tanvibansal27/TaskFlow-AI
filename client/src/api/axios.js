import axios from "axios";

const API = axios.create({
  baseURL: "https://taskflow-ai-9ln0.onrender.com/api",
});

export default API;