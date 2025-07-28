import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import RenderStars from './RenderStars.jsx';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

const API_BASE_URL = import.meta.env.VITE_API_URL;
const STATIC_BASE_URL = API_BASE_URL.replace('/api', '');

const BUTTON_CLASS = "px-4 py-2 rounded-lg font-medium transition-colors";
const BUTTON_PRIMARY = `${BUTTON_CLASS} bg-blue-600 text-white hover:bg-blue-700`;
const BUTTON_DISABLED = `${BUTTON_CLASS} text-gray-400 cursor-not-allowed bg-gray-100`;
const PRODUCT_CARD_CLASS = "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow";
const PRODUCT_IMAGE_CONTAINER = "aspect-w-1 aspect-h-1 bg-gray-200";
const PRODUCT_IMAGE = "w-full h-60 object-cover";
const PRODUCT_INFO_CONTAINER = "p-4";
const PRODUCT_TITLE = "text-lg font-semibold text-gray-900 mb-2 overflow-hidden";
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
const BUTTON_CONTAINER_CLASS = "relative";
const SHOPPING_CART_ICON_CLASS = "w-4 h-4";
const CART_BADGE_CLASS = "absolute -top-1 -right-1 bg-green-600 text-white text-s px-2 py-0.5 rounded-full shadow-md hover:bg-green-800 cursor-pointer";

const ProductCard = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const { cart, addToCart, openCart } = useCart(); // ✅ Using addToCart and openCart

    const cartItem = cart.find(item => item.product_id === product.product_id);
    const quantityInCart = cartItem ? cartItem.quantity : 0;

    const handleQuantityChange = (change) => {
        const newQuantity = quantity + change;
        if (newQuantity >= 1 && newQuantity <= product.stock) {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCart = () => {
        setLoading(true);
        addToCart(product, quantity);
        setQuantity(1);
        setTimeout(() => setLoading(false), 200);
    };

    return (
        <div className={PRODUCT_CARD_CLASS}>
            <Link to={`/products/${product.product_id}`}>
                <div className={PRODUCT_IMAGE_CONTAINER}>
                    <img
                        src={product.image_url
                            ? product.image_url
                            : `https://placehold.co/300x300?text=${encodeURIComponent(product.name)}`}
                        alt={product.name}
                        className={PRODUCT_IMAGE}
                    />
                </div>
            </Link>

            <div className={PRODUCT_INFO_CONTAINER}>
                <Link to={`/products/${product.product_id}`}>
                    <h3 className={PRODUCT_TITLE}>{product.name}</h3>
                </Link>

                <div className="mb-2">
                    <RenderStars rating={product.rating} reviews={product.rating_count} />
                </div>

                <div className={PRICE_STOCK_CONTAINER}>
                    <span className={PRICE_TEXT}>Rs {product.price}</span>
                    <span className={`${STOCK_TEXT} ${product.stock > 0 ? IN_STOCK_TEXT : OUT_OF_STOCK_TEXT}`}>
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </span>
                </div>

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
                            <span className={QUANTITY_VALUE}>{quantity}</span>
                            <button
                                onClick={() => handleQuantityChange(1)}
                                disabled={quantity + quantityInCart >= product.stock}
                                className={`${QUANTITY_BUTTON} ${quantity + quantityInCart >= product.stock ? QUANTITY_BUTTON_DISABLED : QUANTITY_BUTTON_ENABLED}`}
                            >
                                +
                            </button>
                        </div>
                    </div>
                )}

                <div className={BUTTON_CONTAINER_CLASS}>
                    <button
                        onClick={handleAddToCart}
                        disabled={product.stock === 0 || quantity + quantityInCart > product.stock}
                        className={`${ADD_TO_CART_BUTTON} ${product.stock > 0 && quantity + quantityInCart <= product.stock ? BUTTON_PRIMARY : BUTTON_DISABLED}`}
                    >
                        <ShoppingCart className={SHOPPING_CART_ICON_CLASS} />
                        {loading ? "Adding..." : "Add to cart"}
                    </button>

                    {quantityInCart > 0 && (
                        <button
                            onClick={openCart}
                            className={CART_BADGE_CLASS}
                            title="View cart"
                        >
                            {quantityInCart} in cart
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
