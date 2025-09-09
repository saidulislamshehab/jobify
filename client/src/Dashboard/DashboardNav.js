import React from 'react';
import './DashboardNav.css';
import magnifierIcon from './NavbarIcons/magnifier.png';
import notificationIcon from './NavbarIcons/notification.png';
import chatIcon from './NavbarIcons/chat.png';
import profileIcon from './NavbarIcons/profile-user.png';

const DashboardNav = ({ user }) => {
  return (
    <header className="dashboard-header">
      <div className="header-content">
        <a href="/dashboard" className="logo">J<span className="logo-accent">O</span>BIFY</a>
        <nav className="header-nav">
          <a href="/find-work" className="nav-link">Find work</a>
          <a href="/my-projects" className="nav-link">My projects</a>
          <a href="/my-finances" className="nav-link">My finances</a>
          <a href="/find-freelancers" className="nav-link">Find freelancers</a>
        </nav>
        <div className="header-actions">
          <button className="action-btn search-btn">
            <img src={magnifierIcon} alt="Search" className="action-icon" />
          </button>
          <button className="action-btn notification-btn">
            <img src={notificationIcon} alt="Notifications" className="action-icon" />
          </button>
          <button className="action-btn message-btn">
            <img src={chatIcon} alt="Messages" className="action-icon" />
          </button>
          <div className="profile-dropdown-container">
            <button className="action-btn profile-btn">
              <img src={profileIcon} alt="Profile" className="action-icon" />
            </button>
            <div className="profile-dropdown">
              <div className="dropdown-header">
                <div className="user-name">{user?.name || 'User'}</div>
                <div className="modality-section">
                  <div className="modality-label">Modality</div>
                  <div className="modality-options">
                    <div className="modality-option active">
                      <span className="modality-text">Freelancer</span>
                      <span className="modality-check">✓</span>
                    </div>
                    <div className="modality-option">
                      <span className="modality-text">Talent full time</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dropdown-section">
                <div className="dropdown-links">
                  <a href="#" className="dropdown-link">My account</a>
                  <a href="/profile" className="dropdown-link">My profile</a>
                  <a href="#" className="dropdown-link">Membership</a>
                  <a href="#" className="dropdown-link">Certify my skills</a>
                </div>
              </div>
              <div className="dropdown-section">
                <div className="dropdown-section-title">Find Work</div>
                <div className="dropdown-links">
                  <a href="/find-work" className="dropdown-link">Find projects</a>
                  <a href="#" className="dropdown-link">Projects with my skills</a>
                  <a href="#" className="dropdown-link">My favorite clients</a>
                </div>
              </div>
              <div className="dropdown-section">
                <div className="dropdown-section-title">Hire</div>
                <div className="dropdown-links">
                  <a href="/find-freelancers" className="dropdown-link">Find freelancers</a>
                  <button className="dropdown-button">Post a project</button>
                </div>
              </div>
              <div className="dropdown-section">
                <div className="dropdown-section-title">Help</div>
                <div className="dropdown-links">
                  <a href="#" className="dropdown-link">Help Center ↗</a>
                  <a href="#" className="dropdown-link">News ↗</a>
                  <a href="#" className="dropdown-link">How it works</a>
                  <a href="#" className="dropdown-link">Get support</a>
                </div>
              </div>
              <div className="dropdown-footer">
                <div className="language-section">
                  <span className="language-label">Language</span>
                  <div className="language-options">
                    <span className="language-option active">en</span>
                    <span className="language-option">es</span>
                    <span className="language-option">pt</span>
                  </div>
                </div>
                <a href="#" className="logout-link" onClick={() => {
                  localStorage.removeItem('user');
                  sessionStorage.removeItem('user');
                  window.location.href = '/login';
                }}>Log out</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardNav;


