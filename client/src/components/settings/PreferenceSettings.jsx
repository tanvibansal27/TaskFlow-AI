import { useState } from "react";
import "./SettingsComponents.css";

const PreferenceSettings = () => {

  const [darkMode, setDarkMode] = useState(true);

  const [emailNotify, setEmailNotify] = useState(true);

  return (

    <div className="settings-card">

      <h2>⚙ Preferences</h2>

      <label className="switch-item">

        <span>Dark Mode</span>

        <input
          type="checkbox"
          checked={darkMode}
          onChange={() =>
            setDarkMode(!darkMode)
          }
        />

      </label>

      <label className="switch-item">

        <span>Email Notifications</span>

        <input
          type="checkbox"
          checked={emailNotify}
          onChange={() =>
            setEmailNotify(!emailNotify)
          }
        />

      </label>

      <button>
        Save Preferences
      </button>

    </div>

  );

};

export default PreferenceSettings;