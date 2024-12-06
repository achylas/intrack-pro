import React, { useState } from 'react';
import './internshipform.css'; // Ensure the CSS file includes the updated grid layout styles
import Sidebar from '../../consts/sidebar';
import TopBar from '../../consts/topbar';

const InternshipForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    regNo: '',
    semester: '',
    program: '',
    department: '',
    title: '',
    company: '',
    duration: '',
    evaluationForm: null,
    taskDetails: null,
    proofImages: [],
  });
  const handleNavigation = (page) => {
    setActivePage(page);
  };
  const [activePage, setActivePage] = useState('MyInternships');
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'proofImages') {
      setFormData({ ...formData, [name]: Array.from(files) });
    } else {
      setFormData({ ...formData, [name]: files[0] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    alert('Form submitted (UI-only, no database attached yet).');
  };

  return (
      
  <div className="wholepage">
    <div className="form-container">
    <TopBar />
      <h2>Internship Submission Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Name and Registration Number */}
        <div>
          <label>Name:</label> <br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Registration Number:</label> <br />
          <input
            type="text"
            name="regNo"
            value={formData.regNo}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Semester and Program */}
        <div>
          <label>Semester:</label> <br />
          <select
            name="semester"
            value={formData.semester}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Semester</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
        </div>
        <div>
          <label>Program:</label> <br />
          <input
            type="text"
            name="program"
            value={formData.program}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Department and Internship Title */}
        <div>
          <label>Department:</label> <br />
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Internship Title:</label> <br />
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Company Name and Internship Duration */}
        <div>
          <label>Company Name:</label> <br />
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Internship Duration:</label> <br />
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            placeholder="e.g., 6 weeks"
            required
          />
        </div>

        {/* Upload Evaluation Form */}
        <div>
          <label>Upload Evaluation Form:</label> <br />
          <input
            type="file"
            name="evaluationForm"
            onChange={handleFileChange}
            required
          />
        </div>

        {/* Upload Task Details */}
        <div>
          <label>Upload Task Details:</label> <br />
          <input
            type="file"
            name="taskDetails"
            onChange={handleFileChange}
            required
          />
        </div>

        {/* Upload Proof Images */}
        <div>
          <label>Upload Proof Images:</label> <br />
          <input
            type="file"
            name="proofImages"
            onChange={handleFileChange}
            accept="image/*"
            multiple
            required
          />
        </div> <br /> <br />

        {/* Submit Button */}

<div className="buttonCont">
  <button type="submit">Submit</button>
</div>

       
      </form>
    </div>
    </div>
  );
};

export default InternshipForm;
