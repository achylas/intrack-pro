import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Login from './components/loginsignup/login';
import StudentDashboard from './components/screens/student/std_dashbaord';  // Correct the path if needed
import AdvDashboard from './components/screens/advisor/advDashboard'; // Correct path
import AdminDashboard from './components/screens/admin/admin'; // Correct path
import InternshipForm from './components/screens/internship/new_inter_form';
import InternshipHistory from './components/lists/internshipList';
import SidebarComponent from './components/consts/sidebar';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {/* Sidebar */}
        <SidebarComponent />

        {/* Main Content */}
        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
            {/* Add the Login route as the first one */}
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<StudentDashboard />} />
            <Route path="/internship-history" element={<InternshipHistory />} />
            <Route path="/new-internship-form" element={<InternshipForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
