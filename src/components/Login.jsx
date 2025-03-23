import React from "react";
import "./Login.css"; // Import the CSS file

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">LOGO</div>
        <h3 className="welcome-text">Welcome Back</h3>
        <form>
          <div className="input-group">
            <label>Username</label>
            <input type="text" placeholder="Enter your username" />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" />
          </div>
          <button className="sign-in-btn">Sign in</button>
          <button className="register-btn">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

