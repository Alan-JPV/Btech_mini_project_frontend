import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";

const Dashboard = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHospitalData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/central-data", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setHospitals(response.data);
      } catch (error) {
        console.error("Error fetching hospital data:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitalData();
  }, [navigate]);

  const toggleSection = (hospitalId, section) => {
    setExpandedSections((prevState) => ({
      ...prevState,
      [hospitalId]: prevState[hospitalId] === section ? null : section,
    }));
  };

  const handleTransfer = (hospitalName, service) => {
    navigate("/transfer", { state: { hospitalName, service } });
  };

  const handleBooking = (hospitalName, resourceType, resource) => {
    navigate("/booking", { state: { hospitalName, resourceType, resource } });
  };

  return (
    <div className="container">
      <h1 className="title">Hospital Resource Dashboard</h1>
      {loading ? (
        <p className="loading-text">Loading hospital data...</p>
      ) : (
        hospitals.map((hospital) => (
          <div key={hospital._id} className="card">
            <h2 className="hospital-name">{hospital.name}</h2>
            <div className="grid">
              <div className="stat green" onClick={() => toggleSection(hospital._id, "beds")}>
                <h3>Available Beds</h3>
                <p>{Object.values(hospital.beds).reduce((a, b) => a + b, 0)}</p>
              </div>
              <div className="stat blue" onClick={() => toggleSection(hospital._id, "equipment")}>
                <h3>Equipment Ready</h3>
                <p>{Object.values(hospital.equipment).reduce((a, b) => a + b, 0)}</p>
              </div>
              <div className="stat red" onClick={() => toggleSection(hospital._id, "blood_bank")}>
                <h3>Blood Units</h3>
                <p>{Object.values(hospital.blood_bank).reduce((a, b) => a + b, 0)}</p>
              </div>
            </div>
            <p className="updated-time">Last Updated: {new Date(hospital.last_updated).toLocaleString()}</p>

            {expandedSections[hospital._id] === "beds" && (
              <div className="details-section">
                <h3>Bed Availability</h3>
                <ul>
                  {Object.entries(hospital.beds).map(([key, value]) => (
                    <li
                      key={key}
                      onClick={() => handleTransfer(hospital.name, key.replace("_", " "))}
                      style={{ cursor: "pointer" }}
                    >
                      {key.replace("_", " ")}: {value}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {expandedSections[hospital._id] === "equipment" && (
              <div className="details-section">
                <h3>Equipment Status</h3>
                <ul>
                  {Object.entries(hospital.equipment).map(([key, value]) => (
                    <li
                      key={key}
                      onClick={() => handleBooking(hospital.name, "Equipment Ready", key.replace("_", " "))}
                      style={{ cursor: "pointer" }}
                    >
                      {key.replace("_", " ")}: {value}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {expandedSections[hospital._id] === "blood_bank" && (
              <div className="details-section">
                <h3>Blood Bank Availability</h3>
                <ul>
                  {Object.entries(hospital.blood_bank).map(([key, value]) => (
                    <li
                      key={key}
                      onClick={() => handleBooking(hospital.name, "Blood Units", key.replace("_", " "))}
                      style={{ cursor: "pointer" }}
                    >
                      {key.replace("_", " ")}: {value}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;