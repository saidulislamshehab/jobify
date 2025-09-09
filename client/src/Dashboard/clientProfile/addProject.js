import React, { useState, useEffect } from 'react';
import './addProject.css';
import Footer from '../../LandingPage/footer';
import DashboardNav from '../DashboardNav';

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
    // Navigate directly to project review page
    window.location.href = '/project-review';
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
      {/* Shared Dashboard Navigation */}
      <DashboardNav user={user} />

      {/* Main Content */}
      <div className="project-content">
        <div className="project-container">
          <div className="greeting-section">
            <h1 className="greeting-title">
              Hi, <span className="user-name-highlight">{user.name || 'SAIDUL ISLAM'}!</span>
            </h1>
            <p className="greeting-subtitle">
              You're one step away<br />
              from publishing your project.
            </p>
          </div>

          <div className="description-section">
            <p className="description-text">
              Create your project details and publish it to start receiving bids from freelancers.
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
