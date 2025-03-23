import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const sampleData = [
  {
    hospital_id: "A123",
    name: "Government Hospital Thrissur",
    beds: { general_ward: 20, icu: 5, ccu: 3, nicu: 2, picu: 2, isolation_ward: 4, maternity: 3, burn_unit: 1, emergency_observation: 6 },
    equipment: { ventilators: 2, oxygen_cylinders: 10, oxygen_concentrators: 4, ecmo_machines: 1, dialysis_machines: 2, defibrillators: 3, anesthesia_machines: 2 },
    blood_bank: { "A+": 5, "A-": 3, "B+": 6, "B-": 2, "O+": 8, "O-": 4, "AB+": 3, "AB-": 1, plasma_units: 10, platelets: 7, cryoprecipitate: 5 },
    last_updated: "2025-03-01T12:00:00Z",
  },
  {
    hospital_id: "B456",
    name: "City Hospital Ernakulam",
    beds: { general_ward: 30, icu: 10, ccu: 5, nicu: 3, picu: 3, isolation_ward: 6, maternity: 4, burn_unit: 2, emergency_observation: 8 },
    equipment: { ventilators: 5, oxygen_cylinders: 20, oxygen_concentrators: 6, ecmo_machines: 2, dialysis_machines: 3, defibrillators: 4, anesthesia_machines: 3 },
    blood_bank: { "A+": 10, "A-": 5, "B+": 8, "B-": 3, "O+": 12, "O-": 6, "AB+": 4, "AB-": 2, plasma_units: 12, platelets: 8, cryoprecipitate: 6 },
    last_updated: "2025-03-02T14:30:00Z",
  }
];

const Dashboard = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const navigate = useNavigate();

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleRedirect = () => {
    navigate("/transfer");
  };

  return (
    <div className="container">
      <h1 className="title">Hospital Resource Dashboard</h1>
      {sampleData.map((hospital) => (
        <div key={hospital.hospital_id} className="card">
          <h2 className="hospital-name">{hospital.name}</h2>
          <div className="grid">
            <div className="stat green" onClick={() => toggleSection("beds")}>
              <h3>Available Beds</h3>
              <p>{Object.values(hospital.beds).reduce((a, b) => a + b, 0)}</p>
            </div>
            <div className="stat blue" onClick={() => toggleSection("equipment")}>
              <h3>Equipment Ready</h3>
              <p>{Object.values(hospital.equipment).reduce((a, b) => a + b, 0)}</p>
            </div>
            <div className="stat red" onClick={() => toggleSection("blood_bank")}>
              <h3>Blood Units</h3>
              <p>{Object.values(hospital.blood_bank).reduce((a, b) => a + b, 0)}</p>
            </div>
          </div>
          <p className="updated-time">Last Updated: {new Date(hospital.last_updated).toLocaleString()}</p>

          {/* Expanded Section (Shown Below the Card) */}
          {expandedSection === "beds" && (
            <div className="details-section">
              <h3>Bed Availability</h3>
              <ul>
                {Object.entries(hospital.beds).map(([key, value]) => (
                  <li key={key} onClick={handleRedirect}>{key.replace("_", " ")}: {value}</li>
                ))}
              </ul>
            </div>
          )}

          {expandedSection === "equipment" && (
            <div className="details-section">
              <h3>Equipment Status</h3>
              <ul>
                {Object.entries(hospital.equipment).map(([key, value]) => (
                  <li key={key} onClick={handleRedirect}>{key.replace("_", " ")}: {value}</li>
                ))}
              </ul>
            </div>
          )}

          {expandedSection === "blood_bank" && (
            <div className="details-section">
              <h3>Blood Bank Availability</h3>
              <ul>
                {Object.entries(hospital.blood_bank).map(([key, value]) => (
                  <li key={key} onClick={handleRedirect}>{key.replace("_", " ")}: {value}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
