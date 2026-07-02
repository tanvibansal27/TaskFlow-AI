import {
  FaCheckCircle,
  FaClock,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

const TaskCard = ({
  task,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="task-card">

      <div className="task-top">

        <h3>{task.title}</h3>

        <span
          className={`task-status ${task.status
            .toLowerCase()
            .replace(" ", "-")}`}
        >
          {task.status}
        </span>

      </div>

      <p>
        {task.description || "No Description"}
      </p>

      <p>
  <strong>Project :</strong>{" "}
  {task.project?.title}
</p>
      <div className="task-info">

        <div>
          <strong>Priority</strong>
          <p>{task.priority}</p>
        </div>

        <div>
          <strong>Due Date</strong>
          <p>
            {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString()
              : "No Date"}
          </p>
        </div>

      </div>

      <div className="task-actions">

        <button
          className="edit-btn"
          onClick={() => onEdit(task)}
        >
          <FaEdit />
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(task._id)}
        >
          <FaTrash />
          Delete
        </button>

      </div>

    </div>
  );
};

export default TaskCard;