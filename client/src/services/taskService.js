import axios from "axios";

const API = "https://taskflow-ai-9ln0.onrender.com/api/tasks";
const getToken = () => {
  return localStorage.getItem("token");
};

// Get Tasks of a Project
export const getTasks = async (projectId) => {
  const res = await axios.get(`${API}/${projectId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return res.data;
};

// Create Task
export const createTask = async (task) => {
  const res = await axios.post(API, task, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return res.data;
};

// Update Task
export const updateTask = async (id, task) => {
  const res = await axios.put(`${API}/${id}`, task, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return res.data;
};

// Delete Task
export const deleteTask = async (id) => {
  const res = await axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return res.data;
};

export const getAllTasks = async () => {
  const res = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  return res.data;
};