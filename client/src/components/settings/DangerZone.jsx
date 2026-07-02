import "./SettingsComponents.css";

const DangerZone = () => {

  const handleDelete = () => {

    if (
      window.confirm(
        "Delete your account permanently?"
      )
    ) {
      alert("Account Deleted");
    }

  };

  return (

    <div className="settings-card danger-zone">

      <h2>🚨 Danger Zone</h2>

      <p>

        Deleting your account will permanently remove all your projects and tasks.

      </p>

      <button
        className="delete-btn"
        onClick={handleDelete}
      >
        Delete Account
      </button>

    </div>

  );

};

export default DangerZone;