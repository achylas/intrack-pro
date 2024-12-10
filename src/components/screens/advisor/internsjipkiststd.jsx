import React, { useState, useEffect } from "react";
import { db } from "../../auth/firebase"; // Import your Firebase config
import { collection, getDocs } from "firebase/firestore";
import { supabase } from "../../../supabaseClient"; // Make sure you have set up supabase correctly

const InternshipList = () => {
  const [students, setStudents] = useState([]);
  const [evaluationFormURL, setEvaluationFormURL] = useState(null);

  // Fetch all internships and their details
  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const internshipsRef = collection(db, "Internships");
        const internshipsSnapshot = await getDocs(internshipsRef);

        if (internshipsSnapshot.empty) {
          return;
        }

        const allStudents = [];

        for (const internshipDoc of internshipsSnapshot.docs) {
          const studentsRef = collection(db, `Internships/${internshipDoc.id}/students`);
          const studentsSnapshot = await getDocs(studentsRef);

          studentsSnapshot.forEach((studentDoc) => {
            allStudents.push({
              id: studentDoc.id,
              ...studentDoc.data(),
            });
          });
        }

        setStudents(allStudents);
      } catch (error) {
        console.error("Error fetching internships: ", error);
      }
    };

    fetchInternships();
  }, []);

  // Fetch Evaluation Form URL from Supabase Storage
  const fetchEvaluationForm = async (filePath) => {
    try {
      const { data, error } = await supabase.storage
        .from("evaluation-forms") // assuming your storage bucket is named "evaluation-forms"
        .getPublicUrl(filePath);

      if (error) {
        console.error("Error fetching evaluation form: ", error.message);
        return;
      }
      setEvaluationFormURL(data.publicUrl); // Set the URL to display
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "'Roboto', sans-serif",
        backgroundColor: "#f5f7fa",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#2c3e50",
          fontSize: "2.5rem",
          marginBottom: "40px",
          fontWeight: "600",
        }}
      >
        Internship Management
      </h1>

      {/* Students List */}
      {students.length > 0 ? (
        <div
          style={{
            overflowX: "auto",
            borderRadius: "8px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
            }}
          >
            <thead
              style={{
                backgroundColor: "#34495e",
                color: "#ecf0f1",
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              <tr>
                <th style={{ padding: "15px", border: "1px solid #ddd" }}>#</th>
                <th style={{ padding: "15px", border: "1px solid #ddd" }}>Name</th>
                <th style={{ padding: "15px", border: "1px solid #ddd" }}>Reg No</th>
                <th style={{ padding: "15px", border: "1px solid #ddd" }}>Company</th>
                <th style={{ padding: "15px", border: "1px solid #ddd" }}>Duration</th>
                <th style={{ padding: "15px", border: "1px solid #ddd" }}>Credit</th>
                <th style={{ padding: "15px", border: "1px solid #ddd" }}>Evaluation Form</th>
                <th style={{ padding: "15px", border: "1px solid #ddd" }}>Tasks</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr
                  key={student.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#ecf0f1" : "#fff",
                    transition: "background-color 0.3s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f1f3f5")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = index % 2 === 0 ? "#ecf0f1" : "#fff")
                  }
                >
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>{index + 1}</td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>{student.name}</td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>{student.regNo}</td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>{student.companyName}</td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>{student.duration}</td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>{student.creditHours}</td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                    <button
                      onClick={() => fetchEvaluationForm(student.evaluationFormLink)}
                      style={{
                        color: "#3498db",
                        backgroundColor: "transparent",
                        border: "none",
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                    >
                      View Form
                    </button>
                  </td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                    <ul style={{ margin: "0", padding: "0", listStyleType: "none" }}>
                      {student.tasks?.map((task, i) => (
                        <li
                          key={i}
                          style={{
                            background: "#e7f3ff",
                            borderRadius: "4px",
                            marginBottom: "6px",
                            padding: "8px",
                          }}
                        >
                          {task}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p
          style={{
            textAlign: "center",
            fontSize: "1.2rem",
            color: "#7f8c8d",
            marginTop: "20px",
          }}
        >
          No internships found.
        </p>
      )}

      {/* Display evaluation form if URL is available */}
      {evaluationFormURL && (
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <h3>Evaluation Form</h3>
          <iframe
            src={evaluationFormURL}
            width="100%"
            height="600px"
            style={{ border: "none" }}
            title="Evaluation Form"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default InternshipList;
