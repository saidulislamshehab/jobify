import React, { useState, useEffect } from 'react';
import './clientProfile.css';
import Footer from '../../LandingPage/footer';
import DashboardNav from '../DashboardNav';

const ClientProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('client');
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('/man.png');

  // Update profile photo when user data changes
  useEffect(() => {
    if (user && user.profilePhoto) {
      setProfilePhoto(user.profilePhoto);
    }
  }, [user]);

  useEffect(() => {
    // Get user data from localStorage or sessionStorage
    const getUserData = async () => {
      try {
        const userData = localStorage.getItem('user') || sessionStorage.getItem('user');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          console.log('User data loaded:', parsedUser);
          setUser(parsedUser);
          
          // Migrate user data if needed
          const userId = parsedUser._id || parsedUser.id;
          if (userId) {
            try {
              const migrateResponse = await fetch(`http://localhost:5000/api/jobseekers/migrate-user-data/${userId}`, {
                method: 'PUT'
              });
              if (migrateResponse.ok) {
                console.log('User data migration completed for client profile');
              }
            } catch (migrateError) {
              console.log('Migration failed or not needed:', migrateError);
            }
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

  const compressImage = (file, maxWidth = 800, quality = 0.8) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img;
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      // Validate file size (max 10MB before compression)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }
      
      setSelectedFile(file);
      
      try {
        // Compress the image
        const compressedDataUrl = await compressImage(file);
        setPreviewUrl(compressedDataUrl);
      } catch (error) {
        console.error('Error compressing image:', error);
        alert('Error processing image. Please try again.');
      }
    }
  };

  const handleSavePhoto = async () => {
    if (previewUrl) {
      try {
        // Save photo to server
        const userId = user._id || user.id;
        if (!userId) {
          alert('User ID not found. Please log in again.');
          return;
        }

        // Test server connection first
        const testResponse = await fetch('http://localhost:5000/api/jobseekers/test');
        if (!testResponse.ok) {
          throw new Error('Server is not responding. Please make sure the server is running on port 5000.');
        }

        const response = await fetch(`http://localhost:5000/api/jobseekers/update-profile/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ profilePhoto: previewUrl })
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Photo update result:', result);
          
          // Update local user data
          const updatedUser = { 
            ...user, 
            profilePhoto: previewUrl
          };
          localStorage.setItem('user', JSON.stringify(updatedUser));
          setUser(updatedUser);
          
          setProfilePhoto(previewUrl);
          setShowPhotoModal(false);
          setSelectedFile(null);
          setPreviewUrl('');
          alert('Profile photo updated successfully!');
        } else {
          const errorData = await response.json();
          alert(`Error updating photo: ${errorData.message || 'Unknown error'}`);
        }
      } catch (error) {
        console.error('Error updating photo:', error);
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
          alert('Cannot connect to server. Please make sure the server is running on port 5000.');
        } else {
          alert(`Error updating photo: ${error.message}`);
        }
      }
    }
  };

  const handleCancelPhoto = () => {
    setShowPhotoModal(false);
    setSelectedFile(null);
    setPreviewUrl('');
  };

  const handleRemovePhoto = () => {
    setProfilePhoto('/man.png');
    setShowPhotoModal(false);
    setSelectedFile(null);
    setPreviewUrl('');
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
        {/* Profile Tabs */}
        <div className="profile-tabs">
          <button 
            className={`tab-button ${activeTab === 'freelancer' ? 'active' : ''}`}
            onClick={() => window.location.href = '/freelancer-profile'}
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
            <div className="profile-photo" onClick={() => setShowPhotoModal(true)}>
              <img 
                src={profilePhoto} 
                alt="Profile" 
              />
              <div className="photo-edit-overlay">
                <span className="edit-text">Edit Photo</span>
              </div>
            </div>
          </div>

          <div className="profile-info-section">
            <div className="profile-header-info">
              <div className="profile-name-section">
                <h1 className="profile-name">{user.name || 'SAIDUL ISLAM SHEHAB'}</h1>
                <button className="edit-icon">
                <img src="/pencil.png" alt="Edit" className="edit-icon-img" />
              </button>
              </div>

              <div className="profile-role">
                <span className="role-badge">Client</span>
              </div>
            </div>

            <div className="profile-details">
              <div className="location-section">
                <span className="location-text">{user.country || 'United States'}</span>
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

      {/* Photo Upload Modal */}
      {showPhotoModal && (
        <div className="photo-modal-overlay">
          <div className="photo-modal">
            <div className="photo-modal-header">
              <h3>Update Profile Photo</h3>
              <button 
                className="close-modal-btn"
                onClick={handleCancelPhoto}
              >
                ×
              </button>
            </div>
            
            <div className="photo-modal-content">
              <div className="photo-preview-large">
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" className="preview-image-large" />
                ) : (
                  <img src="/man.png" alt="Default Profile" className="preview-image-large" />
                )}
              </div>
              
              <div className="photo-upload-controls">
                <input
                  type="file"
                  id="photo-upload-modal"
                  accept="image/*"
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                />
                <label htmlFor="photo-upload-modal" className="upload-btn">
                  Choose Photo
                </label>
                {previewUrl && (
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                )}
              </div>
              
              <p className="upload-hint">Max file size: 10MB. Supported formats: JPG, PNG, GIF</p>
              
              <div className="modal-actions">
                <button 
                  className="cancel-btn"
                  onClick={handleCancelPhoto}
                >
                  Cancel
                </button>
                <button 
                  className="save-btn"
                  onClick={handleSavePhoto}
                  disabled={!previewUrl}
                >
                  Save Photo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ClientProfile;
