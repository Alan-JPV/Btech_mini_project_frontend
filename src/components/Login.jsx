import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig"; // Import Firebase auth
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail 
} from "firebase/auth";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState(""); // Success message
  const [isRegistering, setIsRegistering] = useState(false); // Toggle between login/register
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
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
        setMessage("User registered successfully! ✅");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/dashboard"); // Redirect on login
      }
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

        {/* Forgot Password Button */}
        {!isRegistering && (
          <button className="sign-in-btn" onClick={handleForgotPassword}>
            Forgot Password?
          </button>
        )}

        {/* Toggle between Login & Register */}
        <button className="sign-in-btn" onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? "Already have an account? Sign In" : "New User? Register Here"}
        </button>
      </div>
    </div>
  );
};

export default Login;
