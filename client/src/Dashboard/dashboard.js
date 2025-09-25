import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './dashboard.css';
import Footer from '../LandingPage/footer';
import DashboardNav from './DashboardNav';
import PricingPlans from './PricingPlans';
import profileIcon from './NavbarIcons/profile-user.png';
import ironIcon from './rankicons/iron.png';
import bronzeIcon from './rankicons/bronze.png';
import silverIcon from './rankicons/silver.png';
import goldIcon from './rankicons/gold.png';
import platinumIcon from './rankicons/platinum.png';

const Dashboard = () => {
  const { user, loading } = useAuth();
  const [projectsCount, setProjectsCount] = useState(0);
  const [showPricing, setShowPricing] = useState(false);

  useEffect(() => {
    const fetchProjectsCount = async () => {
      try {
        if (!user) return;
        const clientId = user.id || user._id;
        const response = await fetch(`http://localhost:5000/api/projects?clientId=${clientId}`);
        if (response.ok) {
          const data = await response.json();
          setProjectsCount(Array.isArray(data) ? data.length : 0);
        }
      } catch (err) {
        // silently ignore count errors on dashboard
      }
    };
    fetchProjectsCount();
  }, [user]);

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
          Please log in to view your dashboard
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      {/* Header Navigation (extracted component) */}
      <DashboardNav user={user} />

      <div className="dashboard-content">
        {/* Left Sidebar */}
        <aside className="dashboard-sidebar">
          {/* Profile Card */}
          <div className="profile-card">
            <div className="das-profile-header">
              <div className="profile-left">
                <img src={profileIcon} alt="Profile" className="avatar-icon" />
                <div className="profile-info">
                  <h3 className="das-profile-name">{user.name}</h3>
                </div>
              </div>
              <button className="find-work-btn">Find work</button>
            </div>
            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-label">USD 0.00</span>
                <span className="stat-desc">Available balance</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">{projectsCount}</span>
                <span className="stat-desc">Ongoing projects <span className="info-icon">i</span></span>
              </div>
            </div>
          </div>

          {/* Available Balance Card */}
          <div className="balance-card">
            <h4 className="card-title">Your available balance</h4>
            <div className="balance-warning">
              <span className="warning-icon">⚠️</span>
              <span className="warning-text">Set up your options for getting paid</span>
              <span className="dropdown-icon">▼</span>
            </div>
          </div>

          {/* Current Level Card */}
          <div className="level-card">
            <h4 className="card-title">Your current level is <span className="level-badge iron">IRON</span></h4>
            <div className="level-badges">
              <div className="level-badge active">
                <img src={ironIcon} alt="Iron" className="rank-icon" />
              </div>
              <div className="level-badge">
                <img src={bronzeIcon} alt="Bronze" className="rank-icon" />
              </div>
              <div className="level-badge">
                <img src={silverIcon} alt="Silver" className="rank-icon" />
              </div>
              <div className="level-badge">
                <img src={goldIcon} alt="Gold" className="rank-icon" />
              </div>
              <div className="level-badge">
                <img src={platinumIcon} alt="Platinum" className="rank-icon" />
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="dashboard-main">
          <h1 className="main-title">Welcome!</h1>
          
          {/* Profile Review Notification */}
          <div className="notification-card">
            <div className="notification-header">
              <span className="notification-icon">🕐</span>
              <h3 className="notification-title">We're reviewing your profile</h3>
            </div>
            <p className="notification-text">
              We review every profile in order to guarantee the quality of our freelance talent pool. 
              This process can take at least 15 days. We'll email you when your profile is approved.
            </p>
            <a href="#" className="help-link">What does it mean when it says my profile is being reviewed?</a>
          </div>

          {/* Priority Moderation Card */}
          <div className="moderation-card">
            <div className="moderation-header">
              <h3 className="moderation-title">Get to the top of the list.</h3>
              <div className="moderation-price">USD 11.90</div>
            </div>
            <p className="moderation-text">
              Start working now! Your profile will be reviewed within 24 hours. 
              If it's not approved, you get your money back. 
              <a href="#" className="help-link">Find out more about this benefit</a>
            </p>
            <button className="moderation-btn" onClick={() => setShowPricing(true)}>I want Priority Moderation!</button>
          </div>

          {/* Current Projects Empty State */}
          <div className="projects-card">
            <div className="projects-illustration">
              <div className="chart-placeholder">
                <div className="chart-bar"></div>
                <div className="chart-bar"></div>
                <div className="chart-bar"></div>
                <div className="chart-line"></div>
              </div>
            </div>
            <h3 className="projects-title">You'll see all your current projects here</h3>
            <p className="projects-subtitle">You're just a few steps away from starting your freelancing journey!</p>
            <button className="find-projects-btn">Find projects</button>
          </div>
        </main>
      </div>

      {/* Help Button */}
      <button className="help-btn">❓ Help</button>

      {/* Footer */}
      <Footer />

      {/* Pricing Plans Modal */}
      <PricingPlans isOpen={showPricing} onClose={() => setShowPricing(false)} />
    </div>
  );
};

export default Dashboard;


