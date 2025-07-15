import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BUTTON_CLASS, BUTTON_DISABLED, BUTTON_SECONDARY } from '../styles/styles.js';


const PaginationControls = ({
    currentPage,
    totalPages,
    totalProducts,
    limit,
    onPageChange
}) => {
    const getPaginationNumbers = () => {
        const pages = [];
        const maxVisible = 5;
        let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let end = Math.min(totalPages, start + maxVisible - 1);

        if (end - start + 1 < maxVisible) {
            start = Math.max(1, end - maxVisible + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Page Info */}
                <div className="text-sm text-gray-700">
                    Showing {((currentPage - 1) * limit) + 1} to {Math.min(currentPage * limit, totalProducts)} of {totalProducts} results
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center gap-2">
                    {/* Previous Button */}
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`${BUTTON_CLASS} flex items-center gap-1 ${currentPage === 1 ? BUTTON_DISABLED : BUTTON_SECONDARY
                            }`}
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                    </button>

                    {/* Page Numbers */}
                    <div className="hidden sm:flex items-center gap-1">
                        {currentPage > 3 && (
                            <>
                                <button
                                    onClick={() => onPageChange(1)}
                                    className={BUTTON_SECONDARY}
                                >
                                    1
                                </button>
                                {currentPage > 4 && (
                                    <span className="px-2 py-2 text-gray-500">...</span>
                                )}
                            </>
                        )}

                        {getPaginationNumbers().map((page) => (
                            <button
                                key={page}
                                onClick={() => onPageChange(page)}
                                className={`${BUTTON_CLASS} ${currentPage === page
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : BUTTON_SECONDARY
                                    }`}
                            >
                                {page}
                            </button>
                        ))}

                        {currentPage < totalPages - 2 && (
                            <>
                                {currentPage < totalPages - 3 && (
                                    <span className="px-2 py-2 text-gray-500">...</span>
                                )}
                                <button
                                    onClick={() => onPageChange(totalPages)}
                                    className={BUTTON_SECONDARY}
                                >
                                    {totalPages}
                                </button>
                            </>
                        )}
                    </div>

                    {/* Mobile: Show current page info */}
                    <div className="sm:hidden px-3 py-2 text-sm text-gray-700 bg-gray-50 rounded-lg">
                        {currentPage} of {totalPages}
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`${BUTTON_CLASS} flex items-center gap-1 ${currentPage === totalPages ? BUTTON_DISABLED : BUTTON_SECONDARY
                            }`}
                    >
                        Next
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>

                {/* Page Jump */}
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-700">Go to page:</span>
                    <input
                        type="number"
                        min="1"
                        max={totalPages}
                        value={currentPage}
                        onChange={(e) => {
                            const page = parseInt(e.target.value);
                            if (page >= 1 && page <= totalPages) {
                                onPageChange(page);
                            }
                        }}
                        className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">of {totalPages}</span>
                </div>
            </div>
        </div>
    );
};

export default PaginationControls;