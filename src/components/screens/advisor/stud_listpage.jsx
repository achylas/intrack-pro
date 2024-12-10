import React, { useEffect, useState } from 'react';
import { db } from '../../auth/firebase.jsx'; // Import the Firebase config
import { collection, getDocs } from 'firebase/firestore';
import { FaUserGraduate } from 'react-icons/fa'; // Adding an icon for students
import './stud_list_style.css'
const StudentsListPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      console.log('Entering fetchStudents');
      try {
        console.log('Fetching students...');
        const studentsRef = collection(db, 'students');
        const snapshot = await getDocs(studentsRef);
        console.log('Snapshot received:', snapshot);

        if (snapshot.empty) {
          console.log('No students found!');
          setStudents([]);
        } else {
          const studentsList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log('Students data:', studentsList);
          setStudents(studentsList);
        }
      } catch (error) {
        console.error('Error fetching students: ', error);
        alert('Failed to fetch students. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="students-container">
      <h1 className="students-title">
        <FaUserGraduate className="students-icon" /> Student List
      </h1>
      <table className="students-table">
        <thead>
          <tr>
            <th>Sq No</th>
            <th>Name</th>
            <th>Reg No</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.id} className="student-row">
              <td>{index + 1}</td>
              <td>{student.username}</td>
              <td>{student.studentID}</td>
              <td>{student.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsListPage;
