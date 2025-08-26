import React from 'react';
import { useNavigate } from 'react-router-dom';
import './clientsignup.css';
import Footer from '../LandingPage/footer';

const ClientSignup = () => {
  const navigate = useNavigate();

  const handleGetMatched = () => {
    // Navigate to the actual signup form or hiring process
    navigate('/add-jobseeker', { state: { type: 'client', role: 'hire' } });
  };

  const handleSignUp = () => {
    navigate('/add-jobseeker', { state: { type: 'client', role: 'hire' } });
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="client-signup-container">
      {/* Header */}
      <header className="client-header">
        <div className="header-content">
          <div className="logo">J<span className="logo-accent">O</span>BIFY</div>
          <div className="header-actions">
            <button className="login-btn" onClick={handleLogin}>Log in</button>
            <button className="signup-btn" onClick={handleSignUp}>Sign up</button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="client-main-content">
        <div className="content-wrapper">
          {/* Left Side - Hiring Section */}
          <div className="hiring-section">
            <h1 className="main-headline">
              Hire <span className="highlight">Top Remote Talent</span>
            </h1>
            <p className="main-description">
              Get fast access to fully vetted developers and freelancers, ready for your projects.
            </p>
            <button className="get-matched-btn" onClick={handleGetMatched}>
              Get matched with talent
            </button>
          </div>

          {/* Right Side - Benefits Infographic */}
          <div className="benefits-section">
            <div className="benefits-infographic">
              <div className="infographic-circle">
                <div className="circle-outline"></div>
                <div className="circle-segments">
                  <div className="segment yellow"></div>
                  <div className="segment green"></div>
                  <div className="segment blue"></div>
                  <div className="segment magenta"></div>
                  <div className="segment orange"></div>
                  <div className="segment pink"></div>
                </div>
              </div>
              
              {/* Benefit Labels */}
              <div className="benefit-label top">
                <h3>High Speed</h3>
                <p>Start in 3-4 business days</p>
              </div>
              
              <div className="benefit-label bottom-left">
                <h3>High Quality Talent</h3>
                <p>Top 2% Remote Talent</p>
              </div>
              
              <div className="benefit-label bottom-right">
                <h3>Competitive Price</h3>
                <p>From $35-60/hour</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Features Section */}
      <div className="features-section">
        <div className="features-wrapper">
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>Quick Start</h3>
            <p>Get your project started in just a few days with our streamlined hiring process.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Pre-vetted Talent</h3>
            <p>All developers and freelancers are thoroughly screened and tested for quality.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Cost Effective</h3>
            <p>Save up to 60% compared to traditional hiring while maintaining quality.</p>
          </div>
        </div>
      </div>

             {/* CTA Section */}
       <div className="cta-section">
         <div className="cta-content">
           <h2>Ready to hire your next developer?</h2>
           <p>Join thousands of companies already using Jobify to build their teams</p>
           <div className="cta-buttons">
             <button className="primary-cta-btn" onClick={handleGetMatched}>
               Get Started Now
             </button>
             <button className="secondary-cta-btn" onClick={() => navigate('/contact')}>
               Learn More
             </button>
           </div>
         </div>
       </div>

       {/* Footer */}
       <Footer logoColor="#2563eb" />
     </div>
   );
 };

export default ClientSignup;
