import React, { useState } from "react";
import { collection, addDoc, doc, setDoc, getDoc, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../auth/firebase";
import { supabase } from "../../../supabaseClient";
import "./internshipform.css";

const InternshipSubmissionForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    regNo: "",
    companyName: "",
    duration: "",
    creditHours: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0].type === "application/pdf") {
      setFile(e.target.files[0]);
    } else {
      setError("Please upload a valid PDF file.");
    }
  };

  const uploadFile = async (file) => {
    const fileName = `${formData.regNo}-${Date.now()}.pdf`;
    const { data, error } = await supabase.storage
      .from('evaluation-forms')
      .upload(fileName, file);

    if (error) {
      throw new Error('Error uploading file: ' + error.message);
    }

    const { data: { publicUrl } } = supabase.storage
      .from('evaluation-forms')
      .getPublicUrl(fileName);

    return publicUrl;
  };

  const saveToFirestore = async (downloadURL) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw new Error("User not logged in.");
    }

    const internshipsRef = collection(db, "Internships");
    const querySnapshot = await getDocs(internshipsRef);

    let summerDocId = null;

    querySnapshot.forEach((doc) => {
      if (doc.data().internshipType === "summer") {
        summerDocId = doc.id;
      }
    });

    if (!summerDocId) {
      throw new Error("No internship document found for 'summer'.");
    }

    const studentDocRef = doc(db, "Internships", summerDocId, "students", formData.regNo);
    await setDoc(studentDocRef, {
      ...formData,
      evaluationFormURL: downloadURL,
      timestamp: new Date(),
      status: "pending",
    });

    const userDocRef = doc(db, "students", user.uid);
    const internshipsSubCollectionRef = collection(userDocRef, "internships");
    await addDoc(internshipsSubCollectionRef, {
      ...formData,
      internshipType: "summer",
      evaluationFormURL: downloadURL,
      timestamp: new Date(),
      status: "pending",
    });

    return studentDocRef;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      if (!file) {
        throw new Error("Evaluation form is required.");
      }

      const downloadURL = await uploadFile(file);
      await saveToFirestore(downloadURL);

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        regNo: "",
        companyName: "",
        duration: "",
        creditHours: "",
      });
      setFile(null);
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="form-container">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Internship Submission Form</h2>
      {success && (
        <div className="alert alert-success">
          Internship details submitted successfully!
        </div>
      )}
      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="form">
        <div className="form-grid">
          {Object.keys(formData).map((field) => (
            <div key={field} className="form-group">
              <label htmlFor={field} className="form-label">
                {field.replace(/([A-Z])/g, " $1").toUpperCase()}
              </label>
              <input
                type="text"
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                required
                className="form-input"
              />
            </div>
          ))}
        </div>

        <div className="form-group">
          <label htmlFor="evaluationForm" className="form-label">
            Evaluation Form (PDF)
          </label>
          <input
            type="file"
            id="evaluationForm"
            accept=".pdf"
            onChange={handleFileChange}
            className="file-input"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="submit-button"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </section>
  );
};

export default InternshipSubmissionForm;
