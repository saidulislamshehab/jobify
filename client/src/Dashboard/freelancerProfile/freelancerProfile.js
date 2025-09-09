import React, { useState, useEffect } from 'react';
import './freelancerProfile.css';
import Footer from '../../LandingPage/footer';
import DashboardNav from '../DashboardNav';

const FreelancerProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('freelancer');
  const [isEditingSkills, setIsEditingSkills] = useState(false);
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [newSkillExperience, setNewSkillExperience] = useState('1 year');
  const [saving, setSaving] = useState(false);
  const [profileCompleteness, setProfileCompleteness] = useState(68);
  const [isEditingAboutMe, setIsEditingAboutMe] = useState(false);
  const [aboutMeText, setAboutMeText] = useState('');
  const [savingAboutMe, setSavingAboutMe] = useState(false);

  useEffect(() => {
    // Get user data from localStorage or sessionStorage
    const getUserData = () => {
      try {
        const userData = localStorage.getItem('user') || sessionStorage.getItem('user');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          console.log('User data loaded:', parsedUser);
          setUser(parsedUser);
          // Initialize skills from user data
          if (parsedUser.skills && Array.isArray(parsedUser.skills)) {
            setSkills(parsedUser.skills.map(skill => ({
              name: skill,
              experience: '1 year',
              certifications: '-',
              projects: '-'
            })));
          }
          // Initialize about me text
          if (parsedUser.freelancerAboutMe) {
            setAboutMeText(parsedUser.freelancerAboutMe);
          } else if (parsedUser.clientAboutMe) {
            setAboutMeText(parsedUser.clientAboutMe);
          }
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

  const handleEditSkills = () => {
    setIsEditingSkills(true);
  };

  const handleCancelSkills = () => {
    setIsEditingSkills(false);
    setNewSkill('');
    setNewSkillExperience('1 year');
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && skills.length < 3) {
      const skillToAdd = {
        name: newSkill.trim(),
        experience: newSkillExperience,
        certifications: '-',
        projects: '-'
      };
      setSkills([...skills, skillToAdd]);
      setNewSkill('');
      setNewSkillExperience('1 year');
    }
  };

  const handleRemoveSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleUpdateSkillExperience = (index, experience) => {
    const updatedSkills = [...skills];
    updatedSkills[index].experience = experience;
    setSkills(updatedSkills);
  };

  const handleSaveSkills = async () => {
    setSaving(true);
    try {
      const skillNames = skills.map(skill => skill.name);
      const response = await fetch(`http://localhost:5000/api/update-skills/${user.id || user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ skills: skillNames })
      });

      if (response.ok) {
        // Update local user data
        const updatedUser = { ...user, skills: skillNames };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        setIsEditingSkills(false);
        alert('Skills updated successfully!');
      } else {
        const errorData = await response.json();
        alert('Failed to update skills: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error updating skills:', error);
      alert('Network error: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEditAboutMe = () => {
    setIsEditingAboutMe(true);
  };

  const handleCancelAboutMe = () => {
    setIsEditingAboutMe(false);
    // Reset to original text
    if (user.freelancerAboutMe) {
      setAboutMeText(user.freelancerAboutMe);
    } else if (user.clientAboutMe) {
      setAboutMeText(user.clientAboutMe);
    } else {
      setAboutMeText('');
    }
  };

  const handleSaveAboutMe = async () => {
    setSavingAboutMe(true);
    try {
      const fieldToUpdate = activeTab === 'freelancer' ? 'freelancerAboutMe' : 'clientAboutMe';
      const response = await fetch(`http://localhost:5000/api/update-about-me/${user.id || user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          [fieldToUpdate]: aboutMeText.trim()
        })
      });

      if (response.ok) {
        // Update local user data
        const updatedUser = { 
          ...user, 
          [fieldToUpdate]: aboutMeText.trim()
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        setIsEditingAboutMe(false);
        alert('About me updated successfully!');
      } else {
        const errorData = await response.json();
        alert('Failed to update about me: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error updating about me:', error);
      alert('Network error: ' + error.message);
    } finally {
      setSavingAboutMe(false);
    }
  };

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
                  <div className="skills-actions">
                    {isEditingSkills ? (
                      <>
                        <button className="cancel-button" onClick={handleCancelSkills}>
                          Cancel
                        </button>
                        <button 
                          className="save-button" 
                          onClick={handleSaveSkills}
                          disabled={saving}
                        >
                          {saving ? 'Saving...' : 'Save'}
                        </button>
                      </>
                    ) : (
                      <button className="edit-button" onClick={handleEditSkills}>
                        Edit
                      </button>
                    )}
                  </div>
                </div>

                {isEditingSkills ? (
                  <div className="skills-edit-container">
                    {/* Skills Table */}
                    <div className="skills-table">
                      <div className="skills-table-header">
                        <div className="table-column">Skills</div>
                        <div className="table-column">Certifications</div>
                        <div className="table-column">Projects worked</div>
                        <div className="table-column">Experience years</div>
                        <div className="table-column">Actions</div>
                      </div>
                      
                      {skills.map((skill, index) => (
                        <div key={index} className="skills-table-row">
                          <div className="table-column skill-name">{skill.name}</div>
                          <div className="table-column">{skill.certifications}</div>
                          <div className="table-column">{skill.projects}</div>
                          <div className="table-column">
                            <select
                              value={skill.experience}
                              onChange={(e) => handleUpdateSkillExperience(index, e.target.value)}
                              className="experience-dropdown"
                            >
                              <option value="1 year">1 year</option>
                              <option value="2 years">2 years</option>
                              <option value="3 years">3 years</option>
                              <option value="4 years">4 years</option>
                              <option value="5+ years">5+ years</option>
                            </select>
                          </div>
                          <div className="table-column">
                            <button 
                              className="delete-skill-btn"
                              onClick={() => handleRemoveSkill(index)}
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Add New Skill Section */}
                    <div className="add-skill-section">
                      <div className="skill-limit-message">
                        <span>You can only choose 3 elements</span>
                        <span className="search-icon">🔍</span>
                      </div>
                      
                      <div className="add-skill-inputs">
                        <div className="skill-input-group">
                          <label>Experience</label>
                          <select
                            value={newSkillExperience}
                            onChange={(e) => setNewSkillExperience(e.target.value)}
                            className="experience-select"
                          >
                            <option value="1 year">1 year</option>
                            <option value="2 years">2 years</option>
                            <option value="3 years">3 years</option>
                            <option value="4 years">4 years</option>
                            <option value="5+ years">5+ years</option>
                          </select>
                        </div>
                        
                        <div className="skill-input-group">
                          <input
                            type="text"
                            placeholder="Enter skill name"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            className="skill-name-input"
                            disabled={skills.length >= 3}
                          />
                          <button
                            className={`add-skill-btn ${skills.length >= 3 ? 'disabled' : ''}`}
                            onClick={handleAddSkill}
                            disabled={skills.length >= 3 || !newSkill.trim()}
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="skills-display">
                    {skills.length > 0 ? (
                      <div className="skills-list">
                        {skills.map((skill, index) => (
                          <div key={index} className="skill-item">
                            <span className="skill-name">{skill.name}</span>
                            <span className="skill-experience">{skill.experience}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="no-skills">No skills added yet. Click Edit to add skills.</p>
                    )}
                  </div>
                )}
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
                  <div className="about-me-actions">
                    {isEditingAboutMe ? (
                      <>
                        <button className="cancel-button" onClick={handleCancelAboutMe}>
                          Cancel
                        </button>
                        <button 
                          className="save-button" 
                          onClick={handleSaveAboutMe}
                          disabled={savingAboutMe}
                        >
                          {savingAboutMe ? 'Saving...' : 'Save'}
                        </button>
                      </>
                    ) : (
                      <button className="edit-icon" onClick={handleEditAboutMe}>
                        ✏️
                      </button>
                    )}
                  </div>
                </div>

                {isEditingAboutMe ? (
                  <div className="about-me-edit-container">
                    <textarea
                      value={aboutMeText}
                      onChange={(e) => setAboutMeText(e.target.value)}
                      className="about-me-textarea"
                      placeholder="Tell us about yourself as a freelancer..."
                      rows={6}
                    />
                    <div className="character-count">
                      {aboutMeText.length}/1000 characters
                    </div>
                  </div>
                ) : (
                  <div className="about-me-content">
                    {aboutMeText ? (
                      <p className="about-me-text">{aboutMeText}</p>
                    ) : (
                      <p className="no-about-me">No about me information yet. Click the edit button to add your story.</p>
                    )}
                  </div>
                )}
              </div>

              {/* Experience Section */}
              <div className="work-history-section">
                <div className="section-header">
                  <h3>Experience</h3>
                  <button className="edit-icon">✏️</button>
                </div>
              </div>

              {/* Education Section */}
              <div className="certifications-section">
                <div className="section-header">
                  <h3>Education</h3>
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
                  <div className="about-me-actions">
                    {isEditingAboutMe ? (
                      <>
                        <button className="cancel-button" onClick={handleCancelAboutMe}>
                          Cancel
                        </button>
                        <button 
                          className="save-button" 
                          onClick={handleSaveAboutMe}
                          disabled={savingAboutMe}
                        >
                          {savingAboutMe ? 'Saving...' : 'Save'}
                        </button>
                      </>
                    ) : (
                      <button className="edit-icon" onClick={handleEditAboutMe}>
                        ✏️
                      </button>
                    )}
                  </div>
                </div>

                {isEditingAboutMe ? (
                  <div className="about-me-edit-container">
                    <textarea
                      value={aboutMeText}
                      onChange={(e) => setAboutMeText(e.target.value)}
                      className="about-me-textarea"
                      placeholder="Tell us about yourself as a client..."
                      rows={6}
                    />
                    <div className="character-count">
                      {aboutMeText.length}/1000 characters
                    </div>
                  </div>
                ) : (
                  <div className="about-me-content">
                    {aboutMeText ? (
                      <p className="about-me-text">{aboutMeText}</p>
                    ) : (
                      <p className="no-about-me">No about me information yet. Click the edit button to add your story.</p>
                    )}
                  </div>
                )}
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
