import React, { useEffect, useState } from 'react';
import './findwork.css';
import DashboardNav from '../DashboardNav';
import Footer from '../../LandingPage/footer';
import BidModal from './BidModal';

const FindWork = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);
  const [userBids, setUserBids] = useState([]);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: 'All categories',
    skills: '',
    publicationDate: 'Any time',
    contractType: 'All',
    language: 'English',
    region: 'All regions',
    country: 'All countries',
    payments: 'All',
    bids: 'All'
  });
  const [activeSubNav, setActiveSubNav] = useState('find-projects');

  // Helper functions for data formatting
  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMs = now - date;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const formatBudget = (budget, paymentOption) => {
    if (paymentOption === 'hourly') {
      return `USD ${budget} / hour`;
    } else {
      return `USD ${budget}`;
    }
  };

  const getInitials = (email) => {
    if (!email) return 'U';
    const parts = email.split('@')[0].split('.');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return email[0].toUpperCase();
  };

  const truncateDescription = (description, maxLength = 200) => {
    if (!description) return '';
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + '... View more';
  };

  useEffect(() => {
    const data = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (data) {
      try { setUser(JSON.parse(data)); } catch (_) {}
    }
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/projects?status=published');
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        const currentUserId = user?.id || user?._id;
        const all = Array.isArray(data) ? data : [];
        const filtered = currentUserId ? all.filter(p => String(p.clientId) !== String(currentUserId)) : all;
        
        // Fetch bid counts for each project
        const projectsWithBids = await Promise.all(
          filtered.map(async (project) => {
            try {
              const bidRes = await fetch(`http://localhost:5000/api/bids/stats/${project._id}`);
              const bidData = await bidRes.json();
              return {
                ...project,
                bids: bidData.totalBids || 0,
                published: formatTimeAgo(project.createdAt || project.updatedAt),
                budget: formatBudget(project.budget || '0', project.paymentOption),
                contractType: project.paymentOption === 'hourly' ? 'Hourly' : 'Fixed price',
                language: 'English', // Default language
                category: 'IT & Programming', // Default category - you can add this to the model later
                verified: true, // Default verification status
                client: {
                  initials: getInitials(project.clientEmail || 'unknown@example.com'),
                  lastReply: formatTimeAgo(project.updatedAt || project.createdAt),
                  location: project.clientCountry || 'United States',
                  rating: 5 // Default rating
                }
              };
            } catch (error) {
              console.error('Error fetching bid stats for project:', project._id, error);
              return {
                ...project,
                bids: 0,
                published: formatTimeAgo(project.createdAt || project.updatedAt),
                budget: formatBudget(project.budget || '0', project.paymentOption),
                contractType: project.paymentOption === 'hourly' ? 'Hourly' : 'Fixed price',
                language: 'English',
                category: 'IT & Programming',
                verified: true,
                client: {
                  initials: getInitials(project.clientEmail || 'unknown@example.com'),
                  lastReply: formatTimeAgo(project.updatedAt || project.createdAt),
                  location: project.clientCountry || 'United States',
                  rating: 5
                }
              };
            }
          })
        );
        
        setProjects(projectsWithBids);
        setError(null);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects([]);
        setError('Failed to load projects. Please make sure the server is running.');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [user]);

  useEffect(() => {
    const fetchUserBids = async () => {
      if (user?.id || user?._id) {
        try {
          const res = await fetch(`http://localhost:5000/api/bids/freelancer/${user.id || user._id}`);
          const data = await res.json();
          if (data.bids) {
            setUserBids(data.bids);
          }
        } catch (error) {
          console.error('Error fetching user bids:', error);
        }
      }
    };
    fetchUserBids();
  }, [user]);

  // Use only real projects from database
  const allJobs = projects;

  const visibleProjects = allJobs.filter((p) => {
    // Search filter
    const searchTerm = search.toLowerCase();
    const matchesSearch = searchTerm === '' || (
      (p.title || '').toLowerCase().includes(searchTerm) ||
      (p.description || '').toLowerCase().includes(searchTerm) ||
      (Array.isArray(p.skills) ? p.skills.join(',') : (p.skills || '')).toLowerCase().includes(searchTerm)
    );

    // Category filter
    const matchesCategory = filters.category === 'All categories' || p.category === filters.category;

    // Skills filter
    const matchesSkills = filters.skills === '' || (
      Array.isArray(p.skills) ? 
        p.skills.some(skill => skill.toLowerCase().includes(filters.skills.toLowerCase())) :
        (p.skills || '').toLowerCase().includes(filters.skills.toLowerCase())
    );

    // Contract type filter
    const matchesContractType = filters.contractType === 'All' || p.contractType === filters.contractType;

    // Language filter
    const matchesLanguage = p.language === filters.language;

    // Location filter
    const matchesLocation = (
      filters.region === 'All regions' || p.client?.region === filters.region
    ) && (
      filters.country === 'All countries' || p.client?.location === filters.country
    );

    // Payments filter
    const matchesPayments = filters.payments === 'All' || 
      (filters.payments === '0' && p.client?.payments === 0) ||
      (filters.payments === '1+' && p.client?.payments > 0);

    // Bids filter
    const matchesBids = filters.bids === 'All' ||
      (filters.bids === '0-4 bids' && p.bids >= 0 && p.bids <= 4) ||
      (filters.bids === '5+ bids' && p.bids >= 5);

    return matchesSearch && matchesCategory && matchesSkills && matchesContractType && 
           matchesLanguage && matchesLocation && matchesPayments && matchesBids;
  });

  const handleBidClick = (project) => {
    setSelectedProject(project);
    setIsBidModalOpen(true);
  };

  const handleCloseBidModal = () => {
    setIsBidModalOpen(false);
    setSelectedProject(null);
  };

  const handleBidSubmitted = (newBid) => {
    setUserBids(prev => [newBid, ...prev]);
    console.log('Bid submitted successfully:', newBid);
  };

  const hasUserBidOnProject = (projectId) => {
    return userBids.some(bid => 
      String(bid.projectId._id || bid.projectId) === String(projectId) && 
      bid.status !== 'withdrawn'
    );
  };

  const getUserBidStatus = (projectId) => {
    const bid = userBids.find(bid => 
      String(bid.projectId._id || bid.projectId) === String(projectId) && 
      bid.status !== 'withdrawn'
    );
    return bid ? bid.status : null;
  };

  return (
    <div className="fw-page">
      <DashboardNav user={user} />

      
      <div className="fw-container">
        {/* Left Sidebar - Filters */}
        <aside className="fw-sidebar">
          <div className="fw-filter-section">
            <div className="fw-filter-item">
              <label className="fw-label">Project category</label>
              <div className="fw-checkbox-group">
                <label className="fw-checkbox">
                  <input 
                    type="checkbox" 
                    checked={filters.category === 'All categories'}
                    onChange={() => setFilters({...filters, category: 'All categories'})}
                  />
                  <span>All categories</span>
                </label>
                <label className="fw-checkbox">
                  <input 
                    type="checkbox" 
                    checked={filters.category === 'IT & Programming'}
                    onChange={() => setFilters({...filters, category: 'IT & Programming'})}
                  />
                  <span>IT & Programming</span>
                </label>
                <label className="fw-checkbox">
                  <input 
                    type="checkbox" 
                    checked={filters.category === 'Design & Multimedia'}
                    onChange={() => setFilters({...filters, category: 'Design & Multimedia'})}
                  />
                  <span>Design & Multimedia</span>
                </label>
                <label className="fw-checkbox">
                  <input 
                    type="checkbox" 
                    checked={filters.category === 'Writing & Translation'}
                    onChange={() => setFilters({...filters, category: 'Writing & Translation'})}
                  />
                  <span>Writing & Translation</span>
                </label>
                <label className="fw-checkbox">
                  <input 
                    type="checkbox" 
                    checked={filters.category === 'Sales & Marketing'}
                    onChange={() => setFilters({...filters, category: 'Sales & Marketing'})}
                  />
                  <span>Sales & Marketing</span>
                </label>
                <label className="fw-checkbox">
                  <input 
                    type="checkbox" 
                    checked={filters.category === 'Admin Support'}
                    onChange={() => setFilters({...filters, category: 'Admin Support'})}
                  />
                  <span>Admin Support</span>
                </label>
                <label className="fw-checkbox">
                  <input 
                    type="checkbox" 
                    checked={filters.category === 'Legal'}
                    onChange={() => setFilters({...filters, category: 'Legal'})}
                  />
                  <span>Legal</span>
                </label>
                <label className="fw-checkbox">
                  <input 
                    type="checkbox" 
                    checked={filters.category === 'Finance & Management'}
                    onChange={() => setFilters({...filters, category: 'Finance & Management'})}
                  />
                  <span>Finance & Management</span>
                </label>
                <label className="fw-checkbox">
                  <input 
                    type="checkbox" 
                    checked={filters.category === 'Engineering & Manufacturing'}
                    onChange={() => setFilters({...filters, category: 'Engineering & Manufacturing'})}
                  />
                  <span>Engineering & Manufacturing</span>
                </label>
              </div>
        </div>

            <div className="fw-filter-item">
              <label className="fw-label">Skills</label>
            <input
                type="text"
                className="fw-input"
                placeholder="Enter the skills you need"
                value={filters.skills}
                onChange={(e) => setFilters({...filters, skills: e.target.value})}
              />
            </div>

            <div className="fw-filter-item">
              <label className="fw-label">Publication date</label>
              <select
                className="fw-select"
                value={filters.publicationDate}
                onChange={(e) => setFilters({...filters, publicationDate: e.target.value})}
              >
                <option>Any time</option>
                <option>Last 24 hours</option>
                <option>Last 3 days</option>
                <option>Last week</option>
                <option>Last month</option>
              </select>
            </div>

            <div className="fw-filter-item">
              <label className="fw-label">Contract type</label>
              <div className="fw-radio-group">
                <label className="fw-radio">
                  <input 
                    type="radio" 
                    name="contractType" 
                    value="All"
                    checked={filters.contractType === 'All'}
                    onChange={(e) => setFilters({...filters, contractType: e.target.value})}
                  />
                  <span>All</span>
                </label>
                <label className="fw-radio">
                  <input 
                    type="radio" 
                    name="contractType" 
                    value="Fixed price"
                    checked={filters.contractType === 'Fixed price'}
                    onChange={(e) => setFilters({...filters, contractType: e.target.value})}
                  />
                  <span>Fixed price</span>
                </label>
                <label className="fw-radio">
                  <input 
                    type="radio" 
                    name="contractType" 
                    value="Hourly"
                    checked={filters.contractType === 'Hourly'}
                    onChange={(e) => setFilters({...filters, contractType: e.target.value})}
                  />
                  <span>Hourly</span>
                </label>
              </div>
            </div>

            <div className="fw-filter-item">
              <label className="fw-label">Language</label>
              <div className="fw-radio-group">
                <label className="fw-radio">
                  <input 
                    type="radio" 
                    name="language" 
                    value="All"
                    checked={filters.language === 'All'}
                    onChange={(e) => setFilters({...filters, language: e.target.value})}
                  />
                  <span>All</span>
                </label>
                <label className="fw-radio">
                  <input 
                    type="radio" 
                    name="language" 
                    value="English"
                    checked={filters.language === 'English'}
                    onChange={(e) => setFilters({...filters, language: e.target.value})}
                  />
                  <span>English</span>
                </label>
                <label className="fw-radio">
                  <input 
                    type="radio" 
                    name="language" 
                    value="Portugués"
                    checked={filters.language === 'Portugués'}
                    onChange={(e) => setFilters({...filters, language: e.target.value})}
                  />
                  <span>Portugués</span>
                </label>
                <label className="fw-radio">
                  <input 
                    type="radio" 
                    name="language" 
                    value="Español"
                    checked={filters.language === 'Español'}
                    onChange={(e) => setFilters({...filters, language: e.target.value})}
                  />
                  <span>Español</span>
                </label>
              </div>
            </div>

            <div className="fw-filter-item">
              <label className="fw-label">Client location</label>
              <div className="fw-row">
                <select 
                  className="fw-select"
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
                  className="fw-select"
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

            <div className="fw-filter-item">
              <label className="fw-label">Payments to freelancers</label>
              <div className="fw-radio-group">
                <label className="fw-radio">
                  <input 
                    type="radio" 
                    name="payments" 
                    value="All"
                    checked={filters.payments === 'All'}
                    onChange={(e) => setFilters({...filters, payments: e.target.value})}
                  />
                  <span>All</span>
                </label>
                <label className="fw-radio">
                  <input 
                    type="radio" 
                    name="payments" 
                    value="0"
                    checked={filters.payments === '0'}
                    onChange={(e) => setFilters({...filters, payments: e.target.value})}
                  />
                  <span>0</span>
                </label>
                <label className="fw-radio">
                  <input 
                    type="radio" 
                    name="payments" 
                    value="1+"
                    checked={filters.payments === '1+'}
                    onChange={(e) => setFilters({...filters, payments: e.target.value})}
                  />
                  <span>1+</span>
                </label>
              </div>
            </div>

            <div className="fw-filter-item">
              <label className="fw-label">Bids received</label>
              <div className="fw-radio-group">
                <label className="fw-radio">
                  <input 
                    type="radio" 
                    name="bids" 
                    value="All"
                    checked={filters.bids === 'All'}
                    onChange={(e) => setFilters({...filters, bids: e.target.value})}
                  />
                  <span>All</span>
                </label>
                <label className="fw-radio">
                  <input 
                    type="radio" 
                    name="bids" 
                    value="0-4 bids"
                    checked={filters.bids === '0-4 bids'}
                    onChange={(e) => setFilters({...filters, bids: e.target.value})}
                  />
                  <span>0-4 bids</span>
                </label>
                <label className="fw-radio">
                  <input 
                    type="radio" 
                    name="bids" 
                    value="5+ bids"
                    checked={filters.bids === '5+ bids'}
                    onChange={(e) => setFilters({...filters, bids: e.target.value})}
                  />
                  <span>5+ bids</span>
                </label>
              </div>
            </div>

            <button className="fw-save-search">Save search</button>
            </div>
          </aside>

        {/* Main Content */}
        <main className="fw-main">
          <div className="fw-search-bar">
            <input
              type="text"
              className="fw-search-input"
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="fw-search-tags">
              <span className="fw-tag">English <span className="fw-tag-close">×</span></span>
            </div>
          </div>

          {loading ? (
            <div className="fw-loading">Loading jobs...</div>
          ) : error ? (
            <div className="fw-no-results">
              <h3>Error loading projects</h3>
              <p>{error}</p>
            </div>
          ) : (
            <div className="fw-jobs">
              {visibleProjects.length === 0 ? (
                <div className="fw-no-results">
                  <h3>No jobs found</h3>
                  <p>Try adjusting your search criteria or filters</p>
                </div>
              ) : (
                visibleProjects.map((job) => (
                  <div key={job._id} className="fw-job-card">
                    <div className="fw-job-header">
                      <h3 className="fw-job-title">{job.title}</h3>
                      <button 
                        className="fw-bid-btn"
                        onClick={() => handleBidClick(job)}
                        disabled={!user}
                      >
                        Place a bid
                      </button>
                    </div>
                    
                    <div className="fw-job-meta">
                      <span className="fw-budget">{job.budget}</span>
                      <span className="fw-separator">•</span>
                      <span className="fw-published">Published: {job.published}</span>
                      <span className="fw-separator">•</span>
                      <span className="fw-bids">Bids: {job.bids}</span>
                    </div>

                    <p className="fw-job-description">{truncateDescription(job.description)}</p>

                    <div className="fw-job-skills">
                      {job.skills && job.skills.map((skill, index) => (
                        <span key={index} className="fw-skill-tag">{skill}</span>
                      ))}
                      {job.skills && job.skills.length > 5 && (
                        <span className="fw-skill-more">+</span>
                      )}
                    </div>

                    <div className="fw-job-client">
                      <div className="fw-client-info">
                        <div className="fw-client-avatar">{job.client?.initials}</div>
                        <div className="fw-client-details">
                          <div className="fw-client-meta">
                            {job.client?.lastReply && (
                              <>
                                <span>Last reply: {job.client.lastReply}</span>
                                <span className="fw-separator">•</span>
                              </>
                            )}
                            <span>{job.client?.location}</span>
                            <span className="fw-separator">•</span>
                            <span className="fw-rating">{'★'.repeat(job.client?.rating || 5)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="fw-payment-method">
                        {job.verified ? (
                          <span className="fw-verified">✓ Verified</span>
                        ) : (
                          <span className="fw-unverified">Unverified</span>
                        )}
                      </div>
                    </div>

                    <a href="#" className="fw-flag-link">Flag as inappropriate</a>
                  </div>
                ))
              )}
            </div>
          )}
        </main>
      </div>

      <button className="fw-help-btn">❓ Help</button>
      <Footer />
      
      {/* Bid Modal */}
      <BidModal 
        isOpen={isBidModalOpen}
        onClose={handleCloseBidModal}
        project={selectedProject}
        user={user}
        onBidSubmitted={handleBidSubmitted}
      />
    </div>
  );
};

export default FindWork;
