import React, { useState, useEffect } from 'react';
import './dashboard.css';
import Footer from '../LandingPage/footer';

const Dashboard = () => {
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
          // If no user data, redirect to login
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
          Please log in to view your dashboard
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      {/* Header Navigation */}
      <header className="dashboard-header">
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
                  <div className="dropdown-section-title">Hire</div>
                  <div className="dropdown-links">
                    <a href="#" className="dropdown-link">Find freelancers</a>
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

      <div className="dashboard-content">
        {/* Left Sidebar */}
        <aside className="dashboard-sidebar">
          {/* Profile Card */}
          <div className="profile-card">
            <div className="profile-avatar">
              <span className="avatar-icon">😊</span>
            </div>
            <h3 className="profile-name">{user.name || 'Scarlet Wizard'}</h3>
            <div className="rating">
              <span className="star">⭐</span>
              <span className="star">⭐</span>
              <span className="star">⭐</span>
              <span className="star">⭐</span>
              <span className="star">⭐</span>
              <span>3.5</span>
            </div>
            <button className="find-work-btn">Find work</button>
            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-label">USD 0.00</span>
                <span className="stat-desc">Available balance</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">0</span>
                <span className="stat-desc">Ongoing projects</span>
                <span className="info-icon">ℹ️</span>
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
              <div className="level-badge active">I</div>
              <div className="level-badge">B</div>
              <div className="level-badge">S</div>
              <div className="level-badge">G</div>
              <div className="level-badge">🏆</div>
            </div>
            <span className="dropdown-icon">▼</span>
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
            <button className="moderation-btn">I want Priority Moderation!</button>
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
    </div>
  );
};

export default Dashboard;


