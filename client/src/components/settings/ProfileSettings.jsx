import { useState } from "react";
import "./SettingsComponents.css";

const ProfileSettings = () => {

  const [form, setForm] = useState({
    name: "Tanvi Bansal",
    email: "tanvi2710@gmail.com",
    avatar: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    alert("Profile Updated Successfully!");
  };

  return (
    <div className="settings-card">

      <h2>👤 Profile Information</h2>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <input
        type="text"
        name="avatar"
        placeholder="Avatar URL"
        value={form.avatar}
        onChange={handleChange}
      />

      <button onClick={handleSave}>
        Save Changes
      </button>

    </div>
  );
};

export default ProfileSettings;