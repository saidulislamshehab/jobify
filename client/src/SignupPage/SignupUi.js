import React from 'react';
import { Link } from 'react-router-dom';
import './SignupUi.css';

const SignupUi = () => {
  return (
    <div className="signup-container">
      <header className="signup-header">
        <div className="signup-logo">
          <span className="logo-text">jobify</span>
          <span className="logo-dot">●</span>
        </div>
        <div className="language-selector">
          <button className="lang-button">
            English <span className="chevron">▼</span>
          </button>
        </div>
      </header>

      <main className="signup-main">
        <Link to="/" className="go-back">
          ← Go back
        </Link>
        
        <h1 className="signup-title">Hello! What brings you to Jobify?</h1>
        
        <section className="hire-section">
          <h2 className="section-title">I want to hire</h2>
          <div className="cards-container">
            <div className="signup-card">
              <div className="card-image">
                <img src="https://randomuser.me/api/portraits/men/71.jpg" alt="Developer" />
                <div className="image-decoration blue-lines"></div>
              </div>
              <div className="card-content">
                <h3 className="card-title blue">DEVELOPERS</h3>
                <p className="card-description">
                  Hire developers pre-selected and certified for a specific time period.
                </p>
              </div>
            </div>
            
            <div className="signup-card">
              <div className="card-image">
                <img src="https://randomuser.me/api/portraits/women/21.jpg" alt="Freelancer" />
                <div className="image-decoration purple-dots"></div>
              </div>
              <div className="card-content">
                <h3 className="card-title purple">FREELANCERS</h3>
                <p className="card-description">
                  Hire freelancers from various disciplines for goals or hours.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="work-section">
          <h2 className="section-title">I want to work</h2>
          <div className="cards-container">
            <Link to="/add-jobseeker" className="signup-card-link">
              <div className="signup-card">
                <div className="card-image">
                  <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Developer" />
                  <div className="image-decoration blue-lines"></div>
                </div>
                <div className="card-content">
                  <h3 className="card-title blue">DEVELOPER</h3>
                  <p className="card-description">
                    Work as a developer for a specified time period in USA and Latin American companies.
                  </p>
                </div>
              </div>
            </Link>
            
            <Link to="/add-jobseeker" className="signup-card-link">
              <div className="signup-card">
                <div className="card-image">
                  <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="Freelancer" />
                  <div className="image-decoration purple-dots"></div>
                </div>
                <div className="card-content">
                  <h3 className="card-title purple">FREELANCER</h3>
                  <p className="card-description">
                    Work as a freelancer for goals or hours in projects of various categories.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </section>
      </main>

      <footer className="signup-footer">
        <p className="footer-text">
          Have an account? <Link to="/login" className="signin-link">Sign in</Link>
        </p>
        <p className="footer-text">
          <Link to="/list-jobseekers" className="view-jobseekers-link">View Job Seekers Directory</Link>
        </p>
      </footer>
    </div>
  );
};

export default SignupUi; 