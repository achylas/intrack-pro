import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaBriefcase, FaCheckCircle } from 'react-icons/fa'; // For icons

const AdvDashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.heading}>Advisor Dashboard</h1>
      </div>

      <div style={styles.buttonContainer}>
        {/* Button for List of Students */}
        <button
          style={styles.button}
          onClick={() => navigate('/std-list')}
        >
          <FaUsers style={styles.icon} />
          <span>View Students List</span>
        </button>

        {/* Button for Internships */}
        <button
          style={styles.button}
          onClick={() => navigate('/intership-approval')}
        >
          <FaBriefcase style={styles.icon} />
          <span>Internships This Semester</span>
        </button>

        {/* Button for Approvals */}
        <button
          style={styles.button}
          onClick={() => navigate('/approval')}
        >
          <FaCheckCircle style={styles.icon} />
          <span>Approvals</span>
        </button>
      </div>
    </div>
  );
};

// Styles to improve the UI
const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    background: 'linear-gradient(135deg, #6e7bff, #007BFF)', // Gradient background
    minHeight: '100vh',
    color: '#fff',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  heading: {
    fontSize: '40px',
    fontWeight: '700',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    color: '#fff',
    textShadow: '2px 2px 8px rgba(0,0,0,0.3)', // Subtle text shadow
  },
  buttonContainer: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: '30px',
  },
  button: {
    backgroundColor: '#fff',
    color: '#007BFF',
    border: 'none',
    borderRadius: '8px',
    fontSize: '18px',
    padding: '20px 40px',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px',
    transition: 'all 0.3s ease',
    minWidth: '220px', // Make buttons a consistent width
  },
  buttonHover: {
    backgroundColor: '#007BFF',
    color: '#fff',
    transform: 'scale(1.05)',
  },
  icon: {
    fontSize: '24px',
  },
};

export default AdvDashboard;
