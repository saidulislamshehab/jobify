import React, { useState, useEffect } from 'react';
import './myProjects.css';
import Footer from '../../LandingPage/footer';

const MyProjects = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedMessageFilter, setSelectedMessageFilter] = useState('All');
  const [hasDeliverables, setHasDeliverables] = useState(false);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [projectsError, setProjectsError] = useState(null);

  useEffect(() => {
    // Get user data from localStorage or sessionStorage
    const getUserData = () => {
      try {
        const userData = localStorage.getItem('user') || sessionStorage.getItem('user');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          console.log('User data loaded:', parsedUser);
          setUser(parsedUser);
        } else {
          console.log('No user data found, redirecting to login');
          window.location.href = '/login';
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        window.location.href = '/login';
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, []);

  useEffect(() => {
    // Fetch user's projects
    const fetchProjects = async () => {
      if (user) {
        setProjectsLoading(true);
        setProjectsError(null);
        
        try {
          const clientId = user.id || user._id;
          console.log('Fetching projects for clientId:', clientId);
          console.log('User data:', user);
          
          const response = await fetch(`http://localhost:5000/api/projects?clientId=${clientId}`);
          console.log('API response status:', response.status);
          
          if (response.ok) {
            const userProjects = await response.json();
            console.log('Fetched projects from database:', userProjects);
            console.log('Number of projects found:', userProjects.length);
            
            setProjects(userProjects);
            setFilteredProjects(userProjects);
          } else {
            const errorData = await response.json();
            console.error('Failed to fetch projects:', errorData);
            setProjectsError(errorData.message || 'Failed to fetch projects');
          }
        } catch (error) {
          console.error('Error fetching projects:', error);
          setProjectsError('Network error: ' + error.message);
        } finally {
          setProjectsLoading(false);
        }
      } else {
        console.log('No user data available for fetching projects');
        setProjectsLoading(false);
      }
    };

    fetchProjects();
  }, [user]);

  useEffect(() => {
    // Filter projects based on selected filters
    let filtered = [...projects];

    // Filter by status
    if (selectedStatus !== 'All') {
      filtered = filtered.filter(project => {
        switch (selectedStatus) {
          case 'Draft':
            return project.status === 'draft';
          case 'Evaluating bids':
            return project.status === 'published';
          case 'In progress':
            return project.status === 'in-progress' || project.status === 'active';
          case 'Completed':
            return project.status === 'completed' || project.status === 'finished';
          default:
            return true;
        }
      });
    }

    // Filter by message status (mock implementation)
    if (selectedMessageFilter !== 'All') {
      // This would be implemented based on actual message data
      // For now, we'll just show all projects
    }

    // Filter by deliverables (mock implementation)
    if (hasDeliverables) {
      // This would be implemented based on actual deliverables data
      // For now, we'll just show all projects
    }

    setFilteredProjects(filtered);
  }, [projects, selectedStatus, selectedMessageFilter, hasDeliverables]);

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  const handleMessageFilterChange = (filter) => {
    setSelectedMessageFilter(filter);
  };

  const handleDeliverablesChange = (e) => {
    setHasDeliverables(e.target.checked);
  };

  const handleRefreshProjects = async () => {
    if (user) {
      setProjectsLoading(true);
      setProjectsError(null);
      
      try {
        const clientId = user.id || user._id;
        console.log('Manually refreshing projects for clientId:', clientId);
        
        const response = await fetch(`http://localhost:5000/api/projects?clientId=${clientId}`);
        console.log('Refresh API response status:', response.status);
        
        if (response.ok) {
          const userProjects = await response.json();
          console.log('Refreshed projects from database:', userProjects);
          console.log('Number of projects found:', userProjects.length);
          
          setProjects(userProjects);
          setFilteredProjects(userProjects);
        } else {
          const errorData = await response.json();
          console.error('Failed to refresh projects:', errorData);
          setProjectsError(errorData.message || 'Failed to refresh projects');
        }
      } catch (error) {
        console.error('Error refreshing projects:', error);
        setProjectsError('Network error: ' + error.message);
      } finally {
        setProjectsLoading(false);
      }
    }
  };

  const testAPI = async () => {
    try {
      console.log('Testing API connection...');
      const response = await fetch('http://localhost:5000/api/projects/test');
      const data = await response.json();
      console.log('API Test Result:', data);
      alert(`API Test: ${data.message}\nTotal Projects: ${data.totalProjects}`);
    } catch (error) {
      console.error('API Test Error:', error);
      alert('API Test Failed: ' + error.message);
    }
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours === 1) {
      return '1 hour ago';
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'evaluating';
      case 'draft':
        return 'draft';
      case 'in-progress':
      case 'active':
        return 'in-progress';
      case 'completed':
      case 'finished':
        return 'completed';
      default:
        return 'draft';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'published':
        return 'Evaluating bids';
      case 'draft':
        return 'Draft';
      case 'in-progress':
      case 'active':
        return 'In progress';
      case 'completed':
      case 'finished':
        return 'Completed';
      default:
        return status || 'Draft';
    }
  };

  const getPaymentTypeText = (paymentOption) => {
    return paymentOption === 'hourly' ? 'Hourly' : 'Fixed price';
  };

  const handleEditProject = (projectId) => {
    // Navigate to edit project page or open edit modal
    console.log('Edit project:', projectId);
    // For now, just show an alert
    alert(`Edit project functionality for project ${projectId} will be implemented soon!`);
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      try {
        const response = await fetch(`http://localhost:5000/api/projects/delete/${projectId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // Remove the project from the local state
          setProjects(projects.filter(project => project._id !== projectId));
          setFilteredProjects(filteredProjects.filter(project => project._id !== projectId));
          alert('Project deleted successfully!');
        } else {
          const errorData = await response.json();
          alert('Failed to delete project: ' + (errorData.message || 'Unknown error'));
        }
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Network error: ' + error.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="my-projects-page">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          fontSize: '18px'
        }}>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="my-projects-page">
      {/* Header */}
      <header className="projects-header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="page-title">My projects</h1>
          </div>
          <div className="header-right">
            <div className="user-role-tabs">
              <button className="role-tab active">As Client</button>
              <button className="role-tab">As Freelancer</button>
            </div>
            <div className="header-actions-right">
              <button 
                onClick={testAPI} 
                className="test-btn"
                title="Test API"
              >
                🧪
              </button>
              <button 
                onClick={handleRefreshProjects} 
                className="refresh-btn"
                title="Refresh projects"
              >
                🔄
              </button>
              <a href="/add-project" className="post-project-btn">
                Post a project
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="projects-content">
        <div className="projects-container">
          {/* Filters Sidebar */}
          <aside className="filters-sidebar">
            <div className="filter-section">
              <h3 className="filter-title">Status</h3>
              <div className="status-dropdown">
                <select 
                  value={selectedStatus} 
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="status-select"
                >
                  <option value="All">All</option>
                  <option value="Draft">Draft</option>
                  <option value="Evaluating bids">Evaluating bids</option>
                  <option value="In progress">In progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="filter-section">
              <h3 className="filter-title">Messages</h3>
              <div className="message-filters">
                <div className="message-filter-row">
                  <button 
                    className={`message-filter ${selectedMessageFilter === 'All' ? 'active' : ''}`}
                    onClick={() => handleMessageFilterChange('All')}
                  >
                    All
                  </button>
                  <button 
                    className={`message-filter ${selectedMessageFilter === 'Unread' ? 'active' : ''}`}
                    onClick={() => handleMessageFilterChange('Unread')}
                  >
                    Unread
                  </button>
                </div>
                <button 
                  className={`message-filter ${selectedMessageFilter === 'In contact' ? 'active' : ''}`}
                  onClick={() => handleMessageFilterChange('In contact')}
                >
                  In contact
                </button>
              </div>
            </div>

            <div className="filter-section">
              <div className="deliverables-filter">
                <input 
                  type="checkbox" 
                  id="has-deliverables"
                  checked={hasDeliverables}
                  onChange={handleDeliverablesChange}
                  className="deliverables-checkbox"
                />
                <label htmlFor="has-deliverables" className="deliverables-label">
                  Has deliverables
                </label>
              </div>
            </div>
          </aside>

          {/* Projects List */}
          <main className="projects-main">
            {projectsLoading ? (
              <div className="projects-loading">
                <h3>Loading your projects...</h3>
                <p>Please wait while we fetch your projects.</p>
              </div>
            ) : projectsError ? (
              <div className="projects-error">
                <h3>Error loading projects</h3>
                <p>{projectsError}</p>
                <button 
                  onClick={handleRefreshProjects} 
                  className="retry-btn"
                >
                  Try Again
                </button>
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="no-projects">
                <h3>No projects found</h3>
                <p>You haven't posted any projects yet.</p>
                <a href="/add-project" className="post-first-project-btn">
                  Post your first project
                </a>
              </div>
            ) : (
              <div className="projects-list">
                {filteredProjects.map((project) => (
                  <div key={project._id} className="project-card">
                    <div className="project-header">
                      <h3 className="project-title">
                        {project.title || "Experienced Web Developer for Pharmacy Licensing Integration Platform"}
                      </h3>
                      <div className="project-status">
                        <span className={`status-tag ${getStatusColor(project.status)}`}>
                          {getStatusText(project.status)}
                        </span>
                        <button className="project-menu">
                          <span>⋮</span>
                        </button>
                      </div>
                    </div>
                    
                    <div className="project-details">
                      <div className="project-meta">
                        <span className="meta-item">
                          <span className="meta-text">13 messages (<span className="new-message">1 new</span>)</span>
                        </span>
                        <span className="meta-item">
                          <span className="meta-label">Type:</span>
                          <span className="meta-value">{getPaymentTypeText(project.paymentOption)}</span>
                        </span>
                        <span className="meta-item">
                          <span className="meta-label">Published:</span>
                          <span className="meta-value">{formatTimeAgo(project.createdAt)}</span>
                        </span>
                      </div>
                      
                      <div className="project-actions">
                        <a href="#" className="view-freelancers-link">
                          View all interested<br />
                          freelancers
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MyProjects;
