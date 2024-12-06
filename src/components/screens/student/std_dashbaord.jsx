// StudentDashboard.jsx
import React, { useState, useEffect } from 'react';
import './std_dashboard_style.css';
import InternshipList from '../../lists/internshipList.js';
import Stats from './stats.js';
import { firestore,auth} from '../../loginsignup/firebase.jsx';
import { collection, getDocs, query, where } from 'firebase/firestore';

const StudentDashboard = () => {
  const [activePage, setActivePage] = useState('MyInternships');
  const [internships, setInternships] = useState([]);
  const [studentInfo, setStudentInfo] = useState(null);

  const handleNavigation = (page) => {
    setActivePage(page);
  };

  useEffect(() => {
    const fetchStudentData = async () => {
      const user = auth.currentUser; // Get current user
      if (user) {
        const studentDoc = await firestore.collection("students").doc(user.uid).get();
        if (studentDoc.exists) {
          setStudentInfo(studentDoc.data());
        }
      }
    };
    fetchStudentData();
  }, []);

  useEffect(() => {
    const fetchInternships = async () => {
      const internshipsRef = collection(firestore, "internships");
      const q = query(internshipsRef, where("studentID", "==", studentInfo?.studentID));
      const querySnapshot = await getDocs(q);
      setInternships(querySnapshot.docs.map(doc => doc.data()));
    };

    if (studentInfo) {
      fetchInternships();
    }
  }, [studentInfo]);

  return (
    <div className="dashboard">
      <div className="main-content">
        <h1>Welcome, {studentInfo?.username}</h1>
        <div className="content">
          {activePage === 'MyProfile' && studentInfo && (
            <>
              <h2>Profile Details</h2>
              <p>Username: {studentInfo.username}</p>
              <p>Email: {studentInfo.email}</p>
            </>
          )}
          {activePage === 'MyInternships' && <InternshipList internships={internships} />}
          {activePage === 'Stats' && <Stats />}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
