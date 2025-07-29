import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './WantToHire.css';
import Navbar from './Navbar';
import Footer from './footer';

const WantToHire = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="want-to-hire-container">
      <Navbar logoColor="#fbbc05" />



      <main className="wth-main">
        <div className="wth-main-content">
          <div className="wth-badges">
            <span>✔ Free consultation</span>
            <span>✔ Satisfaction Guaranteed</span>
            <span>✔ Protected Payments</span>
          </div>
          <h1>  <span className="wth-highlight">Connect Collaborate Succeed</span> <br/>All through one powerful hiring platform</h1>
          <p className="wth-subheadline">Build your dream team without the timezone drama.<br/>
          We bring talent that talks your talk and works your hours</p>
          <div className="wth-cta">
            <span className="wth-hire-btn">I want to hire</span>
            <Link to="/work" className="wth-work-link wth-link-btn">Do you want to work? →</Link>
          </div>
        </div>
        
        <div className="wth-people-circles">
          <div className="wth-circle"><img src="https://randomuser.me/api/portraits/men/32.jpg" alt="person" /></div>
          <div className="wth-circle"><img src="https://randomuser.me/api/portraits/women/49.jpg" alt="person" /></div>
          <div className="wth-circle"><img src="https://randomuser.me/api/portraits/men/65.jpg" alt="person" /></div>
          <div className="wth-circle"><img src="https://randomuser.me/api/portraits/women/68.jpg" alt="person" /></div>
          <div className="wth-circle"><img src="https://randomuser.me/api/portraits/women/12.jpg" alt="person" /></div>
          <div className="wth-circle"><img src="https://randomuser.me/api/portraits/men/23.jpg" alt="person" /></div>
        </div>
        <div className="wth-cards">
          <div className="wth-card">
            <div className="wth-card-img"><img src="https://randomuser.me/api/portraits/men/11.jpg" alt="developer" /></div>
            <div className="wth-card-content">
              <span>I want to hire</span>
              <h2>DEVELOPERS</h2>
              <p>Hire pre-selected and certified talent to work in the technologies your business needs for a specified period.</p>
            </div>
          </div>
          <div className="wth-card">
            <div className="wth-card-img"><img src="https://randomuser.me/api/portraits/women/21.jpg" alt="freelancer" /></div>
            <div className="wth-card-content">
              <span>I want to hire</span>
              <h2>FREELANCERS</h2>
              <p>Hire talent from various disciplines to work on goals or hours, receiving multiple proposals and agreeing on a price.</p>
            </div>
          </div>
        </div>
      </main>



      <section className="wth-industry-leader">
        <h3 className="wth-industry-title">THE INDUSTRY LEADER IN LATIN AMERICA</h3>
        <div className="wth-industry-grid">
          <div className="wth-industry-card wth-industry-card--blue">
            <h4>OVER TEN YEARS ON THE MARKET</h4>
            <p>Thousands of businesses have boosted their growth by hiring our talent.</p>
          </div>
          <div className="wth-industry-card wth-industry-card--img">
            <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80" alt="Team working at computer" />
          </div>
          <div className="wth-industry-card wth-industry-card--img">
            <img src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=600&q=80" alt="Team meeting" />
          </div>
          <div className="wth-industry-card wth-industry-card--purple">
            <h4>RELIABILITY</h4>
            <p>We successfully connect thousands of professionals with remote job opportunities every week</p>
          </div>
        </div>
      </section>
      <section className="wth-build-team">
        <h3 className="wth-build-title">DO YOU HAVE A PROJECT?</h3>
        <h2 className="wth-build-subtitle">Build your team</h2>
        <div className="wth-build-cards">
          <div className="wth-build-card wth-build-card--blue">
            <div className="wth-build-avatar">
              <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="IT Developer" />
            </div>
            <div className="wth-build-card-content">
              <div className="wth-build-card-title">NEED IT DEVELOPERS?</div>
              <div className="wth-build-card-desc">Hire certified talent in less than a week</div>
              <div className="wth-build-list wth-build-list--blue">
                <div><span className="wth-icon">&#60;&#47;&#62;</span> Front End Developer</div>
                <div><span className="wth-icon">&#128187;</span> Back End Developer</div>
                <div><span className="wth-icon">&#128421;</span> Full Stack Developer</div>
                <div><span className="wth-icon">&#128241;</span> Mobile Developer</div>
                <div><span className="wth-icon">&#129302;</span> QA Automation</div>
                <div><span className="wth-icon">&#128202;</span> Data Engineer</div>
                <div><span className="wth-icon">&#128200;</span> Data Scientist</div>
                <div><span className="wth-icon">&#128187;</span> DevOps</div>
              </div>
              <div className="wth-build-actions">
                <span className="wth-build-btn wth-build-btn--blue">Hire a Developer</span>
                <span className="wth-build-link wth-link-btn">Learn more <span>&#8594;</span></span>
              </div>
            </div>
          </div>
          <div className="wth-build-card wth-build-card--purple">
            <div className="wth-build-avatar">
              <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Freelancer" />
            </div>
            <div className="wth-build-card-content">
              <div className="wth-build-card-title">NEED A FREELANCER?</div>
              <div className="wth-build-card-desc">In what field of expertise?</div>
              <div className="wth-build-list wth-build-list--purple">
                <div><span className="wth-icon">&#128187;</span> IT & Programming</div>
                <div><span className="wth-icon">&#127912;</span> Design & Multimedia</div>
                <div><span className="wth-icon">&#9997;&#65039;</span> Writing & Translation</div>
                <div><span className="wth-icon">&#128221;</span> Sales & Marketing</div>
                <div><span className="wth-icon">&#9881;&#65039;</span> Admin Support</div>
                <div><span className="wth-icon">&#128196;</span> Legal</div>
                <div><span className="wth-icon">&#128200;</span> Finance & Management</div>
                <div><span className="wth-icon">&#128736;&#65039;</span> Engineering & Manufacturing</div>
              </div>
              <div className="wth-build-actions">
                <span className="wth-build-btn wth-build-btn--purple">Hire a Freelancer</span>
                <span className="wth-build-link wth-link-btn">Learn more <span>&#8594;</span></span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="wth-skills-section">
        <h3 className="wth-skills-title">DISCOVER TALENTED PROFESSIONALS WITH THE SKILLS YOU NEED</h3>
        <div className="wth-skills-grid">
          <div className="wth-skills-col">
            <div className="wth-skills-label wth-skills-label--blue">
              <span className="wth-skills-label-icon">&#60;&#47;&#62;</span>
              PROGRAMMING
            </div>
            <ul className="wth-skills-list wth-skills-list--blue">
              <li><span className="wth-icon">&#60;&#47;&#62;</span> Web development</li>
              <li><span className="wth-icon">&#128230;</span> WordPress</li>
              <li><span className="wth-icon">&#128230;</span> E-commerce</li>
              <li><span className="wth-icon">&#128187;</span> Apps programming Android, iOS and others</li>
              <li><span className="wth-icon">&#128266;</span> Audio editing</li>
            </ul>
          </div>
          <div className="wth-skills-col">
            <div className="wth-skills-label wth-skills-label--red">
              <span className="wth-skills-label-icon">&#9998;&#65039;</span>
              DESIGN & MULTIMEDIA
            </div>
            <ul className="wth-skills-list wth-skills-list--red">
              <li><span className="wth-icon">&#128396;</span> Logo design</li>
              <li><span className="wth-icon">&#128187;</span> Web design</li>
              <li><span className="wth-icon">&#127912;</span> Illustrations</li>
              <li><span className="wth-icon">&#127916;</span> Video editing</li>
              <li><span className="wth-icon">&#128266;</span> Audio editing</li>
            </ul>
          </div>
          <div className="wth-skills-col">
            <div className="wth-skills-label wth-skills-label--green">
              <span className="wth-skills-label-icon">&#128172;</span>
              MARKETING
            </div>
            <ul className="wth-skills-list wth-skills-list--green">
              <li><span className="wth-icon">&#128200;</span> Advertising on Google/Facebook</li>
              <li><span className="wth-icon">&#128269;</span> SEO</li>
              <li><span className="wth-icon">&#128187;</span> Web design</li>
              <li><span className="wth-icon">&#128231;</span> E-mail Marketing</li>
              <li><span className="wth-icon">&#128101;</span> Community Manager</li>
            </ul>
          </div>
        </div>
        <div className="wth-skills-btn-row">
          <span className="wth-skills-btn">View all skills</span>
        </div>
      </section>
      <section className="wth-help-section">
        <h3 className="wth-help-title">NEED HELP?</h3>
        <div className="wth-help-cards">
          <div className="wth-help-card">
            <div className="wth-help-circle wth-help-circle--purple"></div>
            <div className="wth-help-card-title">I'M HIRING</div>
            <div className="wth-help-card-desc">Choose the type of professional you need according to the category and scope of your project.</div>
            <span className="wth-help-link">Hire IT developers</span>
            <span className="wth-help-link">Find a Freelancer</span>
            <span className="wth-help-link">Plans and pricing</span>
          </div>
          <div className="wth-help-card">
            <div className="wth-help-circle wth-help-circle--yellow"></div>
            <div className="wth-help-card-title">I'M A TALENT</div>
            <div className="wth-help-card-desc">Choose the type of job you are looking for according to your professional skills and availability.</div>
            <span className="wth-help-link">Get started as a Developer</span>
            <span className="wth-help-link">Get started as a Freelancer</span>
            <span className="wth-help-link">Plans and pricing</span>
          </div>
          <div className="wth-help-card">
            <div className="wth-help-circle wth-help-circle--orange"></div>
            <div className="wth-help-card-title">SUPPORT</div>
            <div className="wth-help-card-desc">Clear your doubts and get assistance.</div>
            <span className="wth-help-link">Help Desk</span>
            <span className="wth-help-link">Contact us</span>
          </div>
        </div>
      </section>
      <Footer logoColor="#fbbc05" />
    </div>
  );
};

export default WantToHire; 