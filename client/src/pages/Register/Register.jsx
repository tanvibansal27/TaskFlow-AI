import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import toast from "react-hot-toast";
import "./Register.css";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaArrowRight,
} from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Register
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await registerUser(formData);

      toast.success(data.message);

      setFormData({
        name: "",
        email: "",
        password: "",
      });

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration Failed"
      );
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        {/* Left Side */}
        <div className="register-left">
          <span className="tag">🚀 AI Project Management</span>

          <h1>
            Join <span>TaskFlow AI</span>
          </h1>

          <p>
            Organize projects, manage teams, track tasks and boost
            productivity with AI-powered workflow management.
          </p>

          <div className="illustration">
            <img
              src="https://undraw.co/api/illustrations/online-collaboration.svg"
              alt="Register"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="register-right">
          <h2>Create Account</h2>

          <p>Start managing your projects smarter.</p>

          <form onSubmit={handleSubmit}>
            <div className="input-box">
              <FaUser className="icon" />

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-box">
              <FaEnvelope className="icon" />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-box">
              <FaLock className="icon" />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="register-btn">
              Create Account
              <FaArrowRight />
            </button>
          </form>

          <div className="divider">
            <span>OR</span>
          </div>

          <button className="google-btn" type="button">
            <FaGoogle />
            Continue with Google
          </button>

          <p className="login-link">
            Already have an account?

            <Link to="/login"> Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;