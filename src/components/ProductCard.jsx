import React, { useState } from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { BUTTON_PRIMARY, BUTTON_DISABLED, CARD_CLASS } from '../styles/styles';

// Product Card Classes
const PRODUCT_CARD_CLASS = "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow";
const PRODUCT_IMAGE_CONTAINER = "aspect-w-1 aspect-h-1 bg-gray-200";
const PRODUCT_IMAGE = "w-full h-48 object-cover";
const PRODUCT_INFO_CONTAINER = "p-4";
const PRODUCT_TITLE_LINK = "block hover:text-blue-600 transition-colors";
const PRODUCT_TITLE = "text-lg font-semibold text-gray-900 mb-2 overflow-hidden";
const RATING_CONTAINER = "flex items-center gap-1";
const RATING_STARS_CONTAINER = "flex";
const REVIEWS_TEXT = "text-sm text-gray-600 ml-1";
const PRICE_STOCK_CONTAINER = "flex justify-between items-center mb-3";
const PRICE_TEXT = "text-2xl font-bold text-gray-900";
const STOCK_TEXT = "text-sm";
const IN_STOCK_TEXT = "text-green-600";
const OUT_OF_STOCK_TEXT = "text-red-600";
const QUANTITY_CONTAINER = "flex items-center justify-between mb-3";
const QUANTITY_LABEL = "text-sm font-medium text-gray-700";
const QUANTITY_SELECTOR = "flex items-center border border-gray-300 rounded-lg";
const QUANTITY_BUTTON = "px-2 py-1 text-sm font-medium transition-colors";
const QUANTITY_BUTTON_DISABLED = "text-gray-400 cursor-not-allowed";
const QUANTITY_BUTTON_ENABLED = "text-gray-700 hover:bg-gray-100";
const QUANTITY_VALUE = "px-3 py-1 text-sm font-medium text-gray-900 border-x border-gray-300";
const ADD_TO_CART_BUTTON = "w-full py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2";

const ProductCard = ({ product, onAddToCart }) => {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (change) => {
        const newQuantity = quantity + change;
        if (newQuantity >= 1 && newQuantity <= product.stock) {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCart = () => {
        onAddToCart(product, quantity);
        setQuantity(1);
    };

    const renderStars = (rating = 0, reviews = 0) => {
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

    return (
        <div className={PRODUCT_CARD_CLASS}>
            {/* Product Image */}
            <div className={PRODUCT_IMAGE_CONTAINER}>
                <img
                    src={product.image || `https://placehold.co/300x300?text=${encodeURIComponent(product.name)}`}
                    alt={product.name}
                    className={PRODUCT_IMAGE}
                />
            </div>

            {/* Product Info */}
            <div className={PRODUCT_INFO_CONTAINER}>
                <a
                    href={`/products/${product.product_id}`}
                    className={PRODUCT_TITLE_LINK}
                >
                    <h3 className={PRODUCT_TITLE} style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                    }}>
                        {product.name}
                    </h3>
                </a>

                {/* Rating */}
                <div className="mb-2">
                    {renderStars(product.rating, product.reviews)}
                </div>

                {/* Price and Stock */}
                <div className={PRICE_STOCK_CONTAINER}>
                    <span className={PRICE_TEXT}>
                        ${product.price}
                    </span>
                    <span className={`${STOCK_TEXT} ${product.stock > 0 ? IN_STOCK_TEXT : OUT_OF_STOCK_TEXT}`}>
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </span>
                </div>

                {/* Quantity Selector */}
                {product.stock > 0 && (
                    <div className={QUANTITY_CONTAINER}>
                        <span className={QUANTITY_LABEL}>Quantity:</span>
                        <div className={QUANTITY_SELECTOR}>
                            <button
                                onClick={() => handleQuantityChange(-1)}
                                disabled={quantity <= 1}
                                className={`${QUANTITY_BUTTON} ${quantity <= 1 ? QUANTITY_BUTTON_DISABLED : QUANTITY_BUTTON_ENABLED}`}
                            >
                                -
                            </button>
                            <span className={QUANTITY_VALUE}>
                                {quantity}
                            </span>
                            <button
                                onClick={() => handleQuantityChange(1)}
                                disabled={quantity >= product.stock}
                                className={`${QUANTITY_BUTTON} ${quantity >= product.stock ? QUANTITY_BUTTON_DISABLED : QUANTITY_BUTTON_ENABLED}`}
                            >
                                +
                            </button>
                        </div>
                    </div>
                )}

                {/* Add to Cart Button */}
                <button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className={`${ADD_TO_CART_BUTTON} ${product.stock > 0 ? BUTTON_PRIMARY : BUTTON_DISABLED}`}
                >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;