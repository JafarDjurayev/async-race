import React, { type JSX } from 'react';
import '../styles/Pagination.css';
import { type PaginationProps } from '../types/models';
import { getVisiblePages } from '../utils/PaginationUtils';

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps): JSX.Element {
  const pages = getVisiblePages(currentPage, totalPages);

  return (
    <div className="pagination">
      <button
        className="button-control"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>

      {pages.map((page, index) =>
        page === '...' ? (
          <span key={`ellipsis-${index}`} className="ellipsis">
            ...
          </span>
        ) : (
          <button
            key={page}
            className={page === currentPage ? 'active' : ''}
            onClick={() => onPageChange(page as number)}
          >
            {page}
          </button>
        ),
      )}
      <button
        className="button-control"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
}
