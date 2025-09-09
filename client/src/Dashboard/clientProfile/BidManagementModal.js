import React, { useState, useEffect } from 'react';
import './BidManagementModal.css';

const BidManagementModal = ({ isOpen, onClose, projectId, project }) => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedBid, setSelectedBid] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    if (isOpen && projectId) {
      fetchBids();
    }
  }, [isOpen, projectId]);

  const fetchBids = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`http://localhost:5000/api/bids/project/${projectId}`);
      const data = await response.json();
      
      if (response.ok) {
        setBids(data.bids || []);
      } else {
        setError(data.message || 'Failed to fetch bids');
      }
    } catch (error) {
      console.error('Error fetching bids:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBidAction = async (bidId, action, clientResponse = '') => {
    if (!selectedBid) return;

    if (action === 'accepted' && !window.confirm('Are you sure you want to accept this bid? This will automatically reject all other bids for this project.')) {
      return;
    }

    if (action === 'rejected' && !window.confirm('Are you sure you want to reject this bid?')) {
      return;
    }

    setActionLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/bids/status/${bidId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: action,
          clientResponse: clientResponse
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Refresh bids after action
        await fetchBids();
        setSelectedBid(null);
        alert(`Bid ${action} successfully!`);
      } else {
        alert(data.message || `Failed to ${action} bid`);
      }
    } catch (error) {
      console.error(`Error ${action} bid:`, error);
      alert('Network error. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (!isOpen) return null;

  return (
    <div className="bid-management-modal-overlay" onClick={onClose}>
      <div className="bid-management-modal" onClick={(e) => e.stopPropagation()}>
        <div className="bid-modal-header">
          <div>
            <h2>Project Bids</h2>
            <p className="project-title">{project?.title}</p>
          </div>
          <button className="bid-modal-close" onClick={onClose}>×</button>
        </div>

        <div className="bid-modal-content">
          {loading ? (
            <div className="bid-loading">
              <p>Loading bids...</p>
            </div>
          ) : error ? (
            <div className="bid-error">
              <p>{error}</p>
              <button onClick={fetchBids} className="retry-btn">Try Again</button>
            </div>
          ) : bids.length === 0 ? (
            <div className="no-bids">
              <p>No bids received yet for this project.</p>
              <small>Once freelancers start bidding, you'll see them here.</small>
            </div>
          ) : (
            <div className="bids-list">
              {bids.map((bid) => (
                <div key={bid._id} className={`bid-card ${bid.status}`}>
                  <div className="bid-header">
                    <div className="freelancer-info">
                      <h4 className="freelancer-name">{bid.freelancerName}</h4>
                      <p className="freelancer-email">{bid.freelancerEmail}</p>
                    </div>
                    <div className="bid-amount">
                      <span className="amount">{formatCurrency(bid.bidAmount)}</span>
                      <span className="delivery">{bid.deliveryTime} days</span>
                    </div>
                  </div>

                  <div className="bid-details">
                    <div className="cover-letter">
                      <h5>Cover Letter:</h5>
                      <p>{bid.coverLetter}</p>
                    </div>

                    {bid.proposedSkills && bid.proposedSkills.length > 0 && (
                      <div className="proposed-skills">
                        <h5>Proposed Skills:</h5>
                        <div className="skills-tags">
                          {bid.proposedSkills.map((skill, index) => (
                            <span key={index} className="skill-tag">{skill}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="bid-meta">
                      <span className="bid-date">Submitted: {formatDate(bid.createdAt)}</span>
                      <span className={`bid-status ${bid.status}`}>
                        {bid.status === 'pending' && 'Pending Review'}
                        {bid.status === 'accepted' && 'Accepted'}
                        {bid.status === 'rejected' && 'Rejected'}
                        {bid.status === 'withdrawn' && 'Withdrawn'}
                      </span>
                    </div>

                    {bid.clientResponse && (
                      <div className="client-response">
                        <h5>Your Response:</h5>
                        <p>{bid.clientResponse}</p>
                      </div>
                    )}
                  </div>

                  {bid.status === 'pending' && (
                    <div className="bid-actions">
                      <button
                        className="accept-btn"
                        onClick={() => setSelectedBid(bid)}
                        disabled={actionLoading}
                      >
                        Accept Bid
                      </button>
                      <button
                        className="reject-btn"
                        onClick={() => handleBidAction(bid._id, 'rejected')}
                        disabled={actionLoading}
                      >
                        Reject Bid
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Accept Bid Confirmation */}
        {selectedBid && (
          <div className="accept-bid-overlay">
            <div className="accept-bid-modal">
              <h3>Accept Bid</h3>
              <p>You're about to accept {selectedBid.freelancerName}'s bid of {formatCurrency(selectedBid.bidAmount)} for {selectedBid.deliveryTime} days.</p>
              
              <div className="response-section">
                <label htmlFor="clientResponse">Optional message to freelancer:</label>
                <textarea
                  id="clientResponse"
                  placeholder="Welcome message, next steps, etc..."
                  rows="3"
                  ref={(input) => {
                    if (input) input.focus();
                  }}
                />
              </div>

              <div className="accept-actions">
                <button
                  className="cancel-accept-btn"
                  onClick={() => setSelectedBid(null)}
                  disabled={actionLoading}
                >
                  Cancel
                </button>
                <button
                  className="confirm-accept-btn"
                  onClick={() => {
                    const response = document.getElementById('clientResponse').value;
                    handleBidAction(selectedBid._id, 'accepted', response);
                  }}
                  disabled={actionLoading}
                >
                  {actionLoading ? 'Accepting...' : 'Confirm Accept'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BidManagementModal;
