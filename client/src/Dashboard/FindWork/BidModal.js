import React, { useState } from 'react';
import './BidModal.css';

const BidModal = ({ isOpen, onClose, project, user, onBidSubmitted }) => {
  const [formData, setFormData] = useState({
    bidAmount: '',
    deliveryTime: '',
    coverLetter: '',
    proposedSkills: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [skillInput, setSkillInput] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.proposedSkills.includes(skillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        proposedSkills: [...prev.proposedSkills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      proposedSkills: prev.proposedSkills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const validateForm = () => {
    if (!formData.bidAmount || parseFloat(formData.bidAmount) <= 0) {
      setError('Please enter a valid bid amount');
      return false;
    }
    if (!formData.deliveryTime || parseInt(formData.deliveryTime) <= 0) {
      setError('Please enter a valid delivery time');
      return false;
    }
    if (!formData.coverLetter.trim() || formData.coverLetter.trim().length < 50) {
      setError('Cover letter must be at least 50 characters long');
      return false;
    }
    if (formData.coverLetter.trim().length > 1000) {
      setError('Cover letter must be less than 1000 characters');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/bids/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId: project._id,
          freelancerId: user.id || user._id,
          bidAmount: parseFloat(formData.bidAmount),
          deliveryTime: parseInt(formData.deliveryTime),
          coverLetter: formData.coverLetter.trim(),
          proposedSkills: formData.proposedSkills
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Reset form
        setFormData({
          bidAmount: '',
          deliveryTime: '',
          coverLetter: '',
          proposedSkills: []
        });
        
        // Call success callback
        if (onBidSubmitted) {
          onBidSubmitted(data.bid);
        }
        
        // Close modal
        onClose();
        
        // Show success message
        alert('Bid submitted successfully!');
      } else {
        setError(data.message || 'Failed to submit bid');
      }
    } catch (error) {
      console.error('Error submitting bid:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleModalClick = (e) => {
    if (e.target.className === 'bid-modal-overlay') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="bid-modal-overlay" onClick={handleModalClick}>
      <div className="bid-modal">
        <div className="bid-modal-header">
          <h2>Place a Bid</h2>
          <button className="bid-modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="bid-modal-content">
          {/* Project Summary */}
          <div className="project-summary">
            <h3 className="project-title">{project.title}</h3>
            <p className="project-budget">
              Budget: {project.paymentOption === 'hourly' ? `$${project.budget}/hour` : `$${project.budget} fixed`}
            </p>
          </div>

          {error && <div className="bid-error">{error}</div>}

          <form onSubmit={handleSubmit} className="bid-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="bidAmount">Your Bid Amount ($) *</label>
                <input
                  type="number"
                  id="bidAmount"
                  name="bidAmount"
                  value={formData.bidAmount}
                  onChange={handleInputChange}
                  placeholder="Enter your bid amount"
                  min="1"
                  step="0.01"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="deliveryTime">Delivery Time (days) *</label>
                <input
                  type="number"
                  id="deliveryTime"
                  name="deliveryTime"
                  value={formData.deliveryTime}
                  onChange={handleInputChange}
                  placeholder="Number of days"
                  min="1"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="proposedSkills">Relevant Skills</label>
              <div className="skills-input-container">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a skill and press Enter"
                  className="skills-input"
                />
                <button type="button" onClick={addSkill} className="add-skill-btn">
                  Add
                </button>
              </div>
              {formData.proposedSkills.length > 0 && (
                <div className="skills-list">
                  {formData.proposedSkills.map((skill, index) => (
                    <span key={index} className="skill-tag">
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="remove-skill"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="coverLetter">Cover Letter *</label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleInputChange}
                placeholder="Explain why you're the best fit for this project (50-1000 characters)"
                rows="6"
                minLength="50"
                maxLength="1000"
                required
              />
              <div className="character-count">
                {formData.coverLetter.length}/1000 characters
              </div>
            </div>

            <div className="bid-modal-actions">
              <button
                type="button"
                onClick={onClose}
                className="cancel-btn"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="submit-bid-btn"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Bid'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BidModal;
