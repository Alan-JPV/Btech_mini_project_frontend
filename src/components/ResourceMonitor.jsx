import React from "react";
import "./ResourceMonitor.css"; // Import CSS file

const ResourceMonitor = () => {
  return (
    <div className="resource-monitor-container">
      <header className="resource-header">
        <div className="logo">LOGO</div>
        <h2>Resource Monitor</h2>
        <button className="refresh-button">Refresh</button>
      </header>

      <div className="filters">
        <select>
          <option>All Hospitals</option>
        </select>
        <select>
          <option>All Emergency Resources</option>
        </select>
      </div>

      <div className="emergency-resources">
        <div className="map-container">
          <img src="/map-placeholder.jpg" alt="Map" />
        </div>

        <div className="resource-cards">
          <div className="resource-card">
            <span>🛏️ ICU Beds Available</span>
            <p>42</p>
          </div>
          <div className="resource-card available">
            <span>🛏️ NICU Beds Available</span>
            <p>186</p>
          </div>
          <div className="resource-card critical">
            <span>🚨 Ventilators Available</span>
            <p>3</p>
          </div>
          <div className="resource-card">
            <span>🛏️ Emergency Beds</span>
            <p>15</p>
          </div>
        </div>
      </div>

      <div className="hospital-list">
        <h3>Hospital List</h3>
        <ul>
          <li>
            <strong>Central Hospital</strong>
            <p>2.3 km away • Downtown</p>
            <span className="availability high">High Availability</span>
          </li>
          <li>
            <strong>St. Mary's Hospital</strong>
            <p>3.8 km away • West End</p>
            <span className="availability medium">Medium Availability</span>
          </li>
          <li>
            <strong>City General Hospital</strong>
          </li>
        </ul>
      </div>

      <div className="resource-details">
        <h3>Resource Details</h3>
        <p><strong>Central Hospital</strong></p>
        <p>📍 123 Main Street, Downtown</p>

        <div className="details-grid">
          <div>
            <p>ICU Beds</p>
            <p><strong>12/15</strong></p>
          </div>
          <div>
            <p>NICU Beds</p>
            <p><strong>8/10</strong></p>
          </div>
          <div>
            <p>Ventilators</p>
            <p><strong>5/8</strong></p>
          </div>
          <div>
            <p>Emergency Beds</p>
            <p><strong>4/6</strong></p>
          </div>
        </div>

        <h4>Resource Trend</h4>
        <img src="/trend-chart-placeholder.jpg" alt="Trend Chart" />

        <h4>Contact Information</h4>
        <p>📞 (555) 123-4567</p>
        <p>📧 contact@centralhospital.com</p>

        <button className="contact-button">Contact Hospital</button>
      </div>
    </div>
  );
};

export default ResourceMonitor;
