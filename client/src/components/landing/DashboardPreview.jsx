import "./DashboardPreview.css";

const DashboardPreview = () => {
  return (
    <section
  id="preview"
  className="dashboard-preview"
>

      <div className="preview-header">

        <span className="preview-tag">
          📊 Dashboard Preview
        </span>

        <h2>
          Experience the <span>TaskFlow AI</span> Dashboard
        </h2>

        <p>
          Create projects, manage tasks, track productivity and stay
          organized from one beautiful dashboard.
        </p>

      </div>

      <div className="preview-image">

        <img
          src="/images/dashboard-preview.png"
          alt="TaskFlow AI Dashboard"
        />

      </div>

    </section>
  );
};

export default DashboardPreview;