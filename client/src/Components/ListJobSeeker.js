import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ListJobSeeker.css';

const ListJobSeeker = () => {
  const navigate = useNavigate();
  const [jobSeekers, setJobSeekers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSkills, setFilterSkills] = useState('');

  useEffect(() => {
    fetchJobSeekers();
  }, []);

  const fetchJobSeekers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/jobseekers/get');
      setJobSeekers(response.data);
    } catch (error) {
      console.error('Error fetching job seekers:', error);
      setError('Failed to load job seekers. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job seeker?')) {
      try {
        await axios.delete(`http://localhost:5000/api/jobseekers/delete/${id}`);
        setJobSeekers(jobSeekers.filter(seeker => seeker._id !== id));
        alert('Job seeker deleted successfully!');
      } catch (error) {
        console.error('Error deleting job seeker:', error);
        alert('Failed to delete job seeker. Please try again.');
      }
    }
  };

  const filteredJobSeekers = jobSeekers.filter(seeker => {
    const matchesSearch = seeker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         seeker.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         seeker.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSkills = !filterSkills || 
                         seeker.skills?.toLowerCase().includes(filterSkills.toLowerCase());
    
    return matchesSearch && matchesSkills;
  });

  if (loading) {
    return (
      <div className="list-jobseeker-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading job seekers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="list-jobseeker-container">
      <div className="list-header">
        <h1>Job Seekers Directory</h1>
        <p>Browse and manage job seeker profiles</p>
      </div>

      <div className="controls-section">
        <div className="search-filters">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by name, email, or job title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filter-box">
            <input
              type="text"
              placeholder="Filter by skills..."
              value={filterSkills}
              onChange={(e) => setFilterSkills(e.target.value)}
              className="filter-input"
            />
          </div>
        </div>
        
        <div className="action-buttons">
          <button onClick={() => navigate('/add-jobseeker')} className="btn-add">
            Add New Job Seeker
          </button>
          <button onClick={() => navigate('/signup')} className="btn-back">
            Back to Signup
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="jobseekers-grid">
        {filteredJobSeekers.length === 0 ? (
          <div className="no-results">
            <h3>No job seekers found</h3>
            <p>Try adjusting your search criteria or add a new job seeker.</p>
          </div>
        ) : (
          filteredJobSeekers.map((seeker) => (
            <div key={seeker._id} className="jobseeker-card">
              <div className="card-header">
                <div className="avatar">
                  {seeker.name.charAt(0).toUpperCase()}
                </div>
                <div className="basic-info">
                  <h3>{seeker.name}</h3>
                  <p className="email">{seeker.email}</p>
                  {seeker.jobTitle && <p className="job-title">{seeker.jobTitle}</p>}
                </div>
              </div>

              <div className="card-content">
                <div className="info-row">
                  <span className="label">Age:</span>
                  <span className="value">{seeker.age}</span>
                </div>
                <div className="info-row">
                  <span className="label">Location:</span>
                  <span className="value">{seeker.city}, {seeker.country}</span>
                </div>
                <div className="info-row">
                  <span className="label">Education:</span>
                  <span className="value">{seeker.education}</span>
                </div>
                {seeker.skills && (
                  <div className="info-row">
                    <span className="label">Skills:</span>
                    <span className="value skills-text">{seeker.skills}</span>
                  </div>
                )}
                {seeker.experience && (
                  <div className="info-row">
                    <span className="label">Experience:</span>
                    <span className="value experience-text">{seeker.experience}</span>
                  </div>
                )}
              </div>

              <div className="card-actions">
                <button 
                  onClick={() => navigate(`/profile/${seeker._id}`)} 
                  className="btn-view"
                >
                  View Profile
                </button>
                <button 
                  onClick={() => handleDelete(seeker._id)} 
                  className="btn-delete"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="stats-section">
        <div className="stat-item">
          <span className="stat-number">{jobSeekers.length}</span>
          <span className="stat-label">Total Job Seekers</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{filteredJobSeekers.length}</span>
          <span className="stat-label">Filtered Results</span>
        </div>
      </div>
    </div>
  );
};

export default ListJobSeeker;
