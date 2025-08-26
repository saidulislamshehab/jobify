import React from 'react';
import './footer.css';

const Footer = ({ logoColor = '#8b5cf6' }) => (
  <footer className="wth-footer">
    <div className="wth-footer-content">
      <div className="wth-footer-top">
        <div className="wth-footer-logo">J<span style={{ color: logoColor }}>O</span>BIFY</div>
        <div className="wth-footer-lang-social">
          <select className="wth-footer-lang">
            <option>English</option>
            <option>Español</option>
          </select>
          <div className="wth-footer-social">
            <a href="#" aria-label="Instagram">&#x1F47E;</a>
            <a href="#" aria-label="Facebook">&#x1F426;</a>
            <a href="#" aria-label="Twitter">&#x1F426;</a>
            <a href="#" aria-label="LinkedIn">&#x1F4BB;</a>
          </div>
        </div>
      </div>
      <div className="wth-footer-links">
        <div className="wth-footer-col">
          <div className="wth-footer-col-title">Who are we?</div>
          <span>About us</span>
          <span>Join the Jobify Team</span>
          <span>Contact us</span>
          <span>Blog</span>
          <span>Jobify policies</span>
          <span>Privacy policy</span>
          <span>Terms of service</span>
          <span>Cookie settings</span>
        </div>
        <div className="wth-footer-col">
          <div className="wth-footer-col-title">Resources</div>
          <span>Help center</span>
          <span>How it works</span>
          <span>Membership Plans</span>
          <span>Press</span>
          <span>Business</span>
          <span>Sitemap</span>
        </div>
        <div className="wth-footer-col">
          <div className="wth-footer-col-title">Find work</div>
          <span>IT & Programming</span>
          <span>Design & Multimedia</span>
          <span>Writing & Translation</span>
          <span>Sales & Marketing</span>
          <span>Admin Support</span>
          <span>Legal</span>
          <span>Finance & Management</span>
          <span>Engineering & Manufacturing</span>
        </div>
        <div className="wth-footer-col">
          <div className="wth-footer-col-title">Freelancers</div>
          <span>Freelancers Argentina</span>
          <span>Freelancers Brazil</span>
          <span>Freelancers Colombia</span>
          <span>Freelancers Uruguay</span>
          <span>Freelancers Mexico</span>
          <span>Freelancers Venezuela</span>
          <span>Freelancers Paraguay</span>
          <span>Freelancers Honduras</span>
        </div>
      </div>
      <div className="wth-footer-bottom">
        <span>© 2012 - 2025 | Jobify LLC - All rights reserved</span>
      </div>
    </div>
  </footer>
);

export default Footer;
