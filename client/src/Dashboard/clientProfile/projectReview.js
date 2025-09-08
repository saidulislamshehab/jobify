import React, { useState, useEffect } from 'react';
import './projectReview.css';
import Footer from '../../LandingPage/footer';

const ProjectReview = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [titleCount, setTitleCount] = useState(0);
  const [descriptionCount, setDescriptionCount] = useState(0);
  const [paymentOption, setPaymentOption] = useState('per-project');
  const [budget, setBudget] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [skillsInput, setSkillsInput] = useState('');
  const maxTitleChars = 100;
  const maxDescriptionChars = 5000;

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

  const handleTitleChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxTitleChars) {
      setTitle(value);
      setTitleCount(value.length);
    }
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxDescriptionChars) {
      setDescription(value);
      setDescriptionCount(value.length);
    }
  };

  const handlePaymentOptionChange = (option) => {
    setPaymentOption(option);
  };

  const handleBudgetChange = (e) => {
    setBudget(e.target.value);
  };

  const handleSkillRemove = (skillToRemove) => {
    setSelectedSkills(selectedSkills.filter(skill => skill !== skillToRemove));
  };

  const handleSkillsInputChange = (e) => {
    setSkillsInput(e.target.value);
  };

  const handleSkillAdd = (e) => {
    if (e.key === 'Enter' && skillsInput.trim() && selectedSkills.length < 10) {
      if (!selectedSkills.includes(skillsInput.trim())) {
        setSelectedSkills([...selectedSkills, skillsInput.trim()]);
        setSkillsInput('');
      }
    }
  };

  const handleBack = () => {
    // Navigate back to project description page
    window.location.href = '/project-description';
  };

  const handlePublish = async () => {
    try {
      // Validate required fields
      if (!title.trim()) {
        alert('Please enter a project title');
        return;
      }
      
      if (!description.trim()) {
        alert('Please enter a project description');
        return;
      }
      
      if (!budget.trim()) {
        alert('Please select a budget');
        return;
      }
      
      if (selectedSkills.length === 0) {
        alert('Please add at least one skill');
        return;
      }

      // Prepare project data
      const projectData = {
        title: title.trim(),
        description: description.trim(),
        paymentOption,
        budget: budget.trim(),
        skills: selectedSkills,
        clientId: user?.id || user?._id || 'unknown',
        clientEmail: user?.email || 'unknown@example.com'
      };

      console.log('User data:', user);
      console.log('Publishing project:', projectData);

      // Send data to server
      const response = await fetch('http://localhost:5000/api/projects/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData)
      });

      const result = await response.json();

      if (response.ok) {
        alert('Project published successfully!');
        console.log('Project created:', result);
        
        // Redirect to My Projects page
        window.location.href = '/my-projects';
      } else {
        console.error('Server error response:', result);
        console.error('Response status:', response.status);
        alert(`Error: ${result.message || 'Failed to publish project'}`);
      }
    } catch (error) {
      console.error('Network or parsing error:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      alert(`Network error: ${error.message}. Please check if the server is running.`);
    }
  };

  if (loading) {
    return (
      <div className="project-review-page">
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
      <div className="project-review-page">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          fontSize: '18px',
          color: '#6b7280'
        }}>
          Please log in to review your project
        </div>
      </div>
    );
  }

  return (
    <div className="project-review-page">
      {/* Header */}
      <header className="project-header">
        <div className="header-content">
          <div className="logo">J<span className="logo-accent">O</span>BIFY</div>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="progress-section">
        <div className="progress-container">
          <div className="progress-step completed">
            <div className="step-number">
              <span className="checkmark">✓</span>
            </div>
            <div className="step-text">Describe your project</div>
          </div>
          <div className="progress-line active"></div>
          <div className="progress-step active">
            <div className="step-number">02</div>
            <div className="step-text">Preview</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="review-content">
        <div className="content-container">
          <div className="title-section">
            <h1 className="page-title">Review your project details</h1>
            <p className="page-subtitle">
              You can review and edit any part of your project, including the payment option and budget.
            </p>
          </div>

          <div className="form-section">
            {/* Title Field */}
            <div className="form-group">
              <div className="form-header">
                <label htmlFor="project-title" className="form-label">
                  Title
                </label>
                <span className="character-count">{titleCount} / {maxTitleChars}</span>
              </div>
              <input
                id="project-title"
                type="text"
                className="title-input"
                value={title}
                onChange={handleTitleChange}
                maxLength={maxTitleChars}
              />
            </div>

            {/* Description Field */}
            <div className="form-group">
              <label htmlFor="project-description" className="form-label">
                Description
              </label>
              <div className="textarea-container">
                <textarea
                  id="project-description"
                  className="description-textarea"
                  value={description}
                  onChange={handleDescriptionChange}
                  rows={12}
                />
                <div className="character-count">
                  {descriptionCount} / {maxDescriptionChars}
                </div>
              </div>
            </div>
          </div>

          {/* Payment Option and Budget Section */}
          <div className="section-container">
            <div className="section-header">
              <h3 className="section-title">Payment option and budget</h3>
              <span className="section-icon">⌄</span>
            </div>
            <div className="section-content">
              <p className="section-description">Choose how you want to calculate your budget</p>
              
              <div className="payment-options">
                <div 
                  className={`payment-option ${paymentOption === 'hourly' ? 'selected' : ''}`}
                  onClick={() => handlePaymentOptionChange('hourly')}
                >
                  <div className="option-icon">🕐</div>
                  <div className="option-content">
                    <h4 className="option-title">Hourly</h4>
                    <p className="option-description">Recommended for ongoing tasks, frequent support, or continuous projects.</p>
                  </div>
                </div>
                
                <div 
                  className={`payment-option ${paymentOption === 'per-project' ? 'selected' : ''}`}
                  onClick={() => handlePaymentOptionChange('per-project')}
                >
                  <div className="option-badge">Recommended ✨</div>
                  <div className="option-icon">📄</div>
                  <div className="option-content">
                    <h4 className="option-title">Per Project</h4>
                    <p className="option-description">Recommended for defined tasks with a clear start and end.</p>
                  </div>
                </div>
              </div>

              <div className="budget-section">
                <label htmlFor="budget-input" className="budget-label">Set your estimated budget</label>
                <div className="budget-input-container">
                  <input
                    id="budget-input"
                    type="text"
                    className="budget-input"
                    value={budget}
                    onChange={handleBudgetChange}
                  />
                  <span className="budget-badge">Recommended ✨</span>
                  <span className="budget-dropdown">⌄</span>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="section-container">
            <div className="section-header">
              <h3 className="section-title">Skills</h3>
              <span className="section-icon">⌄</span>
            </div>
            <div className="section-content">
              <p className="section-description">We've suggested some skills. You can edit or add others from the list to improve your match with expert freelancers.</p>
              
              <div className="skills-input-container">
                <label htmlFor="skills-input" className="skills-label">Skills</label>
                <input
                  id="skills-input"
                  type="text"
                  className="skills-input"
                  placeholder="Select one or more from the list"
                  value={skillsInput}
                  onChange={handleSkillsInputChange}
                  onKeyPress={handleSkillAdd}
                />
                <p className="skills-hint">We suggest a maximum of 10 skills</p>
              </div>

              <div className="selected-skills">
                {selectedSkills.map((skill, index) => (
                  <div key={index} className="skill-tag">
                    <span className="skill-text">{skill}</span>
                    <button 
                      className="skill-remove"
                      onClick={() => handleSkillRemove(skill)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <footer className="actions-footer">
        <div className="footer-content">
          <button className="back-btn" onClick={handleBack}>
            Back
          </button>
          <button className="publish-btn" onClick={handlePublish}>
            Publish project
          </button>
        </div>
      </footer>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProjectReview;
