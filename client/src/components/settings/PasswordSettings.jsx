import { useState } from "react";
import "./SettingsComponents.css";

const PasswordSettings = () => {

  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const handleChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {

    if (passwords.newPass !== passwords.confirm) {
      return alert("Passwords do not match");
    }

    alert("Password Updated!");

  };

  return (

    <div className="settings-card">

      <h2>🔒 Change Password</h2>

      <input
        type="password"
        name="current"
        placeholder="Current Password"
        onChange={handleChange}
      />

      <input
        type="password"
        name="newPass"
        placeholder="New Password"
        onChange={handleChange}
      />

      <input
        type="password"
        name="confirm"
        placeholder="Confirm Password"
        onChange={handleChange}
      />

      <button onClick={handleSave}>
        Update Password
      </button>

    </div>

  );

};

export default PasswordSettings;