import "./Footer.css";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";

export default function Footer() {

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <footer id="about" className="footer">

      <div className="footer-container">

        <div className="footer-about">

          <h2>TaskFlow AI</h2>

          <p>
            Modern project management platform that helps teams
            collaborate, organize and deliver projects faster.
          </p>

          <div className="socials">

            <a href="#"><FaFacebookF /></a>

            <a href="#"><FaInstagram /></a>

            <a href="#"><FaLinkedinIn /></a>

            <a href="#"><FaGithub /></a>

          </div>

        </div>

        <div className="footer-links">

          <div>

            <h3>Product</h3>

            <a onClick={() => scrollTo("features")}>Features</a>

            <a onClick={() => scrollTo("pricing")}>Pricing</a>

            <a onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              Dashboard
            </a>

          </div>

          <div>

            <h3>Company</h3>

            <a onClick={() => scrollTo("about")}>About</a>

            <a href="#">Careers</a>

            <a href="#">Blog</a>

            <a href="#">Contact</a>

          </div>

          <div>

            <h3>Support</h3>

            <a href="#">Help Center</a>

            <a href="#">Privacy</a>

            <a href="#">Terms</a>

            <a href="#">FAQ</a>

          </div>

        </div>

      </div>

      <div className="footer-bottom">
        © 2026 TaskFlow AI. All rights reserved.
      </div>

    </footer>
  );
}