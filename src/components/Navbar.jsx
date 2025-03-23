import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { auth } from "../firebaseConfig"; // Import Firebase auth
import { signOut, onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null); // Track user authentication state
  const navigate = useNavigate();

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  // Logout Function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <nav className="navbar">
      {/* Clickable Logo - Redirects to Dashboard */}
      <Link to="/dashboard" className="logo">LOGO</Link>

      {/* Right Section */}
      <div className="nav-icons">
        <button className="profile-button">
          <Link to="/profile" className="profile-button">👤 Profile</Link>
        </button>

        {user ? ( // If user is logged in, show Logout
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        ) : ( // If no user, show Login
          <button className="logout-button">
            <Link to="/" className="logout-button">Login</Link>
          </button>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        ☰
      </button>
    </nav>
  );
};

export default Navbar;
