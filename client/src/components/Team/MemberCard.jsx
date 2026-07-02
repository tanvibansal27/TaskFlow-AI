import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaUserTie,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import "./MemberCard.css";

const MemberCard = ({
  member,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="member-card">

      <div className="member-avatar">

        {member.avatar ? (
          <img
            src={member.avatar}
            alt={member.name}
          />
        ) : (
          <div className="avatar-placeholder">
            {member.name.charAt(0).toUpperCase()}
          </div>
        )}

      </div>

      <h2>{member.name}</h2>

      <span
        className={`status ${member.status.toLowerCase()}`}
      >
        {member.status}
      </span>

      <div className="member-info">

        <p>
          <FaUserTie /> {member.role}
        </p>

        <p>
          <FaEnvelope /> {member.email}
        </p>

        <p>
          <FaPhone /> {member.phone}
        </p>

      </div>

      <div className="member-actions">

        <button
          className="edit-btn"
          onClick={() => onEdit(member)}
        >
          <FaEdit /> Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(member._id)}
        >
          <FaTrash /> Delete
        </button>

      </div>

    </div>
  );
};

export default MemberCard;