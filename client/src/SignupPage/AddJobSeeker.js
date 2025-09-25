import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './AddJobSeeker.css';

const AddJobSeeker = () => {
  const navigate = useNavigate();
  const { register, loading, error } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    
    // Basic validation
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setLocalError('Please enter both first and last name');
      return;
    }
    
    if (!formData.email.trim()) {
      setLocalError('Please enter your email address');
      return;
    }
    
    if (!formData.password || formData.password.length < 6) {
      setLocalError('Password must be at least 6 characters long');
      return;
    }
    
    if (!acceptTerms) {
      setLocalError('Please accept the Terms & Conditions');
      return;
    }

    // Create user data for registration
    const userData = {
      name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
      email: formData.email.trim().toLowerCase(),
      password: formData.password
    };

    const result = await register(userData);
    
    if (result.success) {
      // Navigate to dashboard after successful registration
      navigate('/dashboard');
    } else {
      setLocalError(result.error);
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
              {(error || localError) && (
                <div className="error-message">
                  {error || localError}
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
                  disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
                />
              </div>

              <div className="terms-checkbox">
                <label className="checkbox-wrapper">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    required
                    disabled={loading}
                  />
                  <span className="checkmark"></span>
                  Accept Terms & Conditions
                </label>
              </div>

              <button 
                type="submit" 
                className="join-button"
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Join us →'}
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
