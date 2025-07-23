import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../../api/product-service.js';
import LoadingIndicator from '../../components/LoadingIndicator';
import ErrorMessage from '../../components/ErrorMessage';
import ReviewsDisplay from '../../components/ReviewsDisplay';
import ProductDetailsInfo from '../../components/ProductDetailsInfo.jsx';
import { checkIfPurchase } from '../../api/review-service.js'
import { useAuth } from '../../context/AuthContext.jsx';

// Layout & Spacing
const MAX_WIDTH_CONTAINER = 'max-w-7xl mx-auto px-4 py-8';
const GRID_LAYOUT = 'grid grid-cols-1 lg:grid-cols-2 gap-12';
const SPACE_Y_4 = 'space-y-4';
const SPACE_Y_6 = 'space-y-6';
const SPACE_X_8 = 'flex space-x-8';
const MARGIN_TOP_16 = 'mt-16';
const PADDING_Y_8 = 'py-8';
const PADDING_Y_4 = 'py-4';
const PADDING_X_1 = 'px-1';

// Text Styles
const TEXT_CENTER = 'text-center';
const TEXT_GRAY_700 = 'text-gray-700';
const TEXT_SM = 'text-sm';
const FONT_MEDIUM = 'font-medium';
const LEADING_RELAXED = 'leading-relaxed';

// Component Styles
const IMAGE_STYLE = 'w-full h-96 lg:h-[400px] object-cover rounded-lg';
const TAB_CONTAINER = 'border-b border-gray-200';
const TAB_BUTTON_BASE = `${PADDING_Y_4} ${PADDING_X_1} border-b-2 ${FONT_MEDIUM} ${TEXT_SM} transition-colors`;
const TAB_BUTTON_ACTIVE = `${TAB_BUTTON_BASE} border-blue-500 text-blue-600`;
const TAB_BUTTON_INACTIVE = `${TAB_BUTTON_BASE} border-transparent text-gray-500 hover:text-gray-700`;
const DESCRIPTION_TEXT = `${TEXT_GRAY_700} ${LEADING_RELAXED}`;

const ProductDetail = () => {
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [canReview, setCanReview] = useState(false);
    const { user, isAuthenticated } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchProductById(id);
                setProduct(result);
            } catch (err) {
                setError(err.message || 'Something went wrong');
            } finally {
                setLoading(false);
            }
        };

        const verifyPurchase = async () => {
            try {
                const res = await checkIfPurchase(id);
                setCanReview(res?.hasPurchased);
            } catch (error) {
                console.log('Error checking purchase status:', error.message);
            }
        };

        if (id) {
            fetchData();
            if (isAuthenticated) {
                verifyPurchase();
            }
        }
    }, [id]);

    if (loading) return <LoadingIndicator />;
    if (error) return <ErrorMessage error={error} />;
    if (!product) return <p className={TEXT_CENTER}>Product not found</p>;

    const handleQuantityChange = (delta) => {
        setQuantity(prev => {
            const newQuantity = prev + delta;
            return Math.max(1, Math.min(newQuantity, product.stock));
        });
    };

    return (
        <div className={MAX_WIDTH_CONTAINER}>
            <div className={GRID_LAYOUT}>
                {/* Product Image */}
                <div className={SPACE_Y_4}>
                    <img
                        src={product.image || `https://placehold.co/300x300?text=${encodeURIComponent(product.name)}`}
                        alt={product.name}
                        className={IMAGE_STYLE}
                    />
                </div>

                {/* Product Details */}
                <ProductDetailsInfo
                    product={product}
                    quantity={quantity}
                    setQuantity={setQuantity}
                    handleQuantityChange={handleQuantityChange}
                />
            </div>

            {/* Product Tabs */}
            <div className={MARGIN_TOP_16}>
                <div className={TAB_CONTAINER}>
                    <nav className={SPACE_X_8}>
                        {['description', 'reviews'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={activeTab === tab ? TAB_BUTTON_ACTIVE : TAB_BUTTON_INACTIVE}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className={PADDING_Y_8}>
                    {activeTab === 'description' && (
                        <div className={SPACE_Y_6}>
                            <p className={DESCRIPTION_TEXT}>{product.description}</p>
                        </div>
                    )}

                    {activeTab === 'reviews' && (
                        <>
                            <ReviewsDisplay rating={product.rating} reviews={product.reviews} />
                            {canReview ? (
                                <p>You can leave a review!!!</p>
                            ) : (
                                <p>Only verified buyer can leave a review!</p>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;