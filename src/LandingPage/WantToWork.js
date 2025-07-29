import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './WantToWork.css';
import Navbar from './Navbar';
import Footer from './footer';

const WantToWork = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="want-to-work-container">
      <Navbar logoColor="#8b5cf6" />
      <main className="w2w-main">
        <div className="w2w-main-content">
          <div className="w2w-badges">
            <span>✓ Free consultation</span>
            <span>✓ Satisfaction Guaranteed</span>
            <span>✓ Protected Payments</span>
          </div>
          <h1>Find <span className="w2w-highlight">remote job opportunities</span><br />and boost your career</h1>
          <p className="w2w-subheadline">Connect with thousands of businesses looking for your skills. Work on exciting projects and grow your professional network.</p>
          <div className="w2w-cta">
            <span className="w2w-work-btn">I want to work</span>
            <Link to="/" className="w2w-hire-link wth-link-btn">Do you want to hire? →</Link>
          </div>
        </div>
        <div className="w2w-people-circles">
          <div className="w2w-circle"><img src="https://randomuser.me/api/portraits/women/44.jpg" alt="person" /></div>
          <div className="w2w-circle"><img src="https://randomuser.me/api/portraits/men/65.jpg" alt="person" /></div>
          <div className="w2w-circle"><img src="https://randomuser.me/api/portraits/women/68.jpg" alt="person" /></div>
          <div className="w2w-circle"><img src="https://randomuser.me/api/portraits/men/23.jpg" alt="person" /></div>
          <div className="w2w-circle"><img src="https://randomuser.me/api/portraits/women/12.jpg" alt="person" /></div>
          <div className="w2w-circle"><img src="https://randomuser.me/api/portraits/men/32.jpg" alt="person" /></div>
          <div className="w2w-circle"><img src="https://randomuser.me/api/portraits/men/11.jpg" alt="person" /></div>
        </div>
        <div className="w2w-cards">
          <div className="w2w-card">
            <div className="w2w-card-img"><img src="https://randomuser.me/api/portraits/men/75.jpg" alt="developer" /></div>
            <div className="w2w-card-content">
              <span>I want to work</span>
              <h2>DEVELOPERS</h2>
              <p>Find projects that match your technical skills. Work with cutting-edge technologies and grow your development career.</p>
            </div>
          </div>
          <div className="w2w-card">
            <div className="w2w-card-img"><img src="https://randomuser.me/api/portraits/women/65.jpg" alt="freelancer" /></div>
            <div className="w2w-card-content">
              <span>I want to work</span>
              <h2>FREELANCERS</h2>
              <p>Work on your own terms, set your own rates, and choose the projects that align with your expertise and interests.</p>
            </div>
          </div>
        </div>
      </main>
      <section className="w2w-career-section">
        <div className="w2w-career-header">
          <div className="w2w-career-subtitle">LOOKING TO INCREASE YOUR INCOME?</div>
          <h2 className="w2w-career-title">Take your career to the next level</h2>
        </div>
        <div className="w2w-career-cards">
          <div className="w2w-career-card w2w-career-card-blue">
            <div className="w2w-career-card-header">
              <img className="w2w-career-avatar" src="https://randomuser.me/api/portraits/women/44.jpg" alt="profile" />
              <span className="w2w-career-avatar-bg w2w-career-avatar-bg-blue"></span>
            </div>
            <div className="w2w-career-card-content">
              <div className="w2w-career-card-heading">LOOKING FOR FULL-TIME REMOTE JOB OPPORTUNITIES?</div>
              <div className="w2w-career-card-desc">We connect IT developers like you with clients in the US</div>
              <div className="w2w-career-list w2w-career-list-blue">
                <div><span className="w2w-career-icon">&lt;/&gt;</span> Front End Developer</div>
                <div><span className="w2w-career-icon">&#128187;</span> Back End Developer</div>
                <div><span className="w2w-career-icon">&#128421;</span> Full Stack Developer</div>
                <div><span className="w2w-career-icon">&#128241;</span> Mobile Developer</div>
                <div><span className="w2w-career-icon">&#128295;</span> QA Automation</div>
                <div><span className="w2w-career-icon">&#128202;</span> Data Engineer</div>
                <div><span className="w2w-career-icon">&#128200;</span> Data Scientist</div>
                <div><span className="w2w-career-icon">&#128187;</span> DevOps</div>
              </div>
              <div className="w2w-career-actions">
                <button className="w2w-career-btn w2w-career-btn-blue">Start Working as a Developer</button>
                <a href="#" className="w2w-career-link">Learn more <span>&rarr;</span></a>
              </div>
            </div>
          </div>
          <div className="w2w-career-card w2w-career-card-purple">
            <div className="w2w-career-card-header">
              <img className="w2w-career-avatar" src="https://randomuser.me/api/portraits/men/75.jpg" alt="profile" />
              <span className="w2w-career-avatar-bg w2w-career-avatar-bg-purple"></span>
            </div>
            <div className="w2w-career-card-content">
              <div className="w2w-career-card-heading">LOOKING FOR A FREELANCE PROJECT?</div>
              <div className="w2w-career-card-desc">What's your specialization?</div>
              <div className="w2w-career-list w2w-career-list-purple">
                <div><span className="w2w-career-icon">&#128187;</span> IT & Programming</div>
                <div><span className="w2w-career-icon">&#127912;</span> Design & Multimedia</div>
                <div><span className="w2w-career-icon">&#9997;&#65039;</span> Writing & Translation</div>
                <div><span className="w2w-career-icon">&#128179;</span> Sales & Marketing</div>
                <div><span className="w2w-career-icon">&#128187;</span> Admin Support</div>
                <div><span className="w2w-career-icon">&#128196;</span> Legal</div>
                <div><span className="w2w-career-icon">&#128200;</span> Finance & Management</div>
                <div><span className="w2w-career-icon">&#128736;</span> Engineering & Manufacturing</div>
              </div>
              <div className="w2w-career-actions">
                <button className="w2w-career-btn w2w-career-btn-purple">Sign up as a Freelancer</button>
                <a href="#" className="w2w-career-link">Learn more <span>&rarr;</span></a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w2w-industry-leader">
        <h3 className="w2w-industry-title">THE INDUSTRY LEADER IN LATIN AMERICA</h3>
        <div className="w2w-industry-grid">
          <div className="w2w-industry-card w2w-industry-card-blue">
            <h4>OVER TEN YEARS ON THE MARKET</h4>
            <p>Thousands of freelancers boost their careers every day with the opportunities Workana offers</p>
          </div>
          <div className="w2w-industry-img">
            <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80" alt="woman headset" />
          </div>
          <div className="w2w-industry-img">
            <img src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=600&q=80" alt="man glasses" />
          </div>
          <div className="w2w-industry-card w2w-industry-card-purple">
            <h4>RELIABILITY</h4>
            <p>With our protected payments, multiple withdrawal options, and full transparency, you're always in control of your earnings.</p>
          </div>
        </div>
      </section>
      <section className="w2w-help-section">
        <div className="w2w-help-title">NEED HELP?</div>
        <div className="w2w-help-cards">
          <div className="w2w-help-card">
            <div className="w2w-help-icon w2w-help-icon-pink"></div>
            <div className="w2w-help-card-heading">I'M HIRING</div>
            <div className="w2w-help-card-desc">Choose the type of professional you need according to the category and scope of your project.</div>
            <a href="#" className="w2w-help-link">Hire IT developers</a>
            <a href="#" className="w2w-help-link">Find a Freelancer</a>
            <a href="#" className="w2w-help-link">Plans and pricing</a>
          </div>
          <div className="w2w-help-card">
            <div className="w2w-help-icon w2w-help-icon-yellow"></div>
            <div className="w2w-help-card-heading">I'M A TALENT</div>
            <div className="w2w-help-card-desc">Choose the type of job you are looking for according to your professional skills and availability.</div>
            <a href="#" className="w2w-help-link">Get started as a Developer</a>
            <a href="#" className="w2w-help-link">Get started as a Freelancer</a>
            <a href="#" className="w2w-help-link">Plans and pricing</a>
          </div>
          <div className="w2w-help-card">
            <div className="w2w-help-icon w2w-help-icon-orange"></div>
            <div className="w2w-help-card-heading">SUPPORT</div>
            <div className="w2w-help-card-desc">Clear your doubts and get assistance.</div>
            <a href="#" className="w2w-help-link">Help Desk</a>
            <a href="#" className="w2w-help-link">Contact us</a>
          </div>
        </div>
      </section>
      <Footer logoColor="#8b5cf6" />
    </div>
  );
};

export default WantToWork; 