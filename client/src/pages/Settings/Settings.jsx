import Sidebar from "../../components/dashboard/Sidebar";
import Navbar from "../../components/dashboard/Navbar";

import ProfileSettings from "../../components/settings/ProfileSettings";
import PasswordSettings from "../../components/settings/PasswordSettings";
import PreferenceSettings from "../../components/settings/PreferenceSettings";
import DangerZone from "../../components/settings/DangerZone";

import "./Settings.css";

const Settings = () => {
  return (
    <div className="dashboard">

      <Sidebar />

      <div className="dashboard-content">

        <Navbar />

        <div className="dashboard-main">

          {/* Header */}

          <div className="settings-header">

            <h1>⚙️ Settings</h1>

            <p>
              Manage your account, security and preferences.
            </p>

          </div>

          {/* Profile */}

          <ProfileSettings />

          {/* Password */}

          <PasswordSettings />

          {/* Preferences */}

          <PreferenceSettings />

          {/* Danger Zone */}

          <DangerZone />

        </div>

      </div>

    </div>
  );
};

export default Settings;