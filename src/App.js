import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Login from './components/loginsignup/login';
import StudentDashboard from './components/screens/student/std_dashbaord';  // Correct the path if needed
import AdvDashboard from './components/screens/advisor/advDashboard'; // Correct path
import AdminDashboard from './components/screens/admin/admin'; // Correct path

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />  {/* This should render the Login component */}
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/advisor-dashboard" element={<AdvDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
