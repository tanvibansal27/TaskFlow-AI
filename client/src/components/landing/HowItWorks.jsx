import "./HowItWorks.css";
import {
  FaFolderOpen,
  FaTasks,
  FaChartLine,
  FaArrowRight,
} from "react-icons/fa";

const steps = [
  {
    number: "01",
    icon: <FaFolderOpen />,
    title: "Create Project",
    description:
      "Start by creating your project and organizing your workspace.",
    color: "#EEF2FF",
    iconColor: "#6366F1",
  },
  {
    number: "02",
    icon: <FaTasks />,
    title: "Assign Tasks",
    description:
      "Break your project into tasks and assign them to your team.",
    color: "#ECFDF5",
    iconColor: "#10B981",
  },
  {
    number: "03",
    icon: <FaChartLine />,
    title: "Track Progress",
    description:
      "Monitor deadlines, productivity and project completion in real time.",
    color: "#EFF6FF",
    iconColor: "#3B82F6",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="how">
      <span className="section-badge">
        🚀 HOW IT WORKS
      </span>

      <h2>
        Get Started in <span>3 Easy Steps</span>
      </h2>

      <p className="section-desc">
        From planning your first project to tracking every milestone,
        TaskFlow AI keeps your workflow simple and organized.
      </p>

      <div className="steps">

        {steps.map((step, index) => (
          <div className="step-card" key={index}>

            <div className="step-number">
              {step.number}
            </div>

            <div
              className="step-icon"
              style={{
                background: step.color,
                color: step.iconColor,
              }}
            >
              {step.icon}
            </div>

            <h3>{step.title}</h3>

            <p>{step.description}</p>

            {index !== steps.length - 1 && (
              <div className="arrow">
                <FaArrowRight />
              </div>
            )}

          </div>
        ))}

      </div>

    </section>
  );
}