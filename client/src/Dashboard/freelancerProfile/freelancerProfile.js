import React, { useState, useEffect } from 'react';
import './freelancerProfile.css';
import Footer from '../../LandingPage/footer';

const FreelancerProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('freelancer');
  const [profileCompleteness, setProfileCompleteness] = useState(68);

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
      {/* Header Navigation */}
      <header className="profile-header">
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
                    <a href="#" className="dropdown-link">My profile</a>
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

      <div className="profile-content">
        {/* Main Content */}
        <main className="profile-main">
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
          {activeTab === 'freelancer' ? (
            <div className="main-profile-card">
              <div className="profile-photo-section">
                <div className="profile-photo">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" 
                    alt="Profile" 
                  />
                </div>
              </div>

              <div className="profile-info-section">
                <div className="profile-name-section">
                  <h1 className="profile-name">{user.name || 'SAIDUL ISLAM SHEHAB'}</h1>
                  <button className="edit-icon">✏️</button>
                </div>

                <div className="profile-role">
                  <span className="role-text">Front-end Developer</span>
                </div>

                <div className="rating-section">
                  <div className="stars">
                    <span className="star">☆</span>
                    <span className="star">☆</span>
                    <span className="star">☆</span>
                    <span className="star">☆</span>
                    <span className="star">☆</span>
                  </div>
                  <span className="rating-text">No ratings yet</span>
                </div>

                <div className="location-section">
                  <span className="flag">🇺🇸</span>
                  <span className="location-text">United States</span>
                </div>

                <div className="tagline-section">
                  <span className="tagline">Freelancer expert in IT & Programming</span>
                </div>

                <div className="hourly-rate-section">
                  <div className="rate-label">Hourly rate</div>
                  <div className="rate-value">
                    <span className="rate-dash">—</span>
                    <button className="edit-icon">✏️</button>
                  </div>
                </div>

                <div className="profile-visibility">
                  <div className="visibility-option">
                    <label className="toggle-switch">
                      <input type="checkbox" />
                      <span className="slider"></span>
                    </label>
                    <span className="visibility-label">Agency Profile</span>
                  </div>
                  <div className="visibility-option">
                    <label className="toggle-switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                    <span className="visibility-label">Public Profile</span>
                  </div>
                </div>

                <div className="skills-prompt">
                  <span className="prompt-text">Choose your three main skills</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="main-profile-card client-profile">
              <div className="profile-photo-section">
                <div className="profile-photo">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" 
                    alt="Profile" 
                  />
                  <button className="photo-edit-icon">✏️</button>
                </div>
              </div>

              <div className="profile-info-section">
                <div className="profile-name-section">
                  <h1 className="profile-name">{user.name || 'SAIDUL ISLAM SHEHAB'}</h1>
                  <button className="edit-icon">✏️</button>
                </div>

                <div className="rating-section">
                  <div className="stars">
                    <span className="star">⭐</span>
                    <span className="star">⭐</span>
                    <span className="star">⭐</span>
                    <span className="star">⭐</span>
                    <span className="star">⭐</span>
                  </div>
                  <span className="rating-text">0/5</span>
                </div>

                <div className="location-section">
                  <span className="flag">🇺🇸</span>
                  <span className="location-text">United States</span>
                </div>

                <div className="client-stats">
                  <div className="stat-row">
                    <span className="stat-label">Projects published:</span>
                    <span className="stat-value">0</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Projects paid:</span>
                    <span className="stat-value">0 (0%)</span>
                  </div>
                </div>

                <div className="account-activity">
                  <div className="activity-row">
                    <span className="activity-label">Last login:</span>
                    <span className="activity-value">23 hours ago</span>
                  </div>
                  <div className="activity-row">
                    <span className="activity-label">Registered since:</span>
                    <span className="activity-value">July 2025</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Conditional Content Based on Active Tab */}
          {activeTab === 'freelancer' ? (
            <>
              {/* Iron Level Section */}
              <div className="iron-level-section">
                <div className="level-header">
                  <h3>WHAT IS THE IRON PROFILE LEVEL?</h3>
                  <div className="info-badge">i</div>
                </div>
                <p className="level-description">
                  Iron is the starting level on Workana. Make good bids, obtain the best ratings, and add up your earnings to achieve more benefits. <a href="#" className="read-more-link">Read more</a>
                </p>
              </div>

              {/* Skills Section */}
              <div className="skills-section">
                <div className="skills-header">
                  <h3>Skills (Maximum: 3)</h3>
                  <button className="edit-button">Edit</button>
                </div>
              </div>

              {/* Featured Projects Section */}
              <div className="featured-projects-section">
                <div className="section-description">
                  <p>In this section, you can include the projects you've worked on</p>
                </div>
                <div className="projects-cards">
                  <div className="project-card add-project">
                    <div className="project-icon">+</div>
                    <span className="project-text">Add project</span>
                  </div>
                  <div className="project-card link-account">
                    <div className="project-icon behance">Bē</div>
                    <span className="project-text">Link account</span>
                  </div>
                </div>
              </div>

              {/* About Me Section */}
              <div className="about-section">
                <div className="section-header">
                  <h3>About me</h3>
                  <button className="edit-icon">✏️</button>
                </div>
              </div>

              {/* Work History Section */}
              <div className="work-history-section">
                <div className="section-header">
                  <h3>Work history</h3>
                  <button className="edit-icon">✏️</button>
                </div>
              </div>

              {/* Certifications Section */}
              <div className="certifications-section">
                <div className="section-header">
                  <h3>Certifications (0)</h3>
                  <button className="edit-icon">✏️</button>
                </div>
              </div>

              {/* Languages Section */}
              <div className="languages-section">
                <div className="section-header">
                  <h3>Languages</h3>
                  <button className="edit-icon">✏️</button>
                </div>
                <div className="language-content">
                  <span className="language-text">English Native or bilingual</span>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* About Me Section for Client */}
              <div className="about-section">
                <div className="section-header">
                  <h3>About me</h3>
                  <button className="edit-icon">✏️</button>
                </div>
              </div>
            </>
          )}
        </main>

      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FreelancerProfile;
