import React from "react";
import { useNavigate } from "react-router-dom";
import "./std_dashboard_style.css";
import { FaBriefcase, FaUser, FaPlusCircle } from "react-icons/fa"; // Importing icons for better visuals

const StudentDashboard = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Student Dashboard</h1>
      <div className="dashboard-cards">
        <div className="dashboard-card" onClick={() => handleNavigation("/internship-history")}>
          <FaBriefcase className="dashboard-icon" />
          <h2>My Internships</h2>
          <p>View your internship history and progress.</p>
        </div>
        <div className="dashboard-card" onClick={() => handleNavigation("/new-internship-form")}>
          <FaPlusCircle className="dashboard-icon" />
          <h2>New Internship Form</h2>
          <p>Submit your application for a new internship.</p>
        </div>
        <div className="dashboard-card" onClick={() => handleNavigation("/profile")}>
          <FaUser className="dashboard-icon" />
          <h2>Profile</h2>
          <p>Edit and update your personal information.</p>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
