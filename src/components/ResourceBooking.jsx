import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { auth } from "../firebaseConfig";
import "./ResourceBooking.css";

const ResourceBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get hospital, resource type, and specific resource from navigation state
  const { hospitalName = "", resourceType = "", resource = "" } = location.state || {};

  const [doctorDetails, setDoctorDetails] = useState({
    name: "",
    contact: "",
    hospitalName: "",
    specialization: "",
  });
  const [bookings, setBookings] = useState([{ resource: resource || "", quantity: "" }]);
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

  const handleBookingChange = (index, field, value) => {
    const updatedBookings = [...bookings];
    updatedBookings[index][field] = value;
    setBookings(updatedBookings);
  };

  const addBooking = () => {
    setBookings([...bookings, { resource: "", quantity: "" }]);
  };

  const removeBooking = (index) => {
    if (bookings.length > 1) {
      setBookings(bookings.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate booking details
    for (const booking of bookings) {
      if (!booking.resource || !booking.quantity || booking.quantity <= 0) {
        alert("Please fill in all booking details with a valid quantity.");
        return;
      }
    }

    const bookingData = {
      hospitalName,
      resourceType,
      doctor: doctorDetails,
      bookings,
      bookingDate: new Date().toISOString(),
    };

    try {
      const token = await auth.currentUser.getIdToken();
      await axios.post("http://localhost:5000/api/resource-booking", bookingData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Resource booking request submitted successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting booking:", error.response?.data || error.message);
      alert(`Failed to submit booking: ${error.response?.data?.message || error.message}`);
    }
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="booking-container">
      <h2>Resource Booking Request</h2>
      <div className="booking-section">
        <h3>Booking Details</h3>
        <p><strong>Hospital:</strong> {hospitalName}</p>
        <p><strong>Resource Type:</strong> {resourceType}</p>
      </div>

      <div className="booking-section">
        <h3>Doctor Details</h3>
        <p><strong>Name:</strong> Dr. {doctorDetails.name}</p>
        <p><strong>Contact:</strong> {doctorDetails.contact}</p>
        <p><strong>Hospital:</strong> {doctorDetails.hospitalName}</p>
        <p><strong>Specialization:</strong> {doctorDetails.specialization}</p>
      </div>

      <div className="booking-section">
        <h3>Resource Booking</h3>
        {bookings.map((booking, index) => (
          <div key={index} className="booking-form">
            <div className="form-group">
              <label>Resource:</label>
              <input
                type="text"
                value={booking.resource}
                onChange={(e) => handleBookingChange(index, "resource", e.target.value)}
                placeholder="e.g., Ventilator or A+ Blood"
                required
                disabled={index === 0 && resource} // Disable if pre-filled from dashboard
              />
            </div>
            <div className="form-group">
              <label>Quantity:</label>
              <input
                type="number"
                value={booking.quantity}
                onChange={(e) => handleBookingChange(index, "quantity", e.target.value)}
                min="1"
                required
              />
            </div>
            {bookings.length > 1 && (
              <button
                type="button"
                className="remove-button"
                onClick={() => removeBooking(index)}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" className="add-button" onClick={addBooking}>
          Add Another Resource
        </button>
      </div>

      <button type="submit" className="submit-button" onClick={handleSubmit}>
        Submit Booking Request
      </button>
    </div>
  );
};

export default ResourceBooking;