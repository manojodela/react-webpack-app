import React from 'react';
import { IoIosArrowBack,IoIosArrowForward } from "react-icons/io";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Calculate visible page numbers around the current page
  const startPage = Math.max(currentPage - 2, 1);
  const endPage = Math.min(startPage + 4, totalPages);
  const pageNumbers = Array.from({ length: (endPage - startPage) + 1 }, (_, i) => startPage + i);

  return (
    <div className='pagenation'>
      {/* Previous Page Button */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        <IoIosArrowBack />
      </button>

      {/* Dynamically generated page number buttons, showing a limited range */}
      {pageNumbers.map(number => (
        <button
          key={number}
          style={{ margin: 5 }}
          onClick={() => onPageChange(number)}
          className={number === currentPage ? 'active' : ''}
        >
          {number}
        </button>
      ))}

      {/* Next Page Button */}
      <button
         onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
         disabled={currentPage === totalPages}
      >
       <IoIosArrowForward/>
      </button>
    </div>
  );
};

export default Pagination;
