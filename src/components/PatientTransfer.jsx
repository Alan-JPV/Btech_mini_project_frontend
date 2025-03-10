import React from "react";
import "./PatientTransfer.css"; // Import the CSS file

const PatientTransfer = () => {
  return (
    <div className="patient-transfer-container">
      {/* Header */}
      <header className="transfer-header">
        <div className="logo">LOGO</div>
        <h2>Patient Transfer System</h2>
        <div className="user-info">
          <span>Dr. Sarah Johnson</span>
        </div>
      </header>

      {/* Patient Information */}
      <div className="transfer-content">
        <div className="patient-info">
          <h3>Patient Information</h3>
          <div className="input-group">
            <input type="text" placeholder="Enter patient name" />
            <input type="date" />
            <button className="import-button">📂 Import Patient Data</button>
          </div>
          <textarea placeholder="Describe patient's current condition"></textarea>
          <div className="dropdowns">
            <select>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
            <select>
              <option>ICU Bed</option>
              <option>Ventilator</option>
              <option>Emergency Bed</option>
            </select>
          </div>
        </div>

        {/* Destination Hospital */}
        <div className="destination-hospital">
          <h3>Destination Hospital</h3>
          <input type="text" placeholder="Search hospitals" />
          <div className="hospital-list">
            <div className="hospital">
              <p><strong>City General Hospital</strong></p>
              <p>2.5 miles away • 10 min ETA</p>
              <span className="availability high">4 ICU Beds Available</span>
            </div>
            <div className="hospital">
              <p><strong>Memorial Medical Center</strong></p>
              <p>4.8 miles away • 15 min ETA</p>
              <span className="availability medium">2 ICU Beds Available</span>
            </div>
          </div>
        </div>

        {/* Transfer Status */}
        <div className="transfer-status">
          <h3>Transfer Status</h3>
          <p className="status-item active">✅ Request Submitted <span>10:30 AM</span></p>
          <p className="status-item in-progress">⏳ Under Review <span>In Progress</span></p>
          <p className="status-item pending">⚪ Transfer Pending</p>
        </div>

        {/* Communication Panel */}
        <div className="communication">
          <h3>Communication</h3>
          <div className="chat">
            <div className="message received">Patient requires immediate ventilator support. Current SpO2 at 88%. <span>10:30 AM</span></div>
            <div className="message sent">ICU bed being prepared. ETA for transfer team: 15 minutes. <span>10:32 AM</span></div>
          </div>
          <input type="text" placeholder="Type your message..." />
        </div>
      </div>

      {/* Buttons */}
      <div className="transfer-buttons">
        <button className="submit-button">Submit Transfer Request</button>
        <button className="draft-button">Save Draft</button>
        <label>
          <input type="checkbox" />
          Mark as Emergency Priority
        </label>
      </div>
    </div>
  );
};

export default PatientTransfer;
