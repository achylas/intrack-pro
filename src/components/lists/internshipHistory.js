import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../auth/firebase";
import { Link } from "react-router-dom"; // Import Link from react-router-dom for navigation
import './internshiplist.css';

const InternshipHistoryPage = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInternships = async () => {
      setLoading(true);
      setError(null);

      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) throw new Error("No user is currently logged in.");

        // Reference to the subcollection "internships" for the logged-in student
        const internshipsRef = collection(db, "students", user.uid, "internships");

        const snapshot = await getDocs(internshipsRef);

        const internshipsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setInternships(internshipsData);
      } catch (error) {
        setError(error.message || "Failed to fetch internships.");
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  return (
    <div>
      <h2>Internship History</h2>
      {loading && <p>Loading internships...</p>}
      {error && <p>Error: {error}</p>}

      {!loading && !error && internships.length === 0 && (
        <p>No internships found.</p>
      )}

      {!loading && !error && internships.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Duration</th>
              <th>Credit Hours</th>
              <th>Evaluation Form</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {internships.map((internship) => (
              <tr key={internship.id}>
                <td>
                  <Link to={`/internships/${internship.id}`}>
                    {internship.companyName}
                  </Link>
                </td>
                <td>{internship.duration}</td>
                <td>{internship.creditHours}</td>
                <td>
                  {internship.evaluationFormURL ? (
                    <a
                      href={internship.evaluationFormURL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td>{internship.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InternshipHistoryPage;
