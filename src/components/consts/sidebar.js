import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Sidebar container
const SidebarContainer = styled.div`
  width: 250px;
  background-color: #2f3b52;
  color: white;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

// User Profile section
const UserProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
`;

const UserName = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const UserEmail = styled.div`
  font-size: 14px;
  color: #ccc;
`;

// Navigation Section
const MenuSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MenuItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 12px;
  font-size: 16px;
  color: #ecf0f1;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #34495e;
  }

  &.active {
    background-color: #1a2637;
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      {/* User Profile */}
      <UserProfile>
        <ProfileImage src="https://www.w3schools.com/w3images/avatar2.png" alt="User" />
        <UserName>John Doe</UserName>
        <UserEmail>john.doe@example.com</UserEmail>
      </UserProfile>

      {/* Menu Items */}
      <MenuSection>
        <MenuItem to="/profile">Profile</MenuItem>
        <MenuItem to="/settings">Settings</MenuItem>
        <MenuItem to="/internship-history" className="active">
          Internship History
        </MenuItem>
        <MenuItem to="/new-internship">New Internship</MenuItem>
        <MenuItem to="/stats">Stats</MenuItem>
        <MenuItem to="/certificates">Certificates</MenuItem>
        <MenuItem to="/logout">Logout</MenuItem>
      </MenuSection>
    </SidebarContainer>
  );
};

export default Sidebar;
