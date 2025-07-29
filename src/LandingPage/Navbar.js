import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ logoColor = '#8b5cf6' }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <header className="wth-header wth-header-fixed">
      <div className="wth-header-inner">
        <div className="wth-logo">
          <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            J<span style={{ color: logoColor }}>O</span>BIFY
          </a>
        </div>
        <nav className="wth-nav">
          <Link
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
          <span className="wth-login wth-link-btn">Log in</span>
          <span className="wth-signup">Sign up</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
