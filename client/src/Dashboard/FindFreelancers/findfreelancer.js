import React, { useEffect, useState } from 'react';
import './findfreelancer.css';
import DashboardNav from '../DashboardNav';
import Footer from '../../LandingPage/footer';

const FindFreelancers = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [freelancers, setFreelancers] = useState([]);
  const [search, setSearch] = useState('');

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
      (Array.isArray(f.skills) ? f.skills.join(',') : (f.skills || '')).toLowerCase().includes(term)
    );
  });

  return (
    <div className="dashboard-page">
      <DashboardNav user={user} />
      <div className="list-jobseeker-container">
        <div className="list-header">
          <h1>Find freelancers</h1>
          <p>Browse and hire the best talent</p>
        </div>

        <div className="controls-section">
          <div className="search-filters">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search by name, email, or skills..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="no-results">Loading freelancers...</div>
        ) : (
          <div className="jobseekers-grid">
            {filtered.length === 0 ? (
              <div className="no-results">No freelancers found</div>
            ) : (
              filtered.map((f) => (
                <div key={f._id} className="jobseeker-card">
                  <div className="card-header">
                    <div className="avatar">{(f.name || 'U').charAt(0).toUpperCase()}</div>
                    <div className="basic-info">
                      <h3>{f.name}</h3>
                      <p className="email">{f.email}</p>
                      {f.jobTitle && <p className="job-title">{f.jobTitle}</p>}
                    </div>
                  </div>
                  <div className="card-content">
                    {f.skills && (
                      <div className="info-row">
                        <span className="label">Skills:</span>
                        <span className="value skills-text">{Array.isArray(f.skills) ? f.skills.join(', ') : f.skills}</span>
                      </div>
                    )}
                    {f.freelancerAboutMe && (
                      <div className="info-row">
                        <span className="label">About:</span>
                        <span className="value">{f.freelancerAboutMe}</span>
                      </div>
                    )}
                  </div>
                  <div className="card-actions">
                    <a href="/profile" className="btn-view">View Profile</a>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default FindFreelancers;


