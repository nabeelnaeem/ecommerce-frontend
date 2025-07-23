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

// Text Styles
const TEXT_CENTER = 'text-center';

// Component Styles
const IMAGE_STYLE = 'w-full h-96 lg:h-[400px] object-cover rounded-lg';
const TAB_CONTAINER = 'border-b border-gray-200';
const TAB_BUTTON_BASE = 'py-4 px-1 border-b-2 font-medium text-sm transition-colors';
const TAB_BUTTON_ACTIVE = 'py-4 px-1 border-b-2 font-medium text-sm transition-colors border-blue-500 text-blue-600';
const TAB_BUTTON_INACTIVE = 'py-4 px-1 border-b-2 font-medium text-sm transition-colors border-transparent text-gray-500 hover:text-gray-700';
const DESCRIPTION_TEXT = 'text-gray-700 leading-relaxed';

// Star Rating Styles
const STAR_RATING_CONTAINER = 'flex items-center space-x-1';
const STAR_BUTTON = 'text-2xl transition-colors duration-150';
const STAR_ACTIVE = 'text-yellow-400 hover:text-yellow-500';
const STAR_INACTIVE = 'text-gray-300 hover:text-yellow-300';
const STAR_RATING_TEXT = 'ml-2 text-sm text-gray-600';

// Review Form Styles
const REVIEW_FORM_CONTAINER = 'space-y-4';
const REVIEW_FORM_LABEL = 'block text-sm font-medium text-gray-700 mb-2';
const REVIEW_TEXTAREA = 'mt-1 block w-full border px-3 py-2 rounded shadow-sm';
const REVIEW_SUBMIT_BUTTON = 'bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700';

// Messages
const PURCHASE_STATUS_CHECK_ERROR_MSG = 'Error checking purchase status:';
const SOMETHING_WENT_WRONG_MSG = 'Something went wrong';
const REVIEW_UPDATED_MSG = 'Review updated successfully';
const REVIEW_SUBMITTED_MSG = 'Review submitted successfully';
const FAILED_REVIEW_SUBMISSION_MSG = 'Failed to submit review';

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
    const { isAuthenticated } = useAuth();

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
            toast.error(FAILED_REVIEW_SUBMISSION_MSG);
        }
    };

    const StarRating = ({ rating, setRating }) => {
        const [hoverRating, setHoverRating] = useState(0);

        return (
            <div className={STAR_RATING_CONTAINER}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        className={`${STAR_BUTTON} ${star <= (hoverRating || rating) ? STAR_ACTIVE : STAR_INACTIVE}`}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                    >
                        ★
                    </button>
                ))}
                <span className={STAR_RATING_TEXT}>
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
                                        className={REVIEW_FORM_CONTAINER}
                                        onSubmit={handleRatingChange}
                                    >
                                        <div>
                                            <label className={REVIEW_FORM_LABEL}>Rating</label>
                                            <StarRating rating={selectedRating} setRating={setSelectedRating} />
                                        </div>
                                        <div>
                                            <label className={REVIEW_FORM_LABEL}>Comment</label>
                                            <textarea
                                                name="comment"
                                                rows="3"
                                                defaultValue={userReview?.comment || ''}
                                                required
                                                className={REVIEW_TEXTAREA}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className={REVIEW_SUBMIT_BUTTON}
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