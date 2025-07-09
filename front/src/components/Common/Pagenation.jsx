import React from 'react';
import styled from 'styled-components';

const Pagination = ({ currentPage, totalPages, onPageChange, Color }) => {
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
        <PagenationButton
          key={page}
          onClick={() => onPageChange(page)}
          $Color={Color}
          $currentPage={page === currentPage}
        >
          {page}
        </PagenationButton>
      ))}
    </div>
  );
};

export default Pagination;

const PagenationButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  background-color: ${({ $currentPage, $Color, theme }) => $currentPage ? theme.colors[$Color] : '#e5e7eb'};
  color: ${({ $currentPage }) => $currentPage ? '#fff' : '#000'};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: ${({ $currentPage }) => $currentPage ? 'bold' : 'normal'};
`;