import React, { useState, useEffect } from 'react';
import { db } from '../../auth/firebase';
import { collection, getDocs,getDoc, doc, updateDoc } from 'firebase/firestore';

const AdvisorApproval = () => {
  const [pendingInternships, setPendingInternships] = useState([]);

  useEffect(() => {
    const fetchPendingInternships = async () => {
      try {
        const internshipsRef = collection(db, "Internships");
        const internshipsSnapshot = await getDocs(internshipsRef);

        const allPendingInternships = [];

        for (const internshipDoc of internshipsSnapshot.docs) {
          const studentsRef = collection(db, `Internships/${internshipDoc.id}/students`);
          const studentsSnapshot = await getDocs(studentsRef);

          studentsSnapshot.forEach((studentDoc) => {
            const studentData = studentDoc.data();
            if (studentData.status === 'pending') {
              allPendingInternships.push({
                id: studentDoc.id,
                internshipId: internshipDoc.id,
                ...studentData,
              });
            }
          });
        }

        setPendingInternships(allPendingInternships);
      } catch (error) {
        console.error("Error fetching pending internships: ", error);
      }
    };

    fetchPendingInternships();
  }, []);

  const handleApproval = async (internshipId, studentId, approved) => {
    try {
      const status = approved ? "approved" : "rejected";
    
      // 1. Update the status in the Internships collection (summer internship type)
      const studentDocRef = doc(db, "Internships", internshipId, "students", studentId);
      await updateDoc(studentDocRef, {
        status,
      });
      console.log("Internship status updated in Internships collection.");
    
      // 2. Fetch the student's data to find the internship reference
      const studentDocSnapshot = await getDoc(studentDocRef);
      if (!studentDocSnapshot.exists()) {
        throw new Error("Student document not found in internships collection.");
      }
    
      const studentData = studentDocSnapshot.data();
    
      // 3. Update the status in the Students collection (students/{studentId}/internships)
      const internshipsSubRef = collection(db, "students", studentId, "internships");
      const internshipsQuerySnapshot = await getDocs(internshipsSubRef);
  
      let updated = false;
      for (const internshipDoc of internshipsQuerySnapshot.docs) {
        const internshipData = internshipDoc.data();
        if (internshipData.regNo === studentData.regNo && internshipData.internshipType === "summer") {
          const internshipSubDocRef = doc(db, "students", studentId, "internships", internshipDoc.id);
          await updateDoc(internshipSubDocRef, {
            status,
          });
          console.log("Internship status updated in Student's internships subcollection.");
          updated = true;
          break;
        }
      }
  
      if (!updated) {
        console.error("Matching internship not found in student's subcollection");
      }
    
      // 4. Update the local state to remove the approved/rejected internship from the list
      setPendingInternships(prevState =>
        prevState.filter(internship => internship.id !== studentId)
      );
    
    } catch (error) {
      console.error("Error updating internship status:", error);
    }
  };
  
  


  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Advisor Approval</h1>
      {pendingInternships.length > 0 ? (
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", marginTop: "20px" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Reg No</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Company</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Duration</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Credit</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Evaluation Form</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingInternships.map((internship) => (
              <tr key={internship.id}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{internship.name}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{internship.regNo}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{internship.companyName}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{internship.duration}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{internship.creditHours}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  <a
                    href={internship.evaluationFormURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "blue", textDecoration: "underline" }}
                  >
                    View Form
                  </a>
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  <button
                    onClick={() => handleApproval(internship.internshipId, internship.id, true)}
                    style={{ marginRight: "10px", padding: "5px 10px", backgroundColor: "green", color: "white", border: "none", cursor: "pointer" }}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleApproval(internship.internshipId, internship.id, false)}
                    style={{ padding: "5px 10px", backgroundColor: "red", color: "white", border: "none", cursor: "pointer" }}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No pending internships found.</p>
      )}
    </div>
  );
};

export default AdvisorApproval;

