import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddJobSeeker.css';

const AddJobSeeker = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Basic validation
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError('Please enter both first and last name');
      setIsLoading(false);
      return;
    }
    
    if (!formData.email.trim()) {
      setError('Please enter your email address');
      setIsLoading(false);
      return;
    }
    
    if (!formData.password || formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }
    
    if (!acceptTerms) {
      setError('Please accept the Terms & Conditions');
      setIsLoading(false);
      return;
    }

    try {
      // Create a job seeker with the form data
      const jobSeekerData = {
        name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        email: formData.email.trim().toLowerCase(),
        password: formData.password
      };

      console.log('Sending data to MongoDB:', jobSeekerData);

      // Connect to MongoDB and create job seeker
      const response = await axios.post('http://localhost:5000/api/jobseekers/create', jobSeekerData);
      
      if (response.status === 201) {
        console.log('Job seeker created successfully in MongoDB:', response.data);
        alert('Account created successfully! You can now login and complete your profile.');
        navigate('/login');
      } else {
        setError('Failed to create account. Please try again.');
      }
    } catch (error) {
      console.error('Error details:', error);
      
      if (error.response) {
        // Server responded with error status
        console.error('Server error:', error.response.data);
        setError(error.response.data.message || 'Server error occurred');
      } else if (error.request) {
        // Request was made but no response received
        console.error('Network error:', error.request);
        setError('Cannot connect to server. Please check if server is running.');
      } else {
        // Something else happened
        console.error('Other error:', error.message);
        setError(`Error: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    alert('Google signup functionality coming soon!');
  };

  const handleAppleSignup = () => {
    alert('Apple signup functionality coming soon!');
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        {/* Left Panel - Promotional */}
        <div className="signup-promotional-panel">
          <div className="promotional-content">
            <h2>Create your Account</h2>
            <p>Share your artwork and Get projects!</p>
          </div>
        </div>

        {/* Right Panel - Sign Up Form */}
        <div className="signup-form-panel">
          <div className="form-content">
            <h1>Sign Up</h1>
            
            <form onSubmit={handleSubmit} className="signup-form">
              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}
              
              <div className="form-group">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  required
                  className="form-input"
                  disabled={isLoading}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  required
                  className="form-input"
                  disabled={isLoading}
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  required
                  className="form-input"
                  disabled={isLoading}
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                  className="form-input"
                  minLength="6"
                  disabled={isLoading}
                />
              </div>

              <div className="terms-checkbox">
                <label className="checkbox-wrapper">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    required
                    disabled={isLoading}
                  />
                  <span className="checkmark"></span>
                  Accept Terms & Conditions
                </label>
              </div>

              <button 
                type="submit" 
                className="join-button"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Join us →'}
              </button>
            </form>

            <div className="divider">
              <span>or</span>
            </div>

            <div className="social-buttons">
              <button 
                type="button" 
                className="social-button google"
                onClick={handleGoogleSignup}
              >
                <img src={require('./Google.png')} alt="Google" className="social-icon" />
              </button>

              <button 
                type="button" 
                className="social-button apple"
                onClick={handleAppleSignup}
              >
                <img src={require('./apple.png')} alt="Apple" className="social-icon" />
              </button>

              <button 
                type="button" 
                className="social-button facebook"
                onClick={handleGoogleSignup}
              >
                <img src={require('./facebook.png')} alt="Facebook" className="social-icon" />
              </button>
            </div>

            <div className="login-link">
              Already have an account? <span onClick={() => navigate('/login')}>Log in</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddJobSeeker;
