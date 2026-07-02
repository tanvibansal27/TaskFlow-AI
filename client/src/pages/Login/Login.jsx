import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import toast from "react-hot-toast";
import "./Login.css";

import {
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaArrowRight,
} from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = await loginUser(formData);

    console.log("LOGIN RESPONSE:", data);

    const userData = {
      ...data.user,
      token: data.token,
    };

    console.log("USER TO SAVE:", userData);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", data.token);
    console.log("AFTER SAVE:", localStorage.getItem("user"));

    toast.success(data.message);
    alert(localStorage.getItem("user"));
    navigate("/dashboard");

  } catch (error) {
    console.log(error.response?.data);
    toast.error(error.response?.data?.message || "Login Failed");
  }
};
  return (
    <div className="register-page">
      <div className="register-container">

        <div className="register-left">
          <span className="tag">🚀 Welcome Back</span>

          <h1>
            Login to <span>TaskFlow AI</span>
          </h1>

          <p>
            Continue managing your projects with AI-powered workflow management.
          </p>
        </div>

        <div className="register-right">

          <h2>Login</h2>

          <p>Welcome back!</p>

          <form onSubmit={handleSubmit}>

            <div className="input-box">
              <FaEnvelope className="icon" />
              <input
                type="email"
                name="email"
                placeholder="Email"
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

            <button className="register-btn" type="submit">
              Login
              <FaArrowRight />
            </button>

          </form>

          <div className="divider">
            <span>OR</span>
          </div>

          <button className="google-btn">
            <FaGoogle />
            Continue with Google
          </button>

          <p className="login-link">
            Don't have an account?
            <Link to="/register"> Register</Link>
          </p>

        </div>

      </div>
    </div>
  );
};

export default Login;