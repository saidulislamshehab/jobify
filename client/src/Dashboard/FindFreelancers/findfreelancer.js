import React, { useEffect, useState } from 'react';
import './findfreelancer.css';
import DashboardNav from '../DashboardNav';
import Footer from '../../LandingPage/footer';

const FindFreelancers = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [freelancers, setFreelancers] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    heroView: false,
    activity: 'All activities',
    skills: '',
    professionalType: 'All',
    region: 'All regions',
    country: 'All countries',
    language: 'English',
    languageLevel: 'All levels',
    rating: '5',
    projectsCompleted: 'All',
    hourlyRateMin: '7',
    hourlyRateMax: '40',
    verified: 'All'
  });

  useEffect(() => {
    const userData = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (userData) {
      try { setUser(JSON.parse(userData)); } catch (_) {}
    }
  }, []);

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/jobseekers/get');
        if (res.ok) {
          const data = await res.json();
          setFreelancers(Array.isArray(data) ? data : []);
        }
      } catch (_) {}
      setLoading(false);
    };
    fetchFreelancers();
  }, []);

  const filtered = freelancers.filter(f => {
    const term = search.toLowerCase();
    return (
      (f.name || '').toLowerCase().includes(term) ||
      (f.email || '').toLowerCase().includes(term) ||
      (f.title || f.jobTitle || '').toLowerCase().includes(term) ||
      (f.freelancerAboutMe || f.aboutMe || f.bio || '').toLowerCase().includes(term) ||
      (Array.isArray(f.skills) ? f.skills.join(',') : (f.skills || '')).toLowerCase().includes(term)
    );
  });

  // Mock data for demonstration
  const mockFreelancers = [
    {
      _id: '1',
      name: 'Victor',
      title: 'RANK #1 WORKANA',
      location: 'Brazil',
      hourlyRate: 104.90,
      projectsCompleted: 150,
      hoursWorked: 2500,
      aboutMe: 'Experienced developer with 5+ years in web development. I specialize in creating scalable web applications and have worked with various technologies including Python, Django, and modern frontend frameworks. I\'m passionate about clean code and delivering high-quality solutions.',
      skills: ['Python (3 to 5 years)', 'Web Scraping (3 to 5 years)', 'Graphic Design (3 to 5 years)'],
      isHero: true,
      profilePhoto: '/man.png'
    },
    {
      _id: '2',
      name: 'Matheus K.',
      title: 'Front-end Developer',
      location: 'Brazil',
      hourlyRate: 18.44,
      projectsCompleted: 45,
      hoursWorked: 890,
      aboutMe: 'Passionate frontend developer specializing in React and Vue.js. I love creating beautiful, responsive user interfaces and have a strong eye for design. I\'m always learning new technologies and staying up-to-date with the latest web development trends.',
      skills: ['React (2 to 3 years)', 'Vue.js (1 to 2 years)', 'JavaScript (3 to 5 years)'],
      isHero: true,
      profilePhoto: '/man.png'
    },
    {
      _id: '3',
      name: 'Diego B.',
      title: 'Full Stack Developer',
      location: 'Brazil',
      hourlyRate: 27.65,
      projectsCompleted: 78,
      hoursWorked: 1200,
      aboutMe: 'Full-stack developer with expertise in both frontend and backend technologies. I enjoy building complete solutions from database design to user interface. My experience spans across multiple industries and I\'m comfortable working with both small startups and large enterprises.',
      skills: ['Node.js (3 to 5 years)', 'React (2 to 3 years)', 'MongoDB (2 to 3 years)'],
      isHero: true,
      profilePhoto: '/man.png'
    },
    {
      _id: '4',
      name: 'Mari S.',
      title: 'Visual designer',
      location: 'Brazil',
      hourlyRate: 46.09,
      projectsCompleted: 32,
      hoursWorked: 650,
      aboutMe: 'Creative visual designer with a focus on user experience and branding. I believe good design should not only look beautiful but also solve real problems. I work closely with clients to understand their vision and bring it to life through thoughtful design.',
      skills: ['UI/UX Design (3 to 5 years)', 'Adobe Creative Suite (3 to 5 years)', 'Figma (2 to 3 years)'],
      isHero: true,
      profilePhoto: '/man.png'
    }
  ];

  const displayFreelancers = filtered.length > 0 ? filtered : mockFreelancers;

  return (
    <div className="ff-page">
      <DashboardNav user={user} />
      
      <div className="ff-container">
        {/* Left Sidebar - Filters */}
        <aside className="ff-sidebar">
          <div className="ff-sidebar-header">
            <h2 className="ff-sidebar-title">Filters</h2>
          </div>
          <div className="ff-sidebar-content">
            <div className="ff-filter-section">
            <div className="ff-filter-item">
              <label className="ff-toggle">
                <input 
                  type="checkbox" 
                  checked={filters.heroView}
                  onChange={(e) => setFilters({...filters, heroView: e.target.checked})}
                />
                <span className="ff-toggle-slider"></span>
                <span className="ff-toggle-label">View freelancers HERO</span>
              </label>
            </div>

            <div className="ff-filter-item">
              <label className="ff-label">Freelancer activity</label>
              <select 
                className="ff-select"
                value={filters.activity}
                onChange={(e) => setFilters({...filters, activity: e.target.value})}
              >
                <option>All activities</option>
                <option>Web Development</option>
                <option>Mobile Development</option>
                <option>Design</option>
                <option>Writing</option>
              </select>
            </div>

            <div className="ff-filter-item">
              <label className="ff-label">Skills</label>
              <input
                type="text"
                className="ff-input"
                placeholder="Enter the skills you need"
                value={filters.skills}
                onChange={(e) => setFilters({...filters, skills: e.target.value})}
              />
            </div>

            <div className="ff-filter-item">
              <label className="ff-label">Type of professional</label>
              <div className="ff-radio-group">
                <label className="ff-radio">
                  <input 
                    type="radio" 
                    name="professionalType" 
                    value="All"
                    checked={filters.professionalType === 'All'}
                    onChange={(e) => setFilters({...filters, professionalType: e.target.value})}
                  />
                  <span>All</span>
                </label>
                <label className="ff-radio">
                  <input 
                    type="radio" 
                    name="professionalType" 
                    value="Agencies"
                    checked={filters.professionalType === 'Agencies'}
                    onChange={(e) => setFilters({...filters, professionalType: e.target.value})}
                  />
                  <span>Agencies</span>
                </label>
                <label className="ff-radio">
                  <input 
                    type="radio" 
                    name="professionalType" 
                    value="Freelancers"
                    checked={filters.professionalType === 'Freelancers'}
                    onChange={(e) => setFilters({...filters, professionalType: e.target.value})}
                  />
                  <span>Freelancers</span>
                </label>
              </div>
            </div>

            <div className="ff-filter-item">
              <label className="ff-label">Freelancer location</label>
              <div className="ff-row">
                <select 
                  className="ff-select"
                  value={filters.region}
                  onChange={(e) => setFilters({...filters, region: e.target.value})}
                >
                  <option>All regions</option>
                  <option>North America</option>
                  <option>South America</option>
                  <option>Europe</option>
                  <option>Asia</option>
                </select>
                <select 
                  className="ff-select"
                  value={filters.country}
                  onChange={(e) => setFilters({...filters, country: e.target.value})}
                >
                  <option>All countries</option>
                  <option>United States</option>
                  <option>Brazil</option>
                  <option>United Kingdom</option>
                  <option>Canada</option>
                </select>
              </div>
            </div>

            <div className="ff-filter-item">
              <label className="ff-label">Languages</label>
              <div className="ff-row">
                <select 
                  className="ff-select"
                  value={filters.language}
                  onChange={(e) => setFilters({...filters, language: e.target.value})}
                >
                  <option>English</option>
                  <option>Spanish</option>
                  <option>Portuguese</option>
                  <option>French</option>
                </select>
                <select 
                  className="ff-select"
                  value={filters.languageLevel}
                  onChange={(e) => setFilters({...filters, languageLevel: e.target.value})}
                >
                  <option>All levels</option>
                  <option>Native</option>
                  <option>Fluent</option>
                  <option>Intermediate</option>
                </select>
              </div>
            </div>

            <div className="ff-filter-item">
              <label className="ff-label">Rating</label>
              <div className="ff-radio-group">
                <label className="ff-radio">
                  <input 
                    type="radio" 
                    name="rating" 
                    value="5"
                    checked={filters.rating === '5'}
                    onChange={(e) => setFilters({...filters, rating: e.target.value})}
                  />
                  <span>5 ★★★★★</span>
                </label>
                <label className="ff-radio">
                  <input 
                    type="radio" 
                    name="rating" 
                    value="4"
                    checked={filters.rating === '4'}
                    onChange={(e) => setFilters({...filters, rating: e.target.value})}
                  />
                  <span>4+ ★★★★★</span>
                </label>
                <label className="ff-radio">
                  <input 
                    type="radio" 
                    name="rating" 
                    value="3"
                    checked={filters.rating === '3'}
                    onChange={(e) => setFilters({...filters, rating: e.target.value})}
                  />
                  <span>3+ ★★★★★</span>
                </label>
              </div>
            </div>

            <div className="ff-filter-item">
              <label className="ff-label">Projects completed</label>
              <div className="ff-radio-group">
                <label className="ff-radio">
                  <input 
                    type="radio" 
                    name="projectsCompleted" 
                    value="All"
                    checked={filters.projectsCompleted === 'All'}
                    onChange={(e) => setFilters({...filters, projectsCompleted: e.target.value})}
                  />
                  <span>All</span>
                </label>
                <label className="ff-radio">
                  <input 
                    type="radio" 
                    name="projectsCompleted" 
                    value="1-10"
                    checked={filters.projectsCompleted === '1-10'}
                    onChange={(e) => setFilters({...filters, projectsCompleted: e.target.value})}
                  />
                  <span>1-10</span>
                </label>
                <label className="ff-radio">
                  <input 
                    type="radio" 
                    name="projectsCompleted" 
                    value="+10"
                    checked={filters.projectsCompleted === '+10'}
                    onChange={(e) => setFilters({...filters, projectsCompleted: e.target.value})}
                  />
                  <span>+10</span>
                </label>
              </div>
            </div>

            <div className="ff-filter-item">
              <label className="ff-label">Hourly rate</label>
              <div className="ff-rate-range">
                <div className="ff-rate-input">
                  <span className="ff-currency">USD</span>
                  <input
                    type="number"
                    className="ff-rate-field"
                    value={filters.hourlyRateMin}
                    onChange={(e) => setFilters({...filters, hourlyRateMin: e.target.value})}
                  />
                </div>
                <span className="ff-rate-separator">-</span>
                <div className="ff-rate-input">
                  <span className="ff-currency">USD</span>
                  <input
                    type="number"
                    className="ff-rate-field"
                    value={filters.hourlyRateMax}
                    onChange={(e) => setFilters({...filters, hourlyRateMax: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="ff-filter-item">
              <label className="ff-label">Verified freelancers</label>
              <div className="ff-radio-group">
                <label className="ff-radio">
                  <input 
                    type="radio" 
                    name="verified" 
                    value="All"
                    checked={filters.verified === 'All'}
                    onChange={(e) => setFilters({...filters, verified: e.target.value})}
                  />
                  <span>All</span>
                </label>
                <label className="ff-radio">
                  <input 
                    type="radio" 
                    name="verified" 
                    value="Verified only"
                    checked={filters.verified === 'Verified only'}
                    onChange={(e) => setFilters({...filters, verified: e.target.value})}
                  />
                  <span>Verified only</span>
                </label>
              </div>
            </div>

            <button className="ff-save-search">Save search</button>
            </div>
          </div>
        </aside>

        {/* Main Content - Freelancer Cards */}
        <main className="ff-main">
          <div className="ff-search-bar">
            <input
              type="text"
              className="ff-search-input"
              placeholder="Search freelancers by name, skills, or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="ff-search-tags">
              <span className="ff-tag">English</span>
              <span className="ff-results-count">{displayFreelancers.length} freelancers found</span>
            </div>
          </div>

          {loading ? (
            <div className="ff-loading">
              <div className="ff-loading-spinner"></div>
              <p>Loading freelancers...</p>
            </div>
          ) : displayFreelancers.length === 0 ? (
            <div className="ff-no-results">
              <div className="ff-no-results-icon">🔍</div>
              <h3>No freelancers found</h3>
              <p>Try adjusting your search criteria or filters to find more freelancers.</p>
            </div>
          ) : (
            <div className="ff-freelancers">
              {displayFreelancers.map((f) => (
                <div key={f._id} className="ff-freelancer-card">
                  <div className="ff-card-header">
                    <div className="ff-avatar">
                      {f.profilePhoto && f.profilePhoto !== '/man.png' ? (
                        <img 
                          src={f.profilePhoto} 
                          alt={f.name || 'User'} 
                          className="ff-avatar-img"
                        />
                      ) : (
                        <span className="ff-avatar-text">
                          {(f.name || 'U').charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="ff-card-info">
                      <div className="ff-name-row">
                        <h3 className="ff-name">{f.name}</h3>
                        {f.isHero && <span className="ff-hero-badge">HERO</span>}
                      </div>
                      <p className="ff-title">{f.jobTitle || f.title}</p>
                      <p className="ff-location"> {f.country || f.location}</p>
                    </div>
                    <div className="ff-hire-section">
                      <div className="ff-hourly-rate">
                        <span className="ff-rate-label">Hourly Rate</span>
                        <span className="ff-rate-value">${f.hourlyRate}/hr</span>
                      </div>
                      <button className="ff-hire-btn">Hire</button>
                    </div>
                  </div>
                  
                  <div className="ff-card-stats">
                    <div className="ff-stat">
                      <span className="ff-stat-label">Completed projects</span>
                      <span className="ff-stat-value">{f.projectsCompleted}</span>
                    </div>
                    <div className="ff-stat">
                      <span className="ff-stat-label">Hours worked</span>
                      <span className="ff-stat-value">{f.hoursWorked}</span>
                    </div>
                  </div>

                  <div className="ff-about-section">
                    <h4 className="ff-about-title">About Me</h4>
                    <p className="ff-about-text">{f.freelancerAboutMe || f.aboutMe || f.bio || 'No description available.'}</p>
                  </div>

                  <div className="ff-skills">
                    <h4 className="ff-skills-title">Skills</h4>
                    <div className="ff-skills-list">
                      {f.skills && f.skills.map((skill, index) => (
                        <span key={index} className="ff-skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>

                  <a href="/profile" className="ff-view-more">View full profile →</a>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <button className="ff-help-btn">❓ Help</button>
      <Footer />
    </div>
  );
};

export default FindFreelancers;


