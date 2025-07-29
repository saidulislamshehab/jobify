import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './WantToWork.css';
import Navbar from './Navbar';
import Footer from './footer';

const WantToWork = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const [showSkillsOptions, setShowSkillsOptions] = React.useState(false);

  const handleSkillsBtnClick = () => {
    setShowSkillsOptions((prev) => !prev);
  };

  return (
    <div className="want-to-work-container">
      <Navbar logoColor="#8b5cf6" />
      <main className="w2w-main">
        <div className="w2w-main-content">
          <div className="w2w-badges">
            <span>🚀 Free consultation</span>
            <span>💼 Satisfaction Guaranteed</span>
            <span>🔒 Protected Payments</span>
          </div>
          <h1>
            <span className="w2w-highlight">Find Your Dream Job</span><br />
            and accelerate your career growth
          </h1>
          <p className="w2w-subheadline">
            Connect with top companies worldwide.<br />
            Work remotely, set your own schedule, and earn competitive rates
          </p>
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
                <div><span className="w2w-career-icon">💻</span> Back End Developer</div>
                <div><span className="w2w-career-icon">🖥️</span> Full Stack Developer</div>
                <div><span className="w2w-career-icon">📱</span> Mobile Developer</div>
                <div><span className="w2w-career-icon">🔧</span> QA Automation</div>
                <div><span className="w2w-career-icon">📊</span> Data Engineer</div>
                <div><span className="w2w-career-icon">📈</span> Data Scientist</div>
                <div><span className="w2w-career-icon">⚙️</span> DevOps</div>
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
                <div><span className="w2w-career-icon">💻</span> IT & Programming</div>
                <div><span className="w2w-career-icon">🎨</span> Design & Multimedia</div>
                <div><span className="w2w-career-icon">✍️</span> Writing & Translation</div>
                <div><span className="w2w-career-icon">📈</span> Sales & Marketing</div>
                <div><span className="w2w-career-icon">⚙️</span> Admin Support</div>
                <div><span className="w2w-career-icon">📋</span> Legal</div>
                <div><span className="w2w-career-icon">💰</span> Finance & Management</div>
                <div><span className="w2w-career-icon">🏭</span> Engineering & Manufacturing</div>
              </div>
              <div className="w2w-career-actions">
                <button className="w2w-career-btn w2w-career-btn-purple">Sign up as a Freelancer</button>
                <a href="#" className="w2w-career-link">Learn more <span>&rarr;</span></a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w2w-skills-section">
        <h3 className="w2w-skills-title">DISCOVER OPPORTUNITIES IN YOUR FIELD OF EXPERTISE</h3>
        <div className="w2w-skills-grid">
          <div className="w2w-skills-col">
            <div className="w2w-skills-label w2w-skills-label--blue">
              <span className="w2w-skills-label-icon">&lt;/&gt;</span>
              PROGRAMMING
            </div>
            <ul className="w2w-skills-list w2w-skills-list--blue">
              <li><span className="w2w-icon">🌐</span> Web development</li>
              <li><span className="w2w-icon">📝</span> WordPress</li>
              <li><span className="w2w-icon">🛒</span> E-commerce</li>
              <li><span className="w2w-icon">📱</span> Mobile Apps (Android, iOS)</li>
              <li><span className="w2w-icon">🎵</span> Audio editing</li>
            </ul>
          </div>
          <div className="w2w-skills-col">
            <div className="w2w-skills-label w2w-skills-label--purple">
              <span className="w2w-skills-label-icon">🎨</span>
              DESIGN & MULTIMEDIA
            </div>
            <ul className="w2w-skills-list w2w-skills-list--purple">
              <li><span className="w2w-icon">🎯</span> Logo design</li>
              <li><span className="w2w-icon">💻</span> Web design</li>
              <li><span className="w2w-icon">✏️</span> Illustrations</li>
              <li><span className="w2w-icon">🎬</span> Video editing</li>
              <li><span className="w2w-icon">🎵</span> Audio editing</li>
            </ul>
          </div>
          <div className="w2w-skills-col">
            <div className="w2w-skills-label w2w-skills-label--green">
              <span className="w2w-skills-label-icon">📢</span>
              MARKETING
            </div>
            <ul className="w2w-skills-list w2w-skills-list--green">
              <li><span className="w2w-icon">📈</span> Google/Facebook Ads</li>
              <li><span className="w2w-icon">🔍</span> SEO</li>
              <li><span className="w2w-icon">💻</span> Web design</li>
              <li><span className="w2w-icon">📧</span> Email Marketing</li>
              <li><span className="w2w-icon">👥</span> Community Manager</li>
            </ul>
          </div>
        </div>
        <span
          className="w2w-skills-btn"
          onClick={handleSkillsBtnClick}
        >
          See More Opportunities
        </span>
        {showSkillsOptions && (
          <div className="skills-options-popup" style={{
            background: '#fff',
            border: '1px solid #eee',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            marginTop: '12px',
            padding: '20px',
            zIndex: 10,
            position: 'relative'
          }}>
            <h4>Remote Work Opportunities by Sector</h4>
            <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
              <div>
                <strong>Design & Multimedia</strong>
                <ul>
                  <li>Logo Designer</li>
                  <li>UI/UX Designer</li>
                  <li>Illustrator</li>
                  <li>Video Editor</li>
                  <li>Animator</li>
                </ul>
              </div>
              <div>
                <strong>Writing & Translation</strong>
                <ul>
                  <li>Content Writer</li>
                  <li>Copywriter</li>
                  <li>Technical Writer</li>
                  <li>Translator</li>
                  <li>Proofreader</li>
                </ul>
              </div>
              <div>
                <strong>IT & Programming</strong>
                <ul>
                  <li>Web Developer</li>
                  <li>Mobile App Developer</li>
                  <li>WordPress Expert</li>
                  <li>QA Tester</li>
                  <li>DevOps Engineer</li>
                </ul>
              </div>
              <div>
                <strong>Sales & Marketing</strong>
                <ul>
                  <li>SEO Specialist</li>
                  <li>Social Media Manager</li>
                  <li>Email Marketer</li>
                  <li>Ad Campaign Manager</li>
                  <li>Market Researcher</li>
                </ul>
              </div>
              <div>
                <strong>Admin Support</strong>
                <ul>
                  <li>Virtual Assistant</li>
                  <li>Data Entry</li>
                  <li>Customer Support</li>
                  <li>Project Coordinator</li>
                  <li>Scheduler</li>
                </ul>
              </div>
            </div>
          </div>
        )}
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