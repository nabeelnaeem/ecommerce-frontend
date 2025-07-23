import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../../api/product-service.js';
import LoadingIndicator from '../../components/LoadingIndicator';
import ErrorMessage from '../../components/ErrorMessage';
import ReviewsDisplay from '../../components/ReviewsDisplay';
import ProductDetailsInfo from '../../components/ProductDetailsInfo.jsx';
import { checkIfPurchase, submitProductReview, updateProductReview } from '../../api/review-service.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { toast } from 'react-toastify';

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

// Messages
const PURCHASE_STATUS_CHECK_ERROR_MSG = 'Error checking purchase status:';
const SOMETHING_WENT_WRONG_MSG = 'Something went wrong';
const REVIEW_UPDATED_MSG = 'Review updated successfully';
const REVIEW_SUBMITTED_MSG = 'Review submitted successfully';

const ProductDetail = () => {
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [canReview, setCanReview] = useState(false);
    const [userReview, setUserReview] = useState(null);
    const [selectedRating, setSelectedRating] = useState(0);
    const [reviewVersion, setReviewVersion] = useState(0);
    const { isAuthenticated, user } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchProductById(id);
                setProduct(result);
            } catch (err) {
                setError(err.message || SOMETHING_WENT_WRONG_MSG);
            } finally {
                setLoading(false);
            }
        };

        const verifyPurchase = async () => {
            try {
                const res = await checkIfPurchase(id);
                setCanReview(res?.hasPurchased);
                if (res?.hasPurchased && res?.review) {
                    setUserReview(res.review);
                    setSelectedRating(res.review.rating);
                }
            } catch (error) {
                console.log(PURCHASE_STATUS_CHECK_ERROR_MSG, error.message);
            }
        };

        if (id) {
            fetchData();
            if (isAuthenticated) {
                verifyPurchase();
            }
        }
    }, [id, isAuthenticated]);

    if (loading) return <LoadingIndicator />;
    if (error) return <ErrorMessage error={error} />;
    if (!product) return <p className={TEXT_CENTER}>Product not found</p>;

    const handleQuantityChange = (delta) => {
        setQuantity(prev => Math.max(1, Math.min(prev + delta, product.stock)));
    };

    const fetchAndSetProduct = async () => {
        try {
            const result = await fetchProductById(id);
            setProduct(result);
        } catch (err) {
            toast.error(SOMETHING_WENT_WRONG_MSG);
            console.error(err);
        }
    };

    const handleRatingChange = async (e) => {
        e.preventDefault();
        const comment = e.target.comment.value;

        try {
            if (userReview) {
                await updateProductReview(id, selectedRating, comment);
                toast.success(REVIEW_UPDATED_MSG);
            } else {
                await submitProductReview(id, selectedRating, comment);
                toast.success(REVIEW_SUBMITTED_MSG);
            }

            await fetchAndSetProduct();
            setReviewVersion(prev => prev + 1);
        } catch (err) {
            console.error('Review Error:', err.message);
            toast.error('Failed to submit review');
        }
    };

    const StarRating = ({ rating, setRating }) => {
        const [hoverRating, setHoverRating] = useState(0);

        return (
            <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        className={`text-2xl transition-colors duration-150 ${star <= (hoverRating || rating)
                            ? 'text-yellow-400 hover:text-yellow-500'
                            : 'text-gray-300 hover:text-yellow-300'
                            }`}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                    >
                        ★
                    </button>
                ))}
                <span className="ml-2 text-sm text-gray-600">
                    {rating > 0 ? `${rating} star${rating !== 1 ? 's' : ''}` : 'Select a rating'}
                </span>
            </div>
        );
    };



    return (
        <div className={MAX_WIDTH_CONTAINER}>
            <div className={GRID_LAYOUT}>
                <div className={SPACE_Y_4}>
                    <img
                        src={product.image || `https://placehold.co/300x300?text=${encodeURIComponent(product.name)}`}
                        alt={product.name}
                        className={IMAGE_STYLE}
                    />
                </div>

                <ProductDetailsInfo
                    product={product}
                    quantity={quantity}
                    setQuantity={setQuantity}
                    handleQuantityChange={handleQuantityChange}
                />
            </div>

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
                            <ReviewsDisplay
                                key={reviewVersion}
                                rating={product.rating}
                                reviews={product.reviews}
                            />
                            {canReview && (
                                <div className="mt-6">
                                    <h3 className="text-lg font-semibold mb-2">
                                        {userReview ? 'Update Your Review' : 'Leave a Review'}
                                    </h3>
                                    <form
                                        className="space-y-4"
                                        onSubmit={handleRatingChange}
                                    >
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                                            <StarRating rating={selectedRating} setRating={setSelectedRating} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Comment</label>
                                            <textarea
                                                name="comment"
                                                rows="3"
                                                defaultValue={userReview?.comment || ''}
                                                required
                                                className="mt-1 block w-full border px-3 py-2 rounded shadow-sm"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                        >
                                            {userReview ? 'Update Review' : 'Submit Review'}
                                        </button>
                                    </form>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
