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
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);
  const [userBids, setUserBids] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (data) {
      try { setUser(JSON.parse(data)); } catch (_) {}
    }
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/projects');
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

  const visibleProjects = projects.filter((p) => {
    const term = search.toLowerCase();
    const matchesText =
      (p.title || '').toLowerCase().includes(term) ||
      (p.description || '').toLowerCase().includes(term) ||
      (Array.isArray(p.skills) ? p.skills.join(',') : (p.skills || '')).toLowerCase().includes(term);
    const matchesStatus = statusFilter === 'All' ? true : p.status === statusFilter.toLowerCase();
    return matchesText && matchesStatus;
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
    // Add the new bid to userBids
    setUserBids(prev => [newBid, ...prev]);
    
    // Optionally refresh projects or show a success message
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
    <div className="findwork-page">
      <DashboardNav user={user} />

      <div className="findwork-content">
        <div className="findwork-header">
          <h1 className="findwork-title">Find work</h1>
          <p className="findwork-subtitle">Browse available projects that match your skills</p>
        </div>

        <div className="findwork-body">
          <aside className="filters">
            <h3 className="filters-title">Filters</h3>
            <input
              className="filter-input"
              placeholder="Search projects, skills, description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="filters-row">
              <select
                className="status-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option>All</option>
                <option>draft</option>
                <option>published</option>
                <option>in-progress</option>
                <option>completed</option>
              </select>
            </div>
          </aside>

          <main className="results">
            {loading ? (
              <div className="empty">Loading projects...</div>
            ) : visibleProjects.length === 0 ? (
              <div className="empty">No projects found.</div>
            ) : (
              <div className="projects-list">
                {visibleProjects.map((p) => (
                  <div key={p._id} className="project-card">
                    <div className="project-header">
                      <h3 className="project-title">{p.title}</h3>
                      {hasUserBidOnProject(p._id) ? (
                        <span className={`bid-status ${getUserBidStatus(p._id)}`}>
                          {getUserBidStatus(p._id) === 'pending' && 'Bid Placed'}
                          {getUserBidStatus(p._id) === 'accepted' && 'Bid Accepted'}
                          {getUserBidStatus(p._id) === 'rejected' && 'Bid Rejected'}
                        </span>
                      ) : (
                        <button 
                          className="bid-btn"
                          onClick={() => handleBidClick(p)}
                          disabled={!user}
                        >
                          Place a bid
                        </button>
                      )}
                    </div>
                    <div className="project-meta">
                      <span className="price">{p.paymentOption === 'hourly' ? `Over USD ${p.budget} / hour` : `USD ${p.budget}`}</span>
                      {p.createdAt && <span className="dot">•</span>}
                      {p.createdAt && <span className="time">{new Date(p.createdAt).toLocaleDateString()}</span>}
                    </div>
                    <p className="project-desc">{p.description}</p>
                    {p.skills && (
                      <div className="tags">
                        {(Array.isArray(p.skills) ? p.skills : String(p.skills).split(',')).slice(0, 8).map((s, i) => (
                          <span key={i} className="tag">{String(s).trim()}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

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


