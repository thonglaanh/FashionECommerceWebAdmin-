import React, { useState } from 'react'
import '../styles/Pagnigation.css'
const Pagingation = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 5;

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    return (
        <div>
            <div className="pagination">
                <button
                    className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                >
                    &lt; Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                >
                    Next &gt;
                </button>
            </div>
        </div>
    )
}

export default Pagingation