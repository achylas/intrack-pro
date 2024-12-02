import React from 'react';

const Certificates = () => {
  const certificates = [
    { id: 1, title: 'React Internship Certificate', date: '2024-11-01' },
    { id: 2, title: 'JavaScript Advanced Certificate', date: '2024-10-15' },
  ];

  return (
    <div style={{ marginTop: '20px', padding: '20px', background: '#fff', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <h2>My Certificates</h2>
      <ul>
        {certificates.map((certificate) => (
          <li key={certificate.id} style={{ marginBottom: '10px' }}>
            <strong>{certificate.title}</strong> - {certificate.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Certificates;
