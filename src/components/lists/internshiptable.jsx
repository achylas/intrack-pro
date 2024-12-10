import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../auth/firebase'; // Update with your Firebase config path
import { getAuth } from 'firebase/auth';// Assuming you have an auth context for the logged-in user

const InternshipDetails = () => {
  const { internshipId } = useParams(); // Get the internship ID from the URL
  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = getAuth(); // Get the logged-in user info

  useEffect(() => {
    const fetchInternshipDetails = async () => {
      try {
        setLoading(true);
        const studentDocRef = doc(db, 'students', currentUser?.regNo); // Assuming regNo is used as the document ID
        const internshipDocRef = doc(studentDocRef, 'internships', internshipId);

        const internshipSnapshot = await getDoc(internshipDocRef);
        if (internshipSnapshot.exists()) {
          setInternship(internshipSnapshot.data());
        } else {
          throw new Error('Internship details not found');
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch internship details');
      } finally {
        setLoading(false);
      }
    };

    if (currentUser?.regNo && internshipId) {
      fetchInternshipDetails();
    }
  }, [currentUser, internshipId]);

  if (loading) return <div>Loading internship details...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-5 text-center">Internship Details</h2>
      <ul className="space-y-2">
        <li>
          <strong>Company Name:</strong> {internship.companyName}
        </li>
        <li>
          <strong>Duration:</strong> {internship.duration}
        </li>
        <li>
          <strong>Credit Hours:</strong> {internship.creditHours}
        </li>
        <li>
          <strong>Evaluation Form:</strong>{' '}
          {internship.evaluationFormURL ? (
            <a
              href={internship.evaluationFormURL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              View Evaluation Form
            </a>
          ) : (
            'No Evaluation Form Uploaded'
          )}
        </li>
        {/* Add more fields as needed */}
      </ul>
    </div>
  );
};

export default InternshipDetails;
