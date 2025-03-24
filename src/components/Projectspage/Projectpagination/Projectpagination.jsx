import React from 'react';
import { IconButton } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';  
import './Projectpagination.css'

const ProjectsPagination = ({ totalPages, currentPage, onPageChange }) => {
  if (totalPages < 2) return null;

  const getPages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    return [1, 2, 3, '...', totalPages];
  };

  const pages = getPages();

  return (
    <div className="pagination-container">
      <IconButton
        className={`pagination-nav ${currentPage === 1 ? 'disabled' : ''}`}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <KeyboardArrowLeftIcon />
      </IconButton>

      {pages.map((p, index) =>
        p === '...' ? (
          <span key={`ellipsis-${index}`} className="pagination-ellipsis">
            ...
          </span>
        ) : (
          <button
            key={p}
            className={`pagination-page ${p === currentPage ? 'active' : ''}`}
            onClick={() => onPageChange(p)}
          >
            {p}
          </button>
        )
      )}

      <IconButton
        className={`pagination-nav ${currentPage === totalPages ? 'disabled' : ''}`}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <KeyboardArrowRightIcon />
      </IconButton>
    </div>
  );
};

export default ProjectsPagination;