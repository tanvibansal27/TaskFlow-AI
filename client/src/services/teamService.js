import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/team`;

// Token Helper
const getConfig = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  console.log("USER:", user);
  console.log("TOKEN:", user?.token);

  return {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  };
};

// ============================
// Get All Members
// ============================

export const getMembers = async () => {
  const res = await axios.get(API, getConfig());
  return res.data;
};

// ============================
// Get Single Member
// ============================

export const getMember = async (id) => {
  const res = await axios.get(`${API}/${id}`, getConfig());
  return res.data;
};

// ============================
// Create Member
// ============================

export const createMember = async (member) => {
  const res = await axios.post(API, member, getConfig());
  return res.data;
};

// ============================
// Update Member
// ============================

export const updateMember = async (id, member) => {
  const res = await axios.put(
    `${API}/${id}`,
    member,
    getConfig()
  );

  return res.data;
};

// ============================
// Delete Member
// ============================

export const deleteMember = async (id) => {
  const res = await axios.delete(
    `${API}/${id}`,
    getConfig()
  );

  return res.data;
};