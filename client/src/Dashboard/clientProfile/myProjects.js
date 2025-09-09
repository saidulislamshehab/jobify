import React, { useState, useEffect } from 'react';
import './myProjects.css';
import Footer from '../../LandingPage/footer';
import DashboardNav from '../DashboardNav';
import ProjectActionsModal from './ProjectActionsModal';
import BidManagementModal from './BidManagementModal';

const MyProjects = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedMessageFilter, setSelectedMessageFilter] = useState('All');
  const [hasDeliverables, setHasDeliverables] = useState(false);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isActionsModalOpen, setIsActionsModalOpen] = useState(false);
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);
  const [projectBids, setProjectBids] = useState({});
  const [projectStats, setProjectStats] = useState({});

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
    // Fetch user's projects from ClientProject collection
    const fetchProjects = async () => {
      if (user) {
        setProjectsLoading(true);
        
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
            
            // Fetch bid counts for each project
            fetchProjectBids(userProjects);
          }
        } catch (error) {
          console.error('Error fetching projects:', error);
          // fall back to empty state without error banner
          setProjects([]);
          setFilteredProjects([]);
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

  const fetchProjectBids = async (projectList) => {
    const bidsData = {};
    const statsData = {};
    
    for (const project of projectList) {
      if (project.status === 'published' || project.status === 'in-progress' || project.status === 'completed') {
        try {
          const response = await fetch(`http://localhost:5000/api/bids/project/${project._id}`);
          if (response.ok) {
            const data = await response.json();
            bidsData[project._id] = data.bids || [];
            
            // Calculate stats
            const bids = data.bids || [];
            statsData[project._id] = {
              total: bids.length,
              pending: bids.filter(b => b.status === 'pending').length,
              accepted: bids.filter(b => b.status === 'accepted').length,
              rejected: bids.filter(b => b.status === 'rejected').length,
              avgBid: bids.length > 0 ? bids.reduce((sum, b) => sum + b.bidAmount, 0) / bids.length : 0,
              minBid: bids.length > 0 ? Math.min(...bids.map(b => b.bidAmount)) : 0,
              maxBid: bids.length > 0 ? Math.max(...bids.map(b => b.bidAmount)) : 0
            };
          }
        } catch (error) {
          console.error(`Error fetching bids for project ${project._id}:`, error);
        }
      }
    }
    
    setProjectBids(bidsData);
    setProjectStats(statsData);
  };

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
        }
      } catch (error) {
        console.error('Error refreshing projects:', error);
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
    // Navigate to edit project page
    window.location.href = `/edit-project/${projectId}`;
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      try {
        const response = await fetch(`http://localhost:5000/api/projects/delete/${projectId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // Remove the project from the local state
          const updatedProjects = projects.filter(project => project._id !== projectId);
          const updatedFilteredProjects = filteredProjects.filter(project => project._id !== projectId);
          setProjects(updatedProjects);
          setFilteredProjects(updatedFilteredProjects);
          
          // Remove from bids data
          const newProjectBids = { ...projectBids };
          const newProjectStats = { ...projectStats };
          delete newProjectBids[projectId];
          delete newProjectStats[projectId];
          setProjectBids(newProjectBids);
          setProjectStats(newProjectStats);
          
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

  const handlePublishProject = async (projectId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/projects/publish/${projectId}`, {
        method: 'PUT',
      });

      if (response.ok) {
        const data = await response.json();
        
        // Update the project status in local state
        const updatedProjects = projects.map(project => 
          project._id === projectId 
            ? { ...project, status: 'published', updatedAt: data.project.updatedAt }
            : project
        );
        setProjects(updatedProjects);
        setFilteredProjects(updatedProjects.filter(project => {
          // Re-apply current filters
          if (selectedStatus !== 'All') {
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
          }
          return true;
        }));
        
        alert('Project published successfully! Freelancers can now see it in Find Work and start bidding.');
      } else {
        const errorData = await response.json();
        alert('Failed to publish project: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error publishing project:', error);
      alert('Network error: ' + error.message);
    }
  };

  const handleViewBids = (projectId) => {
    const project = projects.find(p => p._id === projectId);
    setSelectedProject(project);
    setIsBidModalOpen(true);
  };

  const handleProjectMenu = (project) => {
    setSelectedProject(project);
    setIsActionsModalOpen(true);
  };

  const getBidCount = (projectId) => {
    return projectStats[projectId]?.total || 0;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
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
      {/* Shared Dashboard Navigation */}
      <DashboardNav user={user} />

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
                        <button 
                          className="project-menu"
                          onClick={() => handleProjectMenu(project)}
                        >
                          <span>⋮</span>
                        </button>
                      </div>
                    </div>
                    
                    <div className="project-details">
                      <div className="project-description">
                        <p>{project.description?.substring(0, 150)}{project.description?.length > 150 ? '...' : ''}</p>
                      </div>
                      
                      <div className="project-meta">
                        <span className="meta-item">
                          <span className="meta-label">Type:</span>
                          <span className="meta-value">{getPaymentTypeText(project.paymentOption)}</span>
                        </span>
                        <span className="meta-item">
                          <span className="meta-label">Budget:</span>
                          <span className="meta-value">
                            {project.paymentOption === 'hourly' 
                              ? `${formatCurrency(project.budget)}/hr` 
                              : formatCurrency(project.budget)
                            }
                          </span>
                        </span>
                        <span className="meta-item">
                          <span className="meta-label">Created:</span>
                          <span className="meta-value">{formatTimeAgo(project.createdAt)}</span>
                        </span>
                        {getBidCount(project._id) > 0 && (
                          <span className="meta-item">
                            <span className="meta-label">Bids:</span>
                            <span className="meta-value">{getBidCount(project._id)}</span>
                          </span>
                        )}
                      </div>

                      {project.skills && project.skills.length > 0 && (
                        <div className="project-skills">
                          <span className="skills-label">Tags:</span>
                          <div className="skills-container">
                            {project.skills.slice(0, 5).map((skill, index) => (
                              <span key={index} className="skill-tag">{skill}</span>
                            ))}
                            {project.skills.length > 5 && (
                              <span className="skill-more">+{project.skills.length - 5} more</span>
                            )}
                          </div>
                        </div>
                      )}
                      
                      <div className="project-actions">
                        {project.status === 'draft' && (
                          <button 
                            className="publish-btn"
                            onClick={() => handlePublishProject(project._id)}
                          >
                            Publish Project
                          </button>
                        )}
                        
                        {(project.status === 'published' || project.status === 'in-progress' || project.status === 'completed') && (
                          <button 
                            className="view-bids-btn"
                            onClick={() => handleViewBids(project._id)}
                          >
                            View Bids ({getBidCount(project._id)})
                          </button>
                        )}
                        
                        {projectStats[project._id] && (
                          <div className="project-stats-mini">
                            {projectStats[project._id].pending > 0 && (
                              <span className="stat-pending">{projectStats[project._id].pending} pending</span>
                            )}
                            {projectStats[project._id].accepted > 0 && (
                              <span className="stat-accepted">{projectStats[project._id].accepted} accepted</span>
                            )}
                          </div>
                        )}
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
      
      {/* Project Actions Modal */}
      <ProjectActionsModal
        isOpen={isActionsModalOpen}
        onClose={() => {
          setIsActionsModalOpen(false);
          setSelectedProject(null);
        }}
        project={selectedProject}
        onEdit={handleEditProject}
        onDelete={handleDeleteProject}
        onPublish={handlePublishProject}
        onViewBids={handleViewBids}
        bidCount={selectedProject ? getBidCount(selectedProject._id) : 0}
      />
      
      {/* Bid Management Modal */}
      <BidManagementModal
        isOpen={isBidModalOpen}
        onClose={() => {
          setIsBidModalOpen(false);
          setSelectedProject(null);
        }}
        projectId={selectedProject?._id}
        project={selectedProject}
      />
    </div>
  );
};

export default MyProjects;

