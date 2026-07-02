import "./Features.css";

import {
  FaFolderOpen,
  FaTasks,
  FaChartBar,
  FaUsers,
  FaCalendarAlt,
  FaMagic,
  FaArrowRight,
} from "react-icons/fa";

const features = [
  {
    icon: <FaFolderOpen />,
    title: "Project Management",
    description:
      "Create, organize and manage projects in one place with ease.",
    color: "#EEF2FF",
    iconColor: "#6366F1",
  },
  {
    icon: <FaTasks />,
    title: "Task Tracking",
    description:
      "Assign tasks, monitor progress and stay on schedule.",
    color: "#ECFDF5",
    iconColor: "#10B981",
  },
  {
    icon: <FaChartBar />,
    title: "Analytics Dashboard",
    description:
      "Visualize project performance with beautiful charts.",
    color: "#EFF6FF",
    iconColor: "#3B82F6",
  },
  {
    icon: <FaUsers />,
    title: "Team Collaboration",
    description:
      "Collaborate seamlessly with your team in real time.",
    color: "#FDF2F8",
    iconColor: "#EC4899",
  },
  {
    icon: <FaCalendarAlt />,
    title: "Calendar & Timeline",
    description:
      "Track deadlines and milestones with an interactive calendar.",
    color: "#FFF7ED",
    iconColor: "#F59E0B",
  },
  {
    icon: <FaMagic />,
    title: "AI Assistant",
    description:
      "Let AI organize, prioritize and optimize your workflow.",
    color: "#F5F3FF",
    iconColor: "#8B5CF6",
  },
];

export default function Features() {
  return (
    <section id="features" className="features">

      <span className="section-badge">
        ✨ FEATURES
      </span>

      <h2>
        Everything you need to <br />
        manage projects <span>efficiently</span>
      </h2>

      <p className="section-text">
        Powerful tools to help teams plan, collaborate and deliver
        projects faster.
      </p>

      <div className="feature-grid">

        {features.map((item, index) => (
          <div className="feature-card" key={index}>

            <div
              className="feature-icon"
              style={{
                background: item.color,
                color: item.iconColor,
              }}
            >
              {item.icon}
            </div>

            <h3>{item.title}</h3>

            <p>{item.description}</p>

            <button
              onClick={() =>
                document
                  .getElementById("pricing")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
            >
              Learn More
              <FaArrowRight />
            </button>
          </div>
        ))}

      </div>
    </section>
  );
}