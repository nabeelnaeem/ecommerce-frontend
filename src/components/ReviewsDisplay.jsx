import { Star } from 'lucide-react';
import RenderStars from './RenderStars.jsx';

// Layout & Spacing
const MAX_WIDTH_CONTAINER = 'max-w-2xl mx-auto';
const SPACE_Y_4 = 'space-y-4';
const GAP_2 = 'flex items-center justify-center gap-2';
const GAP_1 = 'flex gap-1';
const MARGIN_BOTTOM_4 = 'mb-4';
const MARGIN_BOTTOM_6 = 'mb-6';
const MARGIN_TOP_6 = 'mt-6';
const MARGIN_TOP_1 = 'mt-1';
const PADDING_BOTTOM_4 = 'pb-4';
const BORDER_BOTTOM = 'border-b';

// Text Styles
const TEXT_2XL_BOLD = 'text-2xl font-bold';
const TEXT_GRAY_600 = 'text-gray-600';
const TEXT_GRAY_500 = 'text-gray-500';
const TEXT_SM = 'text-sm';
const FONT_SEMIBOLD = 'font-semibold';
const TEXT_CENTER = 'text-center';
const TEXT_LEFT = 'text-left';

// Component Styles
const REVIEW_SUMMARY_CONTAINER = `${GAP_2} ${MARGIN_BOTTOM_4}`;
const REVIEW_COUNT_TEXT = `${TEXT_GRAY_600} ${MARGIN_BOTTOM_6} ${TEXT_CENTER}`;
const REVIEW_LIST = `${SPACE_Y_4} ${TEXT_LEFT}`;
const REVIEW_ITEM = `${BORDER_BOTTOM} ${PADDING_BOTTOM_4}`;
const REVIEW_HEADER = 'flex items-center justify-between';
const REVIEW_COMMENT = `${TEXT_GRAY_600} ${TEXT_SM} ${MARGIN_TOP_1}`;
const NO_REVIEWS_TEXT = `${TEXT_CENTER} ${TEXT_GRAY_500} ${MARGIN_TOP_6}`;
const STAR_FILLED = 'fill-yellow-400 text-yellow-400';
const STAR_EMPTY = 'text-gray-300';

const ReviewsDisplay = ({ rating, reviews }) => {
    return (
        <div className={MAX_WIDTH_CONTAINER}>
            <div className={REVIEW_SUMMARY_CONTAINER}>
                <RenderStars rating={rating} reviews={reviews.length} />
                <span className={TEXT_2XL_BOLD}>{rating}</span>
                <span className={TEXT_GRAY_600}>out of 5</span>
            </div>

            <p className={REVIEW_COUNT_TEXT}>
                Based on {reviews.length} reviews
            </p>

            {reviews.length > 0 ? (
                <ul className={REVIEW_LIST}>
                    {reviews.map((review) => (
                        <li key={review.review_id} className={REVIEW_ITEM}>
                            <div className={REVIEW_HEADER}>
                                <p className={FONT_SEMIBOLD}>{review.full_name}</p>
                                <div className={GAP_1}>
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={14}
                                            className={i < review.rating ? STAR_FILLED : STAR_EMPTY}
                                        />
                                    ))}
                                </div>
                            </div>
                            <p className={REVIEW_COMMENT}>{review.comment}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className={NO_REVIEWS_TEXT}>No reviews yet.</p>
            )}
        </div>
    );
};

export default ReviewsDisplay;