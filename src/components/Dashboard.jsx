import React from "react";
import "./Dashboard.css"; // Import CSS file

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="logo">LOGO</div>
        <nav>
          <ul>
            <li className="active">Dashboard</li>
            <li>Resource Monitoring</li>
            <li>Patient Transfer</li>
            <li>Profile</li>
          </ul>
        </nav>
      </aside>

      <main className="dashboard-content">
        <header className="dashboard-header">
          <h2>Dashboard</h2>
          <div className="profile">
            <img src="/profile.jpg" alt="Profile" className="profile-pic" />
            <div className="profile-info">
              <strong>Dr. Sarah Wilson</strong>
              <span>Head of ICU</span>
            </div>
          </div>
        </header>

        <div className="stats">
          <div className="stat-card">
            <h3>ICU Beds</h3>
            <p className="stat-value">8/12</p>
            <span>Available Beds</span>
            <p className="stat-change up">▲ 4%</p>
          </div>
          <div className="stat-card">
            <h3>NICU Beds</h3>
            <p className="stat-value">5/8</p>
            <span>Available Beds</span>
            <p className="stat-change down">▼ 2%</p>
          </div>
          <div className="stat-card">
            <h3>CCU Beds</h3>
            <p className="stat-value">6/10</p>
            <span>Available Beds</span>
            <p className="stat-change up">▲ 6%</p>
          </div>
          <div className="stat-card">
            <h3>Ventilators</h3>
            <p className="stat-value">15/20</p>
            <span>Available Units</span>
            <p className="stat-change up">▲ 8%</p>
          </div>
        </div>

        <div className="actions">
          <button className="request-transfer">+ Request Transfer</button>
          <button className="update-status">Update Status</button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
