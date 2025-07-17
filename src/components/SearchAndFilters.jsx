import React from 'react';
import { Search } from 'lucide-react';
import { INPUT_CLASS, SELECT_CLASS } from '../styles/styles';

// Search and Filters Classes
const CONTAINER_CLASS = "mb-6 bg-white p-4 rounded-lg shadow-lg border-slate-950";
const LAYOUT_CLASS = "flex flex-col lg:flex-row gap-4 items-center";
const SEARCH_FORM_CLASS = "flex-1";
const SEARCH_CONTAINER_CLASS = "relative";
const SEARCH_ICON_CLASS = "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5";
const FILTERS_CONTAINER_CLASS = "flex gap-2 flex-wrap";

const SearchAndFilters = ({
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    limit,
    setLimit,
    handleSearch
}) => {
    return (
        <div className={CONTAINER_CLASS}>
            <div className={LAYOUT_CLASS}>
                {/* Search */}
                <form onSubmit={handleSearch} className={SEARCH_FORM_CLASS}>
                    <div className={SEARCH_CONTAINER_CLASS}>
                        <Search className={SEARCH_ICON_CLASS} />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={INPUT_CLASS}
                        />
                    </div>
                </form>

                {/* Sort Controls */}
                <div className={FILTERS_CONTAINER_CLASS}>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className={SELECT_CLASS}
                    >
                        <option value="name">Sort by Name</option>
                        <option value="price">Sort by Price</option>
                        <option value="stock">Sort by Stock</option>
                        <option value="createdAt">Sort by Date</option>
                        <option value="rating">Sort by Rating</option>
                    </select>

                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className={SELECT_CLASS}
                    >
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>

                    <select
                        value={limit}
                        onChange={(e) => setLimit(Number(e.target.value))}
                        className={SELECT_CLASS}
                    >
                        <option value="6">6 per page</option>
                        <option value="12">12 per page</option>
                        <option value="24">24 per page</option>
                        <option value="48">48 per page</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default SearchAndFilters;