import React from 'react';
import { Search } from 'lucide-react';
import { INPUT_CLASS, SELECT_CLASS } from '../styles/styles';

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
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
                {/* Search */}
                <form onSubmit={handleSearch} className="flex-1">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
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
                <div className="flex gap-2 flex-wrap">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className={SELECT_CLASS}
                    >
                        <option value="name">Sort by Name</option>
                        <option value="price">Sort by Price</option>
                        <option value="stock">Sort by Stock</option>
                        <option value="createdAt">Sort by Date</option>
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