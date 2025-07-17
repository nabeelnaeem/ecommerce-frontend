import React from "react";
import { Star } from 'lucide-react';

const RATING_CONTAINER = "flex items-center gap-1";
const RATING_STARS_CONTAINER = "flex";
const REVIEWS_TEXT = "text-sm text-gray-600 ml-1";

const RenderStars = ({ rating = 0, reviews = 0 }) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
        } else if (i === fullStars && hasHalfStar) {
            stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" style={{ clipPath: 'inset(0 50% 0 0)' }} />);
        } else {
            stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
        }
    }

    return (
        <div className={RATING_CONTAINER}>
            <div className={RATING_STARS_CONTAINER}>{stars}</div>
            <span className={REVIEWS_TEXT}>({reviews})</span>
        </div>
    );
};

export default RenderStars;