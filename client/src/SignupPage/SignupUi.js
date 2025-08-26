import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignupUi.css';

const SignupUi = () => {
  const navigate = useNavigate();

  const handleOptionSelect = (option) => {
    // Navigate to appropriate signup form based on selection
    switch(option) {
      case 'hire-developers':
        navigate('/clientsignup', { state: { type: 'developer', role: 'hire' } });
        break;
      case 'hire-freelancers':
        navigate('/clientsignup', { state: { type: 'freelancer', role: 'hire' } });
        break;
      case 'work-developer':
        navigate('/add-jobseeker', { state: { type: 'developer', role: 'work' } });
        break;
      case 'work-freelancer':
        navigate('/add-jobseeker', { state: { type: 'freelancer', role: 'work' } });
        break;
      default:
        navigate('/add-jobseeker');
    }
  };

  return (
    <div className="onboarding-container">
      {/* Header */}
      <header className="onboarding-header">
        <Link to="/" className="go-back-link">
          <span className="go-back-arrow">←</span>
          Go back
        </Link>
      </header>

      {/* Main Content */}
      <main className="onboarding-main">
        <div className="onboarding-content">
          <h1 className="onboarding-title">
            Hello! What brings you to Jobify?
          </h1>

          {/* I want to hire section */}
          <div className="options-section">
            <h2 className="section-title">I want to hire</h2>
            <div className="options-grid">
              <div 
                className="option-card developers-card"
                onClick={() => handleOptionSelect('hire-developers')}
              >
                <div className="option-avatar">
                  <img 
                    src="https://randomuser.me/api/portraits/men/32.jpg" 
                    alt="Developer" 
                    className="avatar-image"
                  />
                  <div className="avatar-pattern blue-pattern"></div>
                </div>
                <div className="option-content">
                  <h3 className="option-title">DEVELOPERS</h3>
                  <p className="option-description">
                    Hire developers pre-selected and certified for a specific time period
                  </p>
                </div>
              </div>

              <div 
                className="option-card freelancers-card"
                onClick={() => handleOptionSelect('hire-freelancers')}
              >
                <div className="option-avatar">
                  <img 
                    src="https://randomuser.me/api/portraits/women/65.jpg" 
                    alt="Freelancer" 
                    className="avatar-image"
                  />
                  <div className="avatar-pattern purple-pattern"></div>
                </div>
                <div className="option-content">
                  <h3 className="option-title">FREELANCERS</h3>
                  <p className="option-description">
                    Hire freelancers from various disciplines for goals or hours
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* I want to work section */}
          <div className="options-section">
            <h2 className="section-title">I want to work</h2>
            <div className="options-grid">
              <div 
                className="option-card developer-work-card"
                onClick={() => handleOptionSelect('work-developer')}
              >
                <div className="option-avatar">
                  <img 
                    src="https://randomuser.me/api/portraits/women/44.jpg" 
                    alt="Developer" 
                    className="avatar-image"
                  />
                  <div className="avatar-pattern blue-pattern"></div>
                </div>
                <div className="option-content">
                  <h3 className="option-title">DEVELOPER</h3>
                  <p className="option-description">
                    Work as a developer for a specified time period in USA and Latin American companies
                  </p>
                </div>
              </div>

              <div 
                className="option-card freelancer-work-card"
                onClick={() => handleOptionSelect('work-freelancer')}
              >
                <div className="option-avatar">
                  <img 
                    src="https://randomuser.me/api/portraits/men/75.jpg" 
                    alt="Freelancer" 
                    className="avatar-image"
                  />
                  <div className="avatar-pattern purple-pattern"></div>
                </div>
                <div className="option-content">
                  <h3 className="option-title">FREELANCER</h3>
                  <p className="option-description">
                    Work as a freelancer for goals or hours in projects of various categories
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="onboarding-footer">
        <p className="signin-text">
          Have an account? <Link to="/login" className="signin-link">Sign in</Link>
        </p>
      </footer>
    </div>
  );
};

export default SignupUi; 