import { useState, useEffect } from 'react';
import SearchAndFilters from '../../components/SearchAndFilters';
import ProductCard from '../../components/ProductCard';
import PaginationControls from '../../components/PaginationControls';
import LoadingIndicator from '../../components/LoadingIndicator';
import ErrorMessage from '../../components/ErrorMessage';

import { useProductContext } from '../../context/ProductContext';
import { fetchProductsFromApi } from '../../api/product-service.js';
import { useCart } from '../../context/CartContext';

const ProductsStore = () => {
    const { products, setProducts, totalProducts, setTotalProducts, totalPages, setTotalPages } = useProductContext();
    const { addToCart } = useCart();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Filter and pagination states
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(12);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await fetchProductsFromApi({
                page: currentPage,
                limit,
                sortBy,
                sortOrder,
                name: searchTerm,
            });

            if (Array.isArray(data)) {
                setProducts(data);
                setTotalProducts(data.length);
                setTotalPages(Math.ceil(data.length / limit));
            } else if (data.products) {
                setProducts(data.products);
                setTotalProducts(data.total || data.products.length);
                setTotalPages(data.pages || Math.ceil((data.total || data.products.length) / limit));
            } else {
                setProducts(data);
            }
        } catch (err) {
            setError(err.message);
            console.error('Error fetching products:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [currentPage, limit, sortBy, sortOrder, searchTerm]);

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1);
    };

    const handleSortChange = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('asc');
        }
        setCurrentPage(1);
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Products</h1>
                <p className="text-gray-600">Discover our amazing collection of products</p>
            </div>

            {/* Search and Filters */}
            <SearchAndFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                sortBy={sortBy}
                setSortBy={setSortBy}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                limit={limit}
                setLimit={setLimit}
                handleSearch={handleSearch}
            />

            {/* Loading State */}
            {loading && <LoadingIndicator />}

            {/* Error State */}
            {error && <ErrorMessage error={error} />}

            {/* Products Grid */}
            {!loading && !error && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                        {products.map((product) => (
                            <ProductCard
                                key={product.product_id}
                                product={product}
                                onAddToCart={addToCart}
                            />
                        ))}
                    </div>

                    {/* Empty State */}
                    {products.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-gray-500 text-lg">No products found</div>
                            <p className="text-gray-400 mt-2">Try adjusting your search or filters</p>
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <PaginationControls
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalProducts={totalProducts}
                            limit={limit}
                            onPageChange={setCurrentPage}
                        />
                    )}
                </>
            )}

        </div>
    );
};

export default ProductsStore;