import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig"; // Firebase auth
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail,
  getIdToken
} from "firebase/auth";
import axios from "axios"; // Axios for API requests
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState(""); 
  const [isRegistering, setIsRegistering] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    setMessage(""); 

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      let userCredential;
      if (isRegistering) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        setMessage("User registered successfully! ✅");
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }

      const user = userCredential.user;
      const token = await user.getIdToken(); // Get Firebase token

      // 🔹 Send token to backend for authentication & MongoDB storage
      const response = await axios.post("http://localhost:5000/api/auth/login", {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      localStorage.setItem("user", JSON.stringify(response.data.user)); // Store user info
      navigate("/dashboard"); 

    } catch (err) {
      setError(err.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email first");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset link sent! Check your email. 📩");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">LOGO</div>
        <h3 className="welcome-text">{isRegistering ? "Register" : "Welcome Back"}</h3>
        {error && <p className="error-text">{error}</p>}
        {message && <p className="success-text">{message}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="sign-in-btn" type="submit" disabled={!email || !password}>
            {isRegistering ? "Register" : "Sign in"}
          </button>
        </form>

        {!isRegistering && (
          <button className="sign-in-btn" onClick={handleForgotPassword}>
            Forgot Password?
          </button>
        )}

        <button className="sign-in-btn" onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? "Already have an account? Sign In" : "New User? Register Here"}
        </button>
      </div>
    </div>
  );
};

export default Login;
