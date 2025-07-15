import React, { useState } from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { BUTTON_PRIMARY, BUTTON_DISABLED, CARD_CLASS } from '../styles/styles';

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
            <div className="flex items-center gap-1">
                <div className="flex">{stars}</div>
                <span className="text-sm text-gray-600 ml-1">({reviews})</span>
            </div>
        );
    };

    return (
        <div className={CARD_CLASS}>
            {/* Product Image */}
            <div className="aspect-w-1 aspect-h-1 bg-gray-200">
                <img
                    src={product.image || `https://via.placeholder.com/300x300?text=${encodeURIComponent(product.name)}`}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                />
            </div>

            {/* Product Info */}
            <div className="p-4">
                <a
                    href={`/products/${product.product_id}`}
                    className="block hover:text-blue-600 transition-colors"
                >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 overflow-hidden" style={{
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
                <div className="flex justify-between items-center mb-3">
                    <span className="text-2xl font-bold text-gray-900">
                        ${product.price}
                    </span>
                    <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </span>
                </div>

                {/* Quantity Selector */}
                {product.stock > 0 && (
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-gray-700">Quantity:</span>
                        <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                                onClick={() => handleQuantityChange(-1)}
                                disabled={quantity <= 1}
                                className={`px-2 py-1 text-sm font-medium transition-colors ${quantity <= 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                -
                            </button>
                            <span className="px-3 py-1 text-sm font-medium text-gray-900 border-x border-gray-300">
                                {quantity}
                            </span>
                            <button
                                onClick={() => handleQuantityChange(1)}
                                disabled={quantity >= product.stock}
                                className={`px-2 py-1 text-sm font-medium transition-colors ${quantity >= product.stock ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'
                                    }`}
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
                    className={`w-full py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${product.stock > 0 ? BUTTON_PRIMARY : BUTTON_DISABLED
                        }`}
                >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;