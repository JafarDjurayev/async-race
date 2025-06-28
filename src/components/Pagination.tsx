import React, { type JSX } from 'react';
import '../styles/Pagination.css';
import {type PaginationProps } from '../types/models';

export default function Pagination({currentPage,totalPages,onPageChange,}: PaginationProps): JSX.Element {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="pagination">
      <button
        className="button-control"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt; 
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={page === currentPage ? 'active' : ''}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

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

