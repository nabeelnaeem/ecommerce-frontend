import { useState, useEffect } from 'react';
import SearchAndFilters from '../../components/SearchAndFilters';
import ProductCard from '../../components/ProductCard';
import PaginationControls from '../../components/PaginationControls';
import LoadingIndicator from '../../components/LoadingIndicator';
import ErrorMessage from '../../components/ErrorMessage';
import CartSummary from '../../components/CartSummary';

const ProductsStore = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState([]);

    // Filter and pagination states
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(12);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    // API base URL - adjust this to match your backend
    const API_BASE_URL = 'http://localhost:3000/api';

    // Fetch products from API
    const fetchProducts = async () => {
        setLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams({
                page: currentPage,
                limit: limit,
                sortBy: sortBy,
                sortOrder: sortOrder
            });

            if (searchTerm.trim()) {
                params.append('name', searchTerm);
            }

            const response = await fetch(`${API_BASE_URL}/products?${params}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

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

    const addToCart = (product, quantity = 1) => {
        setCart(prev => {
            const existingItem = prev.find(item => item.product_id === product.product_id);
            if (existingItem) {
                return prev.map(item =>
                    item.product_id === product.product_id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { ...product, quantity }];
        });
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

            {/* Cart Summary */}
            <CartSummary cart={cart} />
        </div>
    );
};

export default ProductsStore;