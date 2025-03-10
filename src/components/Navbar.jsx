import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">LOGO</div>

      {/* Navigation Links */}
      <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
        <li><a href="#">Dashboard</a></li>
        <li><a href="#">Patients</a></li>
        <li><a href="#">Transfers</a></li>
        <li><a href="#">Settings</a></li>
      </ul>

      {/* Right Icons */}
      <div className="nav-icons">
        <span className="notification-icon">🔔</span>
        <span className="user-avatar">👨‍⚕️</span>
        <button className="logout-button">Logout</button>
      </div>

      {/* Mobile Menu Toggle */}
      <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        ☰
      </button>
    </nav>
  );
};

export default Navbar;
