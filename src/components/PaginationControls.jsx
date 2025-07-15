import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BUTTON_CLASS, BUTTON_DISABLED, BUTTON_SECONDARY } from '../styles/styles.js';

// Pagination Container Styles
const PAGINATION_CONTAINER = "bg-white p-4 rounded-lg shadow-sm border";
const PAGINATION_LAYOUT = "flex flex-col sm:flex-row items-center justify-between gap-4";
const PAGE_INFO_TEXT = "text-sm text-gray-700";
const PAGINATION_CONTROLS = "flex items-center gap-2";
const PAGE_NUMBERS_CONTAINER = "hidden sm:flex items-center gap-1";
const ELLIPSIS_STYLE = "px-2 py-2 text-gray-500";
const ACTIVE_PAGE_STYLE = "bg-blue-600 text-white shadow-md";
const MOBILE_PAGE_INFO = "sm:hidden px-3 py-2 text-sm text-gray-700 bg-gray-50 rounded-lg";
const PAGE_JUMP_CONTAINER = "flex items-center gap-2";
const PAGE_INPUT = "w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm focus:ring-2 focus:ring-blue-500";
const NAV_BUTTON = "flex items-center gap-1";
const CHEVRON_ICON = "w-4 h-4";

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
        <div className={PAGINATION_CONTAINER}>
            <div className={PAGINATION_LAYOUT}>
                {/* Page Info */}
                <div className={PAGE_INFO_TEXT}>
                    Showing {((currentPage - 1) * limit) + 1} to {Math.min(currentPage * limit, totalProducts)} of {totalProducts} results
                </div>

                {/* Pagination Controls */}
                <div className={PAGINATION_CONTROLS}>
                    {/* Previous Button */}
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`${BUTTON_CLASS} ${NAV_BUTTON} ${currentPage === 1 ? BUTTON_DISABLED : BUTTON_SECONDARY}`}
                    >
                        <ChevronLeft className={CHEVRON_ICON} />
                        Previous
                    </button>

                    {/* Page Numbers */}
                    <div className={PAGE_NUMBERS_CONTAINER}>
                        {currentPage > 3 && (
                            <>
                                <button
                                    onClick={() => onPageChange(1)}
                                    className={BUTTON_SECONDARY}
                                >
                                    1
                                </button>
                                {currentPage > 4 && (
                                    <span className={ELLIPSIS_STYLE}>...</span>
                                )}
                            </>
                        )}

                        {getPaginationNumbers().map((page) => (
                            <button
                                key={page}
                                onClick={() => onPageChange(page)}
                                className={`${BUTTON_CLASS} ${currentPage === page ? ACTIVE_PAGE_STYLE : BUTTON_SECONDARY}`}
                            >
                                {page}
                            </button>
                        ))}

                        {currentPage < totalPages - 2 && (
                            <>
                                {currentPage < totalPages - 3 && (
                                    <span className={ELLIPSIS_STYLE}>...</span>
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
                    <div className={MOBILE_PAGE_INFO}>
                        {currentPage} of {totalPages}
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`${BUTTON_CLASS} ${NAV_BUTTON} ${currentPage === totalPages ? BUTTON_DISABLED : BUTTON_SECONDARY}`}
                    >
                        Next
                        <ChevronRight className={CHEVRON_ICON} />
                    </button>
                </div>

                {/* Page Jump */}
                <div className={PAGE_JUMP_CONTAINER}>
                    <span className={PAGE_INFO_TEXT}>Go to page:</span>
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
                        className={PAGE_INPUT}
                    />
                    <span className={PAGE_INFO_TEXT}>of {totalPages}</span>
                </div>
            </div>
        </div>
    );
};

export default PaginationControls;