import React, { useEffect, useState } from 'react';
import { db } from '../../loginsignup/firebase.jsx'; // Adjust the path based on your project structure
import { collection, getDocs, query, where } from 'firebase/firestore';

const Stats = ({ studentID }) => {
  const [internshipData, setInternshipData] = useState(null);
  const [studentInfo, setStudentInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInternshipStats = async () => {
      try {
        // Query the Internships collection to get internship details based on studentID
        const internshipsRef = collection(db, "Internships");
        const internshipQuery = query(internshipsRef, where("studentID", "==", studentID));
        const internshipSnapshot = await getDocs(internshipQuery);

        if (!internshipSnapshot.empty) {
          const internshipDoc = internshipSnapshot.docs[0].data(); // Get the first matching internship document
          
          // Extract internship-related data
          const completedHours = internshipDoc.credithour;  // Use credithour for completed hours
          const totalHoursRequired = internshipDoc.credit_rema; // Use credit_rema for total required hours
          const creditEarned = internshipDoc.credithour; // Use credithour for credit earned
          const creditHoursLeft = totalHoursRequired - completedHours;

          setInternshipData({
            completedHours,
            totalHoursRequired,
            creditEarned,
            creditHoursLeft
          });

          // Now query the Students collection using the studentID to fetch the student details
          const studentsRef = collection(db, "students");
          const studentQuery = query(studentsRef, where("studentID", "==", studentID));
          const studentSnapshot = await getDocs(studentQuery);

          if (!studentSnapshot.empty) {
            const studentDoc = studentSnapshot.docs[0].data(); // Get the first matching student document
            setStudentInfo(studentDoc);  // Store student details
          } else {
            console.log("Student not found in the students collection.");
          }
        } else {
          console.log("No internship found for this student.");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);  // Set loading to false after data fetching is done
      }
    };

    fetchInternshipStats();
  }, [studentID]);  // Re-run the useEffect hook when studentID changes

  // Show loading state or display internship data
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ marginTop: '20px', padding: '20px', background: '#fff', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <h2>Internship Stats</h2>
      {internshipData ? (
        <>
          <p><strong>Hours Completed:</strong> {internshipData.completedHours} hours</p>
          <p><strong>Credit Earned:</strong> {internshipData.creditEarned} credits</p>
          <p><strong>Credit Hours Left:</strong> {internshipData.creditHoursLeft} hours</p>
        </>
      ) : (
        <p>No internship data available.</p>
      )}

      {/* Display student details if available */}
      {studentInfo && (
        <div style={{ marginTop: '20px' }}>
          <h3>Student Profile</h3>
          <p><strong>Student ID:</strong> {studentInfo.studentID}</p>
          <p><strong>Name:</strong> {studentInfo.name}</p>
          <p><strong>Email:</strong> {studentInfo.email}</p>
          <p><strong>Advisor:</strong> {studentInfo.advisorID}</p>
        </div>
      )}
    </div>
  );
};

export default Stats;
