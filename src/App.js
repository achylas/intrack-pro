import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Login from './components/loginsignup/login';
import StudentDashboard from './components/screens/student/std_dashbaord';  // Correct the path if needed
import AdminDashboard from './components/screens/admin/admin'; // Correct path
import InternshipSubmissionForm from './components/screens/internship/new_inter_form';
import InternshipHistoryPage from './components/lists/internshipHistory';
import SidebarComponent from './components/consts/sidebar';
import AdvDashboard from './components/screens/advisor/advDashboard';
import StudentsListPage from './components/screens/advisor/stud_listpage';
import InternshipList from './components/screens/advisor/internsjipkiststd';
import AdvisorApproval from './components/screens/advisor/advisorapproval';
import InternshipDetailPage from './components/screens/internship/internshipManagement';
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
            <Route path="/internship-history" element={<InternshipHistoryPage />} />
            <Route path="/new-internship-form" element={<InternshipSubmissionForm />} />
            <Route path="/advisor-dashboard" element={<AdvDashboard />} />
            <Route path="/std-list" element={<StudentsListPage />} />
            <Route path="/intership-approval" element={<InternshipList />} />
            <Route path="/internships/:internshipId" element={<InternshipDetailPage  />} />
            <Route path="/approval" element={<AdvisorApproval />} />



          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
