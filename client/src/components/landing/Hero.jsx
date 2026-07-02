import "./Hero.css";
import { FaArrowRight, FaPlay } from "react-icons/fa";
import dashboard from "../../assets/images/dashboard.png";
import { useNavigate } from "react-router-dom";
import heroWorkspace from "../../assets/images/hero-workspace.png";
export default function Hero() {
  const navigate = useNavigate();
  return (
    <section className="hero">

      <div className="hero-left">

        <span className="badge">
          🚀 Smart Project Management
        </span>

        <h1>
          Manage Projects <br />
          Smarter with <span>TaskFlow AI</span>
        </h1>

        <p>
          Organize projects, assign tasks, collaborate with your
          team and track progress—all from one beautiful dashboard.
        </p>

        <div className="hero-buttons">

          <button
            className="primary-btn"
            onClick={() => navigate("/register")}
          >
            Get Started
            <FaArrowRight />
          </button>

          <button
  className="secondary-btn"
  onClick={() =>
    document.getElementById("preview")?.scrollIntoView({
      behavior: "smooth",
    })
  }
>
  <FaPlay />
  View Dashboard
</button>

        </div>

        <div className="users">

          <div className="avatars">
            <div className="avatar">A</div>
            <div className="avatar">T</div>
            <div className="avatar">S</div>
          </div>

          <p>
            Trusted by <strong>10,000+</strong> teams worldwide
          </p>

        </div>

      </div>

      <div className="hero-right">
  <img
    src={heroWorkspace}
    alt="TaskFlow AI Workspace"
  />
</div>

    </section>
  );
}