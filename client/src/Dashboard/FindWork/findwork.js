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
        const data = await res.json();
        const currentUserId = user?.id || user?._id;
        const all = Array.isArray(data) ? data : [];
        const filtered = currentUserId ? all.filter(p => String(p.clientId) !== String(currentUserId)) : all;
        setProjects(filtered);
      } catch (_) {
        setProjects([]);
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

  // Mock job data for demonstration
  const mockJobs = [
    {
      _id: '1',
      title: 'Develop an Innovative and Disruptive Website for a Sound Healing Sc...',
      budget: 'USD 250 - 500',
      published: '3 hours ago',
      bids: 4,
      description: 'We are seeking a skilled web developer or team to create a new website for our sound healing school. The goal is to develop an innovative and disruptive online presence that reflects the unique nature of sound healing and stands out in the educational sector. The website should be modern, highly functional, and provide an exceptional user experienc... View more',
      skills: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'WordPress', 'Responsive Web Design', 'React.js'],
      client: { initials: 'M.L.', lastReply: '15 minutes ago', location: 'Sri Lanka', rating: 5 },
      verified: true,
      category: 'IT & Programming',
      contractType: 'Fixed price',
      language: 'English'
    },
    {
      _id: '2',
      title: 'Flash usdt sender',
      budget: 'USD 250 - 500',
      published: '4 hours ago',
      bids: 5,
      deliveryTerm: '2025/01/30',
      description: 'I\'m interested in flash USDT sender software USDT must be transferable tradeble and convertible USDT must remain in target wallet 180 days Category: IT & Programming Subcategory: Web development What is the scope of the project?: Create a new custom site ... View more',
      skills: ['JavaScript', 'MySQL', 'PHP', 'API', 'CSS', 'HTML', 'Python', 'WordPress', 'Responsive Web Design'],
      client: { initials: 'H.M.', lastReply: '2 hours ago', location: 'Uzbekistan', rating: 5 },
      verified: true,
      category: 'IT & Programming',
      contractType: 'Fixed price',
      language: 'English'
    },
    {
      _id: '3',
      title: 'Junior Digital & AI Generalist (Part-time, Remote)',
      budget: 'USD 250 - 500',
      published: '19 hours ago',
      bids: 13,
      description: 'We are launching an international startup building the future of living, starting in the US (Texas). I\'m looking for a hands-on, creative, AI-curious junior who can also write and communicate in English. This is a generalist role - not just social media. You\'ll be involved in different areas of the startup and work directly with th... View more',
      skills: ['Facebook', 'Internet Marketing', 'Marketing', 'Copywriting', 'Marketing Strategy'],
      client: { initials: 'F.C.', lastReply: '36 minutes ago', location: 'United States', rating: 5 },
      verified: true,
      category: 'Sales & Marketing',
      contractType: 'Fixed price',
      language: 'English'
    },
    {
      _id: '4',
      title: 'Virtual Assistant (Fluent English, U.S. Business Experience) - Bris...',
      budget: 'Less than USD 15 / hour',
      published: 'Yesterday',
      bids: 14,
      description: 'Brisa Summer Kitchen is a premium outdoor kitchen brand based in the United States. We are expanding supplier partnerships and e-commerce operations and need a proactive, detail-oriented Virtual Assistant to support daily operations. You will also provide light, temporary support for our other brand, Adore Sports, until a U.S.-Based PA is hired in... View more',
      skills: ['Virtual Assistant', 'Admin Assistant', 'Email Handling', 'Telephone Handling', 'Data Entry'],
      client: { initials: 'K.M.', lastReply: '2 hours ago', location: 'United States', rating: 5 },
      verified: true,
      category: 'Admin Support',
      contractType: 'Hourly',
      language: 'English'
    }
  ];

  const allJobs = [...projects, ...mockJobs];

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

      {/* Sub Navigation */}
      <div className="fw-sub-nav">
        <div className="fw-sub-nav-container">
          <nav className="fw-sub-nav-links">
            <a 
              href="#" 
              className={`fw-sub-nav-link ${activeSubNav === 'find-projects' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); setActiveSubNav('find-projects'); }}
            >
              Find projects
            </a>
            <a 
              href="#" 
              className={`fw-sub-nav-link ${activeSubNav === 'projects-with-skills' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); setActiveSubNav('projects-with-skills'); }}
            >
              Projects with my skills
            </a>
            <a 
              href="#" 
              className={`fw-sub-nav-link ${activeSubNav === 'membership' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); setActiveSubNav('membership'); }}
            >
              Membership
            </a>
            <a 
              href="#" 
              className={`fw-sub-nav-link ${activeSubNav === 'favorite-clients' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); setActiveSubNav('favorite-clients'); }}
            >
              My favorite clients
            </a>
          </nav>
        </div>
      </div>
      
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

        {/* Main Content - Dynamic based on sub-nav */}
        <main className="fw-main">
          {activeSubNav === 'find-projects' && (
            <>
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

                        <p className="fw-job-description">{job.description}</p>

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
            </>
          )}

          {activeSubNav === 'projects-with-skills' && (
            <>
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
                  <span className="fw-tag">CSS <span className="fw-tag-close">×</span></span>
                  <span className="fw-tag">HTML <span className="fw-tag-close">×</span></span>
                  <span className="fw-tag">JavaScript <span className="fw-tag-close">×</span></span>
                </div>
              </div>

              {loading ? (
                <div className="fw-loading">Loading jobs...</div>
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
                          {job.deliveryTerm && (
                            <>
                              <span className="fw-separator">•</span>
                              <span className="fw-delivery">Delivery term: {job.deliveryTerm}</span>
                            </>
                          )}
                        </div>

                        <p className="fw-job-description">{job.description}</p>

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
            </>
          )}

          {activeSubNav === 'membership' && (
            <div className="fw-sub-content">
              <h2>Membership Plans</h2>
              <p>Upgrade your membership to get more visibility and better opportunities.</p>
              <div className="fw-membership-cards">
                <div className="fw-membership-card">
                  <h3>Basic</h3>
                  <div className="fw-price">Free</div>
                  <ul>
                    <li>Basic project visibility</li>
                    <li>Standard support</li>
                    <li>Basic analytics</li>
                  </ul>
                  <button className="fw-membership-btn current">Current Plan</button>
                </div>
                <div className="fw-membership-card featured">
                  <h3>Pro</h3>
                  <div className="fw-price">$29/month</div>
                  <ul>
                    <li>Priority project visibility</li>
                    <li>Advanced analytics</li>
                    <li>Priority support</li>
                    <li>Custom proposals</li>
                  </ul>
                  <button className="fw-membership-btn">Upgrade</button>
                </div>
                <div className="fw-membership-card">
                  <h3>Premium</h3>
                  <div className="fw-price">$99/month</div>
                  <ul>
                    <li>Maximum visibility</li>
                    <li>All Pro features</li>
                    <li>Dedicated account manager</li>
                    <li>Custom branding</li>
                  </ul>
                  <button className="fw-membership-btn">Upgrade</button>
                </div>
              </div>
            </div>
          )}

          {activeSubNav === 'favorite-clients' && (
            <div className="fw-sub-content">
              <h2>My favorite clients</h2>
              <p>Keep track of clients you've worked with and want to work with again.</p>
              <div className="fw-placeholder">
                <div className="fw-placeholder-icon">❤️</div>
                <h3>No favorite clients yet</h3>
                <p>Start working with clients and add them to your favorites to see them here.</p>
                <button className="fw-primary-btn">Find projects</button>
              </div>
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
