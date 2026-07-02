import { useEffect, useState } from "react";
import "./CreateProjectModal.css";

const CreateProjectModal = ({
  project,
  onClose,
  onSave,
}) => {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Planning",
  });

  useEffect(() => {

    if (project) {
      setFormData({
        title: project.title,
        description: project.description,
        priority: project.priority,
        status: project.status,
      });
    }

  }, [project]);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Project title is required");
      return;
    }

    onSave(formData);

  };

  return (

    <div className="modal-overlay">

      <div className="modal">

        <h2>
          {project ? "Edit Project" : "Create Project"}
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={formData.title}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
          />

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option>Planning</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

          <div className="modal-buttons">

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
            >
              {project ? "Update" : "Save"}
            </button>

          </div>

        </form>

      </div>

    </div>

  );
};

export default CreateProjectModal;