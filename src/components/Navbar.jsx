import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Clickable Logo - Redirects to Dashboard */}
      <Link to="/dashboard" className="logo">LOGO</Link>

      {/* Right Section */}
      <div className="nav-icons">
        <button className="profile-button"><Link to="/profile" className="profile-button">👤 Profile</Link></button> {/* Styled Profile Link */}
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
