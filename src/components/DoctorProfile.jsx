import React, { useEffect, useState } from "react";
import { auth } from "../firebaseConfig"; // Firebase Config
import axios from "axios";
import "./DoctorProfile.css";

const ProfilePage = () => {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [profileData, setProfileData] = useState({
    name: "",
    contact: "",
    specialization: "",
    hospitalName: "",
    profileImage: ""
  });
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);

  // List of specializations for the dropdown
  const specializations = [
    "Cardiology",
    "Neurology",
    "Pediatrics",
    "Orthopedics",
    "Dermatology",
    "Oncology",
    "General Surgery",
    "Psychiatry",
    "Other"
  ];

  useEffect(() => {
    // Check Firebase Authentication
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setFirebaseUser(user);
        
        // Fetch additional details from MongoDB using email instead of UID
        try {
          const response = await axios.get(`http://localhost:5000/api/profile/${user.email}`);
          if (response.data) {
            setProfileData(response.data);
          }
        } catch (error) {
          console.error("No extra details found, user might be new:", error.response?.data || error.message);
        }

        // Fetch existing UserInfo data
        try {
          const token = await user.getIdToken();
          const userInfoResponse = await axios.post("http://localhost:5000/api/userinfo", null, {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (userInfoResponse.data) {
            setProfileData((prev) => ({
              ...prev,
              name: userInfoResponse.data.name || user.displayName || "",
              contact: userInfoResponse.data.contactInfo || prev.contact,
              hospitalName: userInfoResponse.data.hospitalName || prev.hospitalName,
              profileImage: userInfoResponse.data.profileImage || prev.profileImage,
              specialization: userInfoResponse.data.specialization || prev.specialization, // Add specialization
            }));
            console.log("Profile Image URL from UserInfo:", userInfoResponse.data.profileImage);
          }
        } catch (error) {
          console.error("Error fetching UserInfo:", error.response?.data || error.message);
        }
      }
      setLoading(false);
    });
  }, []);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const updatedProfile = {
      email: firebaseUser.email,
      name: profileData.name,
      profileImage: profileData.profileImage,
      contact: profileData.contact,
      specialization: profileData.specialization, // Ensure specialization is included
      hospitalName: profileData.hospitalName,
    };

    const token = await firebaseUser.getIdToken();

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      try {
        const uploadResponse = await axios.post("http://localhost:5000/api/upload-profile-image", formData, {
          headers: { 
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
          }
        });
        updatedProfile.profileImage = uploadResponse.data.imageUrl;
        console.log("Uploaded Image URL:", uploadResponse.data.imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error.response?.data || error.message);
        alert("Failed to upload image. Please try again.");
        return;
      }
    }

    try {
      // Update UserInfo database via PUT request
      const putResponse = await axios.put("http://localhost:5000/api/userinfo", {
        email: firebaseUser.email,
        name: updatedProfile.name,
        contactInfo: updatedProfile.contact,
        hospitalName: updatedProfile.hospitalName,
        profileImage: updatedProfile.profileImage,
        specialization: updatedProfile.specialization, // Add specialization
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Update local state with the response from the server
      const updatedUser = putResponse.data.user;
      setProfileData((prev) => ({
        ...prev,
        name: updatedUser.name || prev.name,
        contact: updatedUser.contactInfo || prev.contact,
        hospitalName: updatedUser.hospitalName || prev.hospitalName,
        profileImage: updatedUser.profileImage || prev.profileImage,
        specialization: updatedUser.specialization || prev.specialization, // Update specialization in state
      }));

      console.log("Updated Profile Image URL:", updatedUser.profileImage);

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error.message);
      alert(`Failed to update profile: ${error.response?.data?.message || error.message}. Please try again.`);
    }
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img 
          src={profileData.profileImage || firebaseUser?.photoURL || "/default-avatar.png"} 
          alt="Profile" 
          className="profile-image" 
          onError={(e) => console.error("Failed to load profile image:", profileData.profileImage)}
        />
        <h2>Dr. {profileData.name || firebaseUser?.displayName || "Unknown"}</h2>
        <p>{profileData.specialization || "Specialization not set"}</p>
      </div>

      <div className="profile-section">
        <h3>Personal Information</h3>
        <p>Email: {firebaseUser?.email}</p>
        <p>Contact: {profileData.contact || "Not provided"}</p>
      </div>

      <div className="profile-section">
        <h3>Hospital Affiliation</h3>
        <p>{profileData.hospitalName || "Not provided"}</p>
      </div>

      <div className="profile-section">
        <h3>Edit Profile</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Doctor Name:</label>
            <input 
              type="text" 
              name="name" 
              value={profileData.name} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Profile Image:</label>
            <input type="file" onChange={handleFileChange} />
          </div>

          <div className="form-group">
            <label>Contact:</label>
            <input 
              type="text" 
              name="contact" 
              value={profileData.contact} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Specialization:</label>
            <select
              name="specialization"
              value={profileData.specialization}
              onChange={handleChange}
              required
            >
              <option value="">Select Specialization</option>
              {specializations.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Hospital Name:</label>
            <input 
              type="text" 
              name="hospitalName" 
              value={profileData.hospitalName} 
              onChange={handleChange} 
              required 
            />
          </div>

          <button type="submit" className="save-button">Save Profile</button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;