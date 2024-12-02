import React from 'react';
import { FaSearch, FaBell, FaComment, FaCaretDown } from 'react-icons/fa'; // Importing necessary icons

const TopBar = () => {
  return (
    <div className="topbar">
      <div className="search-container">
        <input type="text" placeholder="Search here..." className="search-bar" />
        <FaSearch className="search-icon" />
      </div>
      <div className="notification-container">
        <FaComment className="notification-icon" />
        <FaBell className="notification-icon" />
      </div>
      <div className="language-dropdown">
        <button className="language-button">
          English <FaCaretDown />
        </button>
      </div>
    </div>
  );
};

export default TopBar;
