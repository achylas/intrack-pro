import React, { useState } from 'react';

const AddInternshipForm = () => {
  const [formData, setFormData] = useState({
    company: '',
    formC: null, // File input for Form C
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, formC: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to upload form and save to Firestore
    console.log('Submitting Internship:', formData);
  };

  return (
    <div>
      <h2>Add Internship</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Company Name:
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Upload Form C:
          <input type="file" onChange={handleFileChange} required />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddInternshipForm;
