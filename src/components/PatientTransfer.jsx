import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { auth } from "../firebaseConfig";
import "./PatientTransfer.css";

const PatientTransfer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get hospital and service from navigation state (passed from Dashboard)
  const { hospitalName = "", service = "" } = location.state || {};

  const [doctorDetails, setDoctorDetails] = useState({
    name: "",
    contact: "",
    hospitalName: "",
    specialization: "",
  });
  const [patients, setPatients] = useState([{ name: "", age: "", height: "" }]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch doctor details from UserInfo
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const token = await user.getIdToken();
          const response = await axios.post("http://localhost:5000/api/userinfo", null, {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (response.data) {
            setDoctorDetails({
              name: response.data.name || user.displayName || "Unknown",
              contact: response.data.contactInfo || "Not provided",
              hospitalName: response.data.hospitalName || "Not provided",
              specialization: response.data.specialization || "Not set",
            });
          }
        } catch (error) {
          console.error("Error fetching doctor details:", error.response?.data || error.message);
        }
      }
      setLoading(false);
    });
  }, []);

  const handlePatientChange = (index, field, value) => {
    const updatedPatients = [...patients];
    updatedPatients[index][field] = value;
    setPatients(updatedPatients);
  };

  const addPatient = () => {
    setPatients([...patients, { name: "", age: "", height: "" }]);
  };

  const removePatient = (index) => {
    if (patients.length > 1) {
      setPatients(patients.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate patient details
    for (const patient of patients) {
      if (!patient.name || !patient.age || !patient.height) {
        alert("Please fill in all patient details.");
        return;
      }
    }

    const transferData = {
      hospitalName,
      service,
      doctor: doctorDetails,
      patients,
      transferDate: new Date().toISOString(),
    };

    try {
      const token = await auth.currentUser.getIdToken();
      await axios.post("http://localhost:5000/api/patient-transfer", transferData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Patient transfer request submitted successfully!");
      navigate("/dashboard"); // Redirect back to dashboard
    } catch (error) {
      console.error("Error submitting transfer:", error.response?.data || error.message);
      alert(`Failed to submit transfer: ${error.response?.data?.message || error.message}`);
    }
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="transfer-container">
      <h2>Patient Transfer Request</h2>
      <div className="transfer-section">
        <h3>Transfer Details</h3>
        <p><strong>Hospital:</strong> {hospitalName}</p>
        <p><strong>Service:</strong> {service}</p>
      </div>

      <div className="transfer-section">
        <h3>Doctor Details</h3>
        <p><strong>Name:</strong> Dr. {doctorDetails.name}</p>
        <p><strong>Contact:</strong> {doctorDetails.contact}</p>
        <p><strong>Hospital:</strong> {doctorDetails.hospitalName}</p>
        <p><strong>Specialization:</strong> {doctorDetails.specialization}</p>
      </div>

      <div className="transfer-section">
        <h3>Patient Details</h3>
        {patients.map((patient, index) => (
          <div key={index} className="patient-form">
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={patient.name}
                onChange={(e) => handlePatientChange(index, "name", e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Age:</label>
              <input
                type="number"
                value={patient.age}
                onChange={(e) => handlePatientChange(index, "age", e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Height (cm):</label>
              <input
                type="number"
                value={patient.height}
                onChange={(e) => handlePatientChange(index, "height", e.target.value)}
                required
              />
            </div>
            {patients.length > 1 && (
              <button
                type="button"
                className="remove-button"
                onClick={() => removePatient(index)}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" className="add-button" onClick={addPatient}>
          Add Another Patient
        </button>
      </div>

      <button type="submit" className="submit-button" onClick={handleSubmit}>
        Submit Transfer Request
      </button>
    </div>
  );
};

export default PatientTransfer;