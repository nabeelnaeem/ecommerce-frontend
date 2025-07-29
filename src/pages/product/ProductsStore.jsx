import { useState, useEffect } from 'react';
import SearchAndFilters from '../../components/SearchAndFilters';
import ProductCard from '../../components/ProductCard';
import PaginationControls from '../../components/PaginationControls';
import LoadingIndicator from '../../components/LoadingIndicator';
import ErrorMessage from '../../components/ErrorMessage';
import { useProductContext } from '../../context/ProductContext';
import { fetchProductsFromApi } from '../../api/product-service.js';
import { useCart } from '../../context/CartContext';
import { useSearchParams } from "react-router-dom";

//Classes
const CONTAINER_CLASS = 'max-w-7xl mx-auto p-6';
const HEADER_CLASS = 'mb-8';
const TITLE_CLASS = 'text-3xl font-bold text-gray-900 mb-2';
const SUBTITLE_CLASS = 'text-gray-600';
const PRODUCTS_GRID_CLASS = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8';
const EMPTY_STATE_CONTAINER_CLASS = 'text-center py-12';
const EMPTY_STATE_TEXT_CLASS = 'text-gray-500 text-lg';
const EMPTY_STATE_SUBTEXT_CLASS = 'text-gray-400 mt-2';
const HEADER_TITLE = 'Our Products';
const HEADER_SUBTITLE = 'Discover our amazing collection of products';
const EMPTY_STATE_MESSAGE = 'No products found';
const EMPTY_STATE_SUGGESTION = 'Try adjusting your search or filters';

const ProductsStore = () => {
    const { products, setProducts, totalProducts, setTotalProducts, totalPages, setTotalPages } = useProductContext();
    const { addToCart } = useCart();

    const [searchParams, setSearchParams] = useSearchParams();
    const pageParam = parseInt(searchParams.get("page")) || 1;
    const nameParam = searchParams.get("name") || '';
    const sortByParam = searchParams.get("sortBy") || 'name';
    const sortOrderParam = searchParams.get("sortOrder") || 'asc';
    const limitParam = parseInt(searchParams.get("limit")) || 12;
    const stockParam = searchParams.get("stock") || '';
    const ratingParam = searchParams.get("rating") || '';
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(pageParam);
    const [searchTerm, setSearchTerm] = useState(nameParam);
    const [sortBy, setSortBy] = useState(sortByParam);
    const [sortOrder, setSortOrder] = useState(sortOrderParam);
    const [limit, setLimit] = useState(limitParam);
    const [stockFilter, setStockFilter] = useState(stockParam);
    const [ratingFilter, setRatingFilter] = useState(ratingParam);



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
                stock: stockFilter,
                rating: ratingFilter
            });

            if (data.products) {
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
        const page = parseInt(searchParams.get("page")) || 1;
        const name = searchParams.get("name") || '';
        const sortByVal = searchParams.get("sortBy") || 'name';
        const sortOrderVal = searchParams.get("sortOrder") || 'asc';
        const limitVal = parseInt(searchParams.get("limit")) || 12;
        const stock = searchParams.get("stock") || '';
        const rating = searchParams.get("rating") || '';

        setCurrentPage(page);
        setSearchTerm(name);
        setSortBy(sortByVal);
        setSortOrder(sortOrderVal);
        setLimit(limitVal);
        setStockFilter(stock);
        setRatingFilter(rating);
    }, [searchParams]);

    useEffect(() => {
        const params = new URLSearchParams();

        if (searchTerm) params.set("name", searchTerm);
        if (sortBy) params.set("sortBy", sortBy);
        if (sortOrder) params.set("sortOrder", sortOrder);
        if (limit) params.set("limit", limit);
        if (stockFilter) params.set("stock", stockFilter);
        if (ratingFilter) params.set("rating", ratingFilter);
        if (currentPage !== 1) params.set("page", currentPage);

        setSearchParams(params);

        fetchProducts();
    }, [currentPage, limit, sortBy, sortOrder, searchTerm, stockFilter, ratingFilter]);

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1);
    };

    const handleStockChange = (value) => {
        setStockFilter(value);
        setCurrentPage(1);
    };

    const handleRatingChange = (value) => {
        setRatingFilter(value);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            newParams.set("page", page);
            return newParams;
        });
    };



    return (
        <div className={CONTAINER_CLASS}>
            {/* Header */}
            <div className={HEADER_CLASS}>
                <h1 className={TITLE_CLASS}>{HEADER_TITLE}</h1>
                <p className={SUBTITLE_CLASS}>{HEADER_SUBTITLE}</p>
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
                stockFilter={stockFilter}
                setStockFilter={setStockFilter}
                ratingFilter={ratingFilter}
                setRatingFilter={setRatingFilter}
                handleSearch={handleSearch}
                handleStockChange={handleStockChange}
                handleRatingChange={handleRatingChange}
            />


            {/* Loading State */}
            {loading && <LoadingIndicator />}

            {/* Error State */}
            {error && <ErrorMessage error={error} />}

            {/* Products Grid */}
            {!loading && !error && (
                <>
                    <div className={PRODUCTS_GRID_CLASS}>
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
                        <div className={EMPTY_STATE_CONTAINER_CLASS}>
                            <div className={EMPTY_STATE_TEXT_CLASS}>{EMPTY_STATE_MESSAGE}</div>
                            <p className={EMPTY_STATE_SUBTEXT_CLASS}>{EMPTY_STATE_SUGGESTION}</p>
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <PaginationControls
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalProducts={totalProducts}
                            limit={limit}
                            onPageChange={handlePageChange}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default ProductsStore;