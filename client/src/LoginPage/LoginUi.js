import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginUi.css';
import facebookIcon from './facebook.png';
import googleIcon from './Google.png';
import appleIcon from './apple.png';
import backgroundImage from './image1.jpg';

const LoginUi = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/jobseekers/login', {
        email,
        password
      });

      console.log('Login successful:', response.data);
      
      // Store user data in localStorage (you might want to use a more secure method)
      if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      } else {
        sessionStorage.setItem('user', JSON.stringify(response.data.user));
      }

      // Navigate to dashboard after successful login
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Left Panel - Login Form */}
        <div className="login-form-panel">
          <div className="login-form-content">
            <div className="welcome-header">
              <h1 className="login-title">Sign in to Jobify!</h1>
            </div>
            
            {error && (
              <div className="error-message" style={{
                backgroundColor: '#e74c3c',
                color: 'white',
                padding: '12px 16px',
                borderRadius: '8px',
                marginBottom: '20px',
                fontSize: '14px'
              }}>
                {error}
              </div>
            )}
            
            <form className="login-form" onSubmit={handleLogin}>
              <div className="form-group">
                <div className="input-wrapper">
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className="form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <span className="input-icon">✉️</span>
                </div>
              </div>
              
              <div className="form-group">
                <div className="input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Password"
                    className="form-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>
              
              <div className="form-options">
                <label className="checkbox-wrapper">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="checkmark"></span>
                  Remember for 30 days
                </label>
                <a href="#" className="forgot-password">Forgot password?</a>
              </div>
              
              <button type="submit" className="login-button" disabled={loading}>
                {loading ? 'Signing in...' : 'Login'}
              </button>
            </form>
            
            <div className="divider-before"></div>
            <div className="divider-text">or sign in with</div>
            <div className="divider-after"></div>
            
            <div className="social-login">
              <button className="social-button apple">
                <img src={appleIcon} alt="Apple" className="social-icon-img" />
              </button>
              <button className="social-button google">
                <img src={googleIcon} alt="Google" className="social-icon-img" />
              </button>
              <button className="social-button facebook">
                <img src={facebookIcon} alt="Facebook" className="social-icon-img" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Right Panel - Branding */}
        <div className="login-brand-panel" style={{ backgroundImage: `url(${backgroundImage})` }}>
          <div className="brand-content">
            <div className="brand-welcome">
              <h2 className="brand-title">Welcome back Fella!</h2>
              <p className="brand-subtitle">Enter your personal details and start your journey with us.
              Join our platform, unlock new opportunities, and grow your career with confidence.</p>
            </div>
            
            <div className="brand-signup">
              <p className="signup-text">Still haven't created a Jobify account?</p>
              <button className="signup-button" onClick={handleSignupClick}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginUi;