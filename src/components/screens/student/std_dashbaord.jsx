import React, { useState, useEffect } from 'react';
import './std_dashboard_style.css';
import InternshipList from '../../lists/internshipList.js';
import AddInternshipForm from '../../forms/addinter.js';
import Sidebar from '../../consts/sidebar.js';
import TopBar from '../../consts/topbar.js';
import Stats from './stats.js';
import Certificates from '../internship/certificate_dashboard.js';
import { db } from '../../loginsignup/firebase.jsx';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { fetchInternshipsByStudentID } from '../../../services/internshipservice.js';
const StudentDashboard = () => {
  const [activePage, setActivePage] = useState('MyInternships');
  const [internships, setInternships] = useState([]);
  const [studentInfo, setStudentInfo] = useState(null);

  const handleNavigation = (page) => {
    setActivePage(page);
  };

  // Fetch Student Data and Internships Data
 

useEffect(() => {
  const fetchData = async () => {
    const studentRef = collection(db, "students");
    const studentSnapshot = await getDocs(studentRef);
    const studentDoc = studentSnapshot.docs[0];
    setStudentInfo(studentDoc.data());

    const studentID = studentDoc.id; 
    const internshipsList = await fetchInternshipsByStudentID(studentID);
    setInternships(internshipsList);
  };

  fetchData();
}, []);
 // Empty dependency array to fetch data on mount
   // Empty dependency array to fetch data on mount

  return (
    <div className="dashboard">
      <Sidebar handleNavigation={handleNavigation} />
      <div className="main-content">
        <TopBar />
        <div className="content">
          {activePage === 'MyProfile' && studentInfo && (
            <>
              <h1>Profile Details</h1>
              <p>Username: {studentInfo.username}</p>
              <p>Email: {studentInfo.email}</p>
              <p>Role: {studentInfo.role}</p>
              <p>Advisor: {studentInfo.advisorID}</p>
            </>
          )}
          {activePage === 'MyInternships' && (
            <>
              <InternshipList internships={internships} />
              <Stats studentID={studentInfo?.studentID} />


              <Certificates />
            </>
          )}
          {activePage === 'AddInternship' && <AddInternshipForm />}
          {activePage === 'Stats' && <Stats />}
          {activePage === 'Certificates' && <Certificates />}
          {activePage === 'SignOut' && <h1>Signing Out...</h1>}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
