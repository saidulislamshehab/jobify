import React, { useState } from 'react';
import './ProjectActionsModal.css';

const ProjectActionsModal = ({ 
  isOpen, 
  onClose, 
  project, 
  onEdit, 
  onDelete, 
  onPublish, 
  onViewBids,
  bidCount = 0 
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  if (!isOpen || !project) return null;

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      setIsDeleting(true);
      try {
        await onDelete(project._id);
        onClose();
      } catch (error) {
        console.error('Error deleting project:', error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handlePublish = async () => {
    if (project.status === 'draft') {
      if (window.confirm('Are you sure you want to publish this project? Once published, freelancers can start bidding on it.')) {
        setIsPublishing(true);
        try {
          await onPublish(project._id);
          onClose();
        } catch (error) {
          console.error('Error publishing project:', error);
        } finally {
          setIsPublishing(false);
        }
      }
    }
  };

  const handleViewBids = () => {
    onViewBids(project._id);
    onClose();
  };

  const handleEdit = () => {
    onEdit(project._id);
    onClose();
  };

  const canEdit = project.status === 'draft';
  const canPublish = project.status === 'draft';
  const canDelete = project.status === 'draft' || project.status === 'published';
  const canViewBids = project.status === 'published' || project.status === 'in-progress' || project.status === 'completed';

  return (
    <div className="project-actions-modal-overlay" onClick={onClose}>
      <div className="project-actions-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Project Actions</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="project-info">
          <h4>{project.title}</h4>
          <span className={`status-badge ${project.status}`}>
            {project.status === 'draft' && 'Draft'}
            {project.status === 'published' && 'Published'}
            {project.status === 'in-progress' && 'In Progress'}
            {project.status === 'completed' && 'Completed'}
          </span>
        </div>

        <div className="actions-list">
          {canEdit && (
            <button className="action-btn edit-btn" onClick={handleEdit}>
              <span className="action-icon">✏️</span>
              Edit Project
            </button>
          )}

          {canPublish && (
            <button 
              className="action-btn publish-btn" 
              onClick={handlePublish}
              disabled={isPublishing}
            >
              <span className="action-icon">🚀</span>
              {isPublishing ? 'Publishing...' : 'Publish Project'}
            </button>
          )}

          {canViewBids && (
            <button className="action-btn view-bids-btn" onClick={handleViewBids}>
              <span className="action-icon">👥</span>
              View Bids {bidCount > 0 && `(${bidCount})`}
            </button>
          )}

          <button className="action-btn duplicate-btn" onClick={() => alert('Duplicate functionality coming soon!')}>
            <span className="action-icon">📋</span>
            Duplicate Project
          </button>

          {canDelete && (
            <button 
              className="action-btn delete-btn" 
              onClick={handleDelete}
              disabled={isDeleting}
            >
              <span className="action-icon">🗑️</span>
              {isDeleting ? 'Deleting...' : 'Delete Project'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectActionsModal;
