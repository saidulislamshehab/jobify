import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ logoColor = '#8b5cf6' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/login');
  };

  return (
    <header className="wth-header wth-header-fixed">
      <div className="wth-header-inner">
        <div className="wth-logo">
          <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            J<span style={{ color: logoColor }}>O</span>BIFY
          </a>
        </div>
        <nav className="wth-nav">
          <Link   //Used to navigate to the home page
            to="/"
            className={isActive('/') ? 'wth-nav-link active' : 'wth-nav-link'}
            style={{ position: 'relative' }}
          >
            I want to hire
          </Link>
          <Link
            to="/work"
            className={isActive('/work') ? 'wth-nav-link active' : 'wth-nav-link'}
            style={{ position: 'relative' }}
          >
            I want to work
          </Link>
        </nav>
        <div className="wth-auth">
          <span className="wth-login wth-link-btn" onClick={handleLoginClick} style={{ cursor: 'pointer' }}>Log in</span>
          <span className="wth-signup" onClick={handleSignupClick} style={{ cursor: 'pointer' }}>Sign up</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
