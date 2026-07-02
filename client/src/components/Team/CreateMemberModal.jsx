import { useEffect, useState } from "react";
import "./CreateMemberModal.css";

const CreateMemberModal = ({
  member,
  onClose,
  onSave,
}) => {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Frontend Developer",
    department: "Development",
    status: "Active",
    avatar: "",
  });

  useEffect(() => {

    if (member) {

      setForm({
        name: member.name || "",
        email: member.email || "",
        phone: member.phone || "",
        role: member.role || "Frontend Developer",
        department: member.department || "Development",
        status: member.status || "Active",
        avatar: member.avatar || "",
      });

    }

  }, [member]);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    onSave(form);

  };

  return (

    <div className="modal-overlay">

      <div className="modal">

        <h2>

          {member ? "Edit Member" : "Add Member"}

        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="avatar"
            placeholder="Avatar URL (Optional)"
            value={form.avatar}
            onChange={handleChange}
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
          >

            <option>Frontend Developer</option>
            <option>Backend Developer</option>
            <option>Full Stack Developer</option>
            <option>UI/UX Designer</option>
            <option>Project Manager</option>
            <option>Tester</option>

          </select>

          <input
            type="text"
            name="department"
            placeholder="Department"
            value={form.department}
            onChange={handleChange}
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >

            <option>Active</option>
            <option>Inactive</option>

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
              {member ? "Update" : "Save"}
            </button>

          </div>

        </form>

      </div>

    </div>

  );

};

export default CreateMemberModal;