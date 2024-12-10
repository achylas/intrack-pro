import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../auth/firebase";
import './internshipDetail.css';
import { supabase } from "../../../supabaseClient";
const InternshipDetailPage = () => {
  const { internshipId } = useParams();
  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInternshipDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) throw new Error("No user is currently logged in.");

        const docRef = doc(db, "students", user.uid, "internships", internshipId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setInternship(docSnap.data());
        } else {
          setError("Internship not found.");
        }
      } catch (error) {
        setError(error.message || "Failed to fetch internship details.");
      } finally {
        setLoading(false);
      }
    };

    fetchInternshipDetails();
  }, [internshipId]);

  if (loading) return <p>Loading internship details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Internship Details</h2>
      {internship ? (
        <div className="internship-detail-container">
          <p><strong>Company Name:</strong> {internship.companyName}</p>
          <p><strong>Duration:</strong> {internship.duration}</p>
          <p><strong>Credit Hours:</strong> {internship.creditHours}</p>
          <p><strong>Evaluation Form:</strong> {internship.evaluationFormURL ? <a href={internship.evaluationFormURL} target="_blank" rel="noopener noreferrer">View</a> : "N/A"}</p>
          <p><strong>Status:</strong> {internship.status}</p>
          {/* Add more details as necessary */}
        </div>
      ) : (
        <p>No internship details available.</p>
      )}
    </div>
  );
};

export default InternshipDetailPage;

