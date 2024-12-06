import React from 'react';
import { Sidebar, Menu, MenuItem, ProSidebarProvider } from 'react-pro-sidebar';
import { useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaHistory, FaFileAlt, FaCog, FaUser, FaCertificate } from 'react-icons/fa';
import styled from 'styled-components'; // Import styled-components

const SidebarComponent = () => {
  const navigate = useNavigate();

  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    regNo: '123456',
    image: 'https://via.placeholder.com/100', // Replace with actual image URL
  };

  return (
    <ProSidebarProvider>
      
      <SidebarWrapper class="color">
        {/* User Info Section */}
        <UserInfo>
          <img src={user.image} alt="User" />
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <p>Reg No: {user.regNo}</p>
        </UserInfo>

        {/* Navigation Menu */}
        
        <Menu>
          <MenuItem onClick={() => navigate('/dashboard')} icon={<FaTachometerAlt />}>
            Dashboard
          </MenuItem>
          <MenuItem onClick={() => navigate('/internship-history')} icon={<FaHistory />}>
            Internship History
          </MenuItem>
          <MenuItem onClick={() => navigate('/new-internship-form')} icon={<FaFileAlt />}>
            New Internship Form
          </MenuItem>
          <MenuItem onClick={() => navigate('/settings')} icon={<FaCog />}>
            Settings
          </MenuItem>
          <MenuItem onClick={() => navigate('/profile')} icon={<FaUser />}>
            Profile
          </MenuItem>
          <MenuItem onClick={() => navigate('/my-certificates')} icon={<FaCertificate />}>
            My Certificates
          </MenuItem>
        </Menu>
      </SidebarWrapper>
    </ProSidebarProvider>
  );
};

// Styled-components for styling the sidebar
const SidebarWrapper = styled(Sidebar)`
  height: 98vh;
  background-color: pink ;
`;

const UserInfo = styled.div`
  text-align: center;
  padding: 20px;
  .root{
  background-color: #000080;
  }
  
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-bottom: 10px;
    border: 3px solid #ffffff;
  }

  h3 {
    margin: 10px 0;
    font-size: 18px;
    font-weight: bold;
  }

  p {
    font-size: 14px;
    color: #000080;
  }
`;

export default SidebarComponent;
