import React, { useState } from "react";
import "./DoctorProfile.css";

const DoctorProfile = () => {
  const [email, setEmail] = useState("james.wilson@hospital.com");
  const [phone, setPhone] = useState("+1 (555) 123-4567");
  const [address, setAddress] = useState("123 Medical Center Dr, Suite 456");
  const [notifications, setNotifications] = useState(false);

  return (
    <div className="doctor-profile-container">
      {/* Header */}
      <header className="profile-header">
        <div className="logo">LOGO</div>
        <div className="user-actions">
          <span className="notification-icon">🔔</span>
          <span className="user-avatar">👨‍⚕️</span>
          <button className="logout-button">Logout</button>
        </div>
      </header>

      {/* Profile Section */}
      <div className="profile-card">
        <div className="profile-avatar">
          <img src="https://via.placeholder.com/100" alt="Doctor" />
          <button className="edit-avatar">🔒</button>
        </div>
        <h2>Dr. James Wilson</h2>
        <p>Senior Cardiologist</p>
      </div>

      {/* Personal Information */}
      <div className="profile-section">
        <h3>Personal Information</h3>
        <div className="info-group">
          <p>📧 <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></p>
          <p>📞 <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} /></p>
          <p>📍 <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} /></p>
        </div>
      </div>

      {/* Settings */}
      <div className="profile-section">
        <h3>Settings</h3>
        <div className="settings-group">
          <button className="password-button">Change Password</button>
          <button className="update-button">Update</button>
        </div>
        <label className="notification-toggle">
          <span>Notifications</span>
          <input type="checkbox" checked={notifications} onChange={() => setNotifications(!notifications)} />
        </label>
      </div>

      {/* Professional Details */}
      <div className="profile-section">
        <h3>Professional Details</h3>
        <div>
          <h4>Hospital Affiliations</h4>
          <p>✅ Central Hospital Medical Center (Primary)</p>
          <p>✅ St. Mary's Medical Center (Secondary)</p>
        </div>

        <div className="specializations">
          <h4>Specializations</h4>
          <span className="specialty">Cardiology</span>
          <span className="specialty">Interventional Cardiology</span>
          <span className="specialty">Echocardiography</span>
          <button className="add-specialty">+ Add More</button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="profile-buttons">
        <button className="cancel-button">Cancel</button>
        <button className="save-button">Save Changes</button>
      </div>
    </div>
  );
};

export default DoctorProfile;
