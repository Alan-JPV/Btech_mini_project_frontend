import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ResourceMonitor from "./components/ResourceMonitor";
import PatientTransfer from "./components/PatientTransfer";
import DoctorProfile from "./components/DoctorProfile";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/resources" element={<ResourceMonitor />} />
        <Route path="/transfer" element={<PatientTransfer />} />
        <Route path="/profile" element={<DoctorProfile />} />
      </Routes>
    </Router>
  );
}

export default App;