import React from 'react';
import '../styles/Pagination.css';

export default function Pagination() {
  return (
    <>
      <div className="pagination">
        <button disabled className="button-control">
          &lt; Prev
        </button>
        <button className="active">1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <button>5</button>
        <button className="button-control">Next &gt;</button>
      </div>
    </>
  );
}
