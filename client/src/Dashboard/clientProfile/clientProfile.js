import React, { useState, useEffect } from 'react';
import './clientProfile.css';
import Footer from '../../LandingPage/footer';
import DashboardNav from '../DashboardNav';

const ClientProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('client');

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

  if (loading) {
    return (
      <div className="profile-page">
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
      <div className="profile-page">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          fontSize: '18px',
          color: '#6b7280'
        }}>
          Please log in to view your profile
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      {/* Shared Dashboard Navigation */}
      <DashboardNav user={user} />

      <div className="profile-content">
        {/* Profile Tabs */}
        <div className="profile-tabs">
          <button 
            className={`tab-button ${activeTab === 'freelancer' ? 'active' : ''}`}
            onClick={() => setActiveTab('freelancer')}
          >
            My Profile As Freelancer
          </button>
          <button 
            className={`tab-button ${activeTab === 'client' ? 'active' : ''}`}
            onClick={() => setActiveTab('client')}
          >
            My Profile As Client
          </button>
        </div>

        {/* Main Profile Card */}
        <div className="main-profile-card">
          <div className="profile-photo-section">
            <div className="profile-photo">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" 
                alt="Profile" 
              />
              <button className="photo-edit-icon">
                <img src="/src/Dashboard/freelancerProfile/pencil.png" alt="Edit" className="photo-edit-icon-img" />
              </button>
            </div>
          </div>

          <div className="profile-info-section">
            <div className="profile-header-info">
              <div className="profile-name-section">
                <h1 className="profile-name">{user.name || 'SAIDUL ISLAM SHEHAB'}</h1>
                <button className="edit-icon">
                <img src="/src/Dashboard/freelancerProfile/pencil.png" alt="Edit" className="edit-icon-img" />
              </button>
              </div>

              <div className="profile-role">
                <span className="role-badge">Client</span>
              </div>
            </div>

            <div className="profile-details">
              <div className="location-section">
                <span className="flag">🇺🇸</span>
                <span className="location-text">United States</span>
              </div>

            </div>

            <div className="profile-actions">
              <div className="hourly-rate-section">
                <span className="rate-label">Hourly rate</span>
                <span className="rate-value">$0.00</span>
                <span className="rate-dash">-</span>
              </div>

              <div className="profile-visibility">
                <div className="visibility-option">
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                  <span className="visibility-label">Profile visibility: Public</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Client Stats Section */}
        <div className="client-stats">
          <div className="stat-row">
            <span className="stat-label">Projects posted</span>
            <span className="stat-value">0</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Freelancers hired</span>
            <span className="stat-value">0</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Total spent</span>
            <span className="stat-value">$0.00</span>
          </div>
        </div>

        {/* Account Activity Section */}
        <div className="account-activity">
          <div className="activity-row">
            <span className="activity-label">Member since</span>
            <span className="activity-value">January 2024</span>
          </div>
          <div className="activity-row">
            <span className="activity-label">Last active</span>
            <span className="activity-value">Today</span>
          </div>
        </div>

        {/* About Me Section */}
        <div className="about-section">
          <div className="section-header">
            <h3>About me</h3>
            <button className="edit-button">Edit</button>
          </div>
        </div>

        {/* Work History Section */}
        <div className="work-history-section">
          <div className="section-header">
            <h3>Work history</h3>
            <button className="edit-button">Edit</button>
          </div>
        </div>

        {/* Certifications Section */}
        <div className="certifications-section">
          <div className="section-header">
            <h3>Certifications (0)</h3>
            <button className="edit-button">Edit</button>
          </div>
        </div>

        {/* Languages Section */}
        <div className="languages-section">
          <div className="section-header">
            <h3>Languages</h3>
            <button className="edit-button">Edit</button>
          </div>
          <div className="language-content">
            <p className="language-text">English: Native or Bilingual</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ClientProfile;
