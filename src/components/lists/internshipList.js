import React from 'react';

const InternshipList = ({ internships }) => {
  return (
    <div className="table-container">
      <h2>My Internships</h2>
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Status</th>
            <th>Deadline</th>
          </tr>
        </thead>
        <tbody>
          {internships.length > 0 ? (
            internships.map((internship, index) => (
              <tr key={index}>
                <td>{internship.company}</td>
                <td>{internship.status ? 'Approved' : 'Pending Approval'}</td>
                <td>{internship.deadline}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No internships found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InternshipList;
