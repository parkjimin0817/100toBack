import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getVisiblePages = () => {
    const maxVisible = 5;
    let start = Math.max(currentPage - Math.floor(maxVisible / 2), 1);
    let end = start + maxVisible - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(end - maxVisible + 1, 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pages = getVisiblePages();

  return (
    <div style={{ marginTop: '20px', paddingBottom: '20px', textAlign: 'center' }}>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={{
            margin: '0 5px',
            padding: '5px 10px',
            backgroundColor: page === currentPage ? '#4FD377' : '#e5e7eb',
            color: page === currentPage ? '#fff' : '#000',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: page === currentPage ? 'bold' : 'normal'
          }}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
