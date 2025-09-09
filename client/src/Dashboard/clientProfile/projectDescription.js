import React, { useState, useEffect } from 'react';
import './projectDescription.css';
import Footer from '../../LandingPage/footer';
import DashboardNav from '../DashboardNav';

const ProjectDescription = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const maxCharacters = 2000;

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

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxCharacters) {
      setDescription(value);
      setCharacterCount(value.length);
    }
  };

  const handleCancel = () => {
    // Navigate back to add project page
    window.location.href = '/add-project';
  };

  const handleGenerateProject = () => {
    if (description.trim()) {
      // Navigate to project review page
      window.location.href = '/project-review';
    }
  };

  if (loading) {
    return (
      <div className="project-description-page">
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
      <div className="project-description-page">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          fontSize: '18px',
          color: '#6b7280'
        }}>
          Please log in to create a project
        </div>
      </div>
    );
  }

  return (
    <div className="project-description-page">
      {/* Shared Dashboard Navigation */}
      <DashboardNav user={user} />

      {/* Progress Indicator */}
      <div className="progress-section">
        <div className="progress-container">
          <div className="progress-step active">
            <div className="step-number">01</div>
            <div className="step-text">Describe your project</div>
          </div>
          <div className="progress-line"></div>
          <div className="progress-step">
            <div className="step-number">02</div>
            <div className="step-text">Preview</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="description-content">
        <div className="content-container">
          <div className="title-section">
            <h1 className="page-title">Write an idea for your project</h1>
            <p className="page-subtitle">
              Tell us what you need and our AI will generate a full project description.
            </p>
          </div>

          <div className="form-section">
            <label htmlFor="project-description" className="form-label">
              Description
            </label>
            <div className="textarea-container">
              <textarea
                id="project-description"
                className="description-textarea"
                placeholder="Write your project idea. (e.g. I want to automate WhatsApp replies using AI)"
                value={description}
                onChange={handleDescriptionChange}
                rows={8}
              />
              <div className="character-count">
                {characterCount}/{maxCharacters}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <footer className="actions-footer">
        <div className="footer-content">
          <button className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
          <button 
            className={`generate-btn ${description.trim() ? 'active' : ''}`}
            onClick={handleGenerateProject}
            disabled={!description.trim()}
          >
            Generate project
          </button>
        </div>
      </footer>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProjectDescription;
