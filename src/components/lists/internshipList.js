import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import './internshiplist.css';  // Import the CSS file

// Sample internship data
const internshipData = [
  { companyName: 'TechCorp', duration: '3 months', earnedCreditHours: '12', departmentField: 'Software Engineering', certificateLink: '#', formCLink: '#', status: 'Completed', description: 'Worked on backend development' },
  { companyName: 'BizSolutions', duration: '6 months', earnedCreditHours: '24', departmentField: 'Business Analysis', certificateLink: '#', formCLink: '#', status: 'Ongoing', description: 'Analyzed business processes and created reports' },
  // More data...
];

const InternshipHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [statusFilter, setStatusFilter] = useState('');
  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const filteredData = internshipData.filter((internship) => {
    return internship.companyName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter ? internship.status === statusFilter : true);
  });

  return (
    <div className="internship-history-container">
      <h2 className="internship-history-title">Internship History</h2>

      <div className="search-status-section">
        <TextField
          label="Search by Company"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-bar"
        />
        
        <FormControl className="status-filter">
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            label="Status"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Ongoing">Ongoing</MenuItem>
          </Select>
        </FormControl>
      </div>
      
      <TableContainer component={Paper} className="table-container" elevation={3}>
        <Table sx={{ minWidth: 650 }} aria-label="internship history table">
          <TableHead>
            <TableRow>
              <TableCell>Company Name</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Earned Credit Hours</TableCell>
              <TableCell>Department Field</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="center">View Certificate</TableCell>
              <TableCell align="center">View Form C</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((internship, index) => (
              <TableRow key={index}>
                <TableCell>{internship.companyName}</TableCell>
                <TableCell>{internship.duration}</TableCell>
                <TableCell>{internship.earnedCreditHours}</TableCell>
                <TableCell>{internship.departmentField}</TableCell>
                <TableCell>{internship.status}</TableCell>
                <TableCell>{internship.description}</TableCell>
                <TableCell align="center">
                  <Button variant="contained" color="primary" onClick={() => window.open(internship.certificateLink, '_blank')}>
                    View Certificate
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button variant="contained" color="success" onClick={() => window.open(internship.formCLink, '_blank')}>
                    View Form C
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Action buttons (for Admin) */}
      <div className="action-buttons">
        <Button variant="outlined" color="secondary" className="add-internship-button" onClick={() => navigate('/admin/internship/add')}>
          Add New Internship
        </Button>
      </div>
    </div>
  );
};

export default InternshipHistory;
