import React, { useState, useEffect } from 'react';
import './addProject.css';
import Footer from '../../LandingPage/footer';

const AddProject = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user data from localStorage or sessionStorage
    const getUserData = () => {
      try {
        const userData = localStorage.getItem('user') || sessionStorage.getItem('user');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          console.log('User data loaded:', parsedUser);
          setUser(parsedUser);
        } else {
          console.log('No user data found, redirecting to login');
          window.location.href = '/login';
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        window.location.href = '/login';
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, []);

  const handleGetStarted = () => {
    // Navigate to project description page
    window.location.href = '/project-description';
  };

  const handleBrowseProjects = () => {
    // Navigate to browse projects page
    console.log('Browse projects clicked');
    // You can add navigation logic here
  };

  if (loading) {
    return (
      <div className="add-project-page">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          fontSize: '18px',
          color: '#6b7280'
        }}>
          Loading...
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="add-project-page">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          fontSize: '18px',
          color: '#6b7280'
        }}>
          Please log in to post a project
        </div>
      </div>
    );
  }

  return (
    <div className="add-project-page">
      {/* Header Navigation */}
      <header className="project-header">
        <div className="header-content">
          <div className="logo">J<span className="logo-accent">O</span>BIFY</div>
          <nav className="header-nav">
            <a href="#" className="nav-link">Find work</a>
            <a href="/my-projects" className="nav-link">My projects</a>
            <a href="#" className="nav-link">My finances</a>
          </nav>
          <div className="header-actions">
            <button className="action-btn search-btn">🔍</button>
            <button className="action-btn notification-btn">🔔</button>
            <button className="action-btn message-btn">💬</button>
            <div className="profile-dropdown-container">
              <button className="action-btn profile-btn">😊</button>
              <div className="profile-dropdown">
                <div className="dropdown-header">
                  <div className="user-name">{user.name || 'SAIDUL ISLAM SHEHAB'}</div>
                  <div className="modality-section">
                    <div className="modality-label">Modality</div>
                    <div className="modality-options">
                      <div className="modality-option">
                        <span className="modality-text">Freelancer</span>
                      </div>
                      <div className="modality-option active">
                        <span className="modality-text">Talent full time</span>
                        <span className="modality-check">✓</span>
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
                  <div className="dropdown-section-title">Hire</div>
                  <div className="dropdown-links">
                    <a href="#" className="dropdown-link">Find freelancers</a>
                    <a href="/add-project" className="dropdown-button">Post a project</a>
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

      {/* Main Content */}
      <div className="project-content">
        <div className="project-container">
          <div className="greeting-section">
            <h1 className="greeting-title">
              Hi, <span className="user-name-highlight">{user.name || 'SAIDUL ISLAM'}!</span>
            </h1>
            <p className="greeting-subtitle">
              You're two steps away<br />
              from publishing your project.
            </p>
          </div>

          <div className="description-section">
            <p className="description-text">
              Write a short description and our AI will guide you to build a clear,
              tailored project brief.
            </p>
          </div>

          <div className="action-section">
            <button className="get-started-btn" onClick={handleGetStarted}>
              Get Started
            </button>
          </div>

          <div className="freelancer-section">
            <p className="freelancer-text">
              Looking for a job as a freelancer?
            </p>
            <a href="#" className="browse-link" onClick={handleBrowseProjects}>
              Browse available projects.
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AddProject;
