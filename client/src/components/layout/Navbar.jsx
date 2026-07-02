
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });

    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div
        className="logo"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        <h2>TaskFlow AI</h2>
      </div>

      <ul className={menuOpen ? "nav-links active" : "nav-links"}>
        <li>
          <button onClick={() => scrollToSection("features")}>
            Features
          </button>
        </li>

        <li>
          <button onClick={() => scrollToSection("how")}>
            How It Works
          </button>
        </li>

        <li>
          <button onClick={() => scrollToSection("preview")}>
            Dashboard
          </button>
        </li>

        <li>
          <button onClick={() => scrollToSection("about")}>
            About
          </button>
        </li>
      </ul>

      <div className="nav-buttons">
        <button
          className="login-btn"
          onClick={() => navigate("/login")}
        >
          Login
        </button>

        <button
          className="start-btn"
          onClick={() => navigate("/register")}
        >
          Get Started
        </button>
      </div>

      <div
        className="menu-icon"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
}