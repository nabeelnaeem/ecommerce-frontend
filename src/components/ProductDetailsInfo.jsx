import RenderStars from './RenderStars.jsx';
import { ShoppingCart, Truck, Shield, RotateCcw, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from "react-toastify";

// Layout & Spacing
const SPACE_Y_6 = 'space-y-6';
const SPACE_Y_4 = 'space-y-4';
const FLEX_GAP_4 = 'flex gap-4';
const FLEX_GAP_3 = 'flex items-center gap-3';
const FLEX_GAP_1 = 'flex items-center gap-1';
const GRID_FEATURES = 'grid grid-cols-1 md:grid-cols-3 gap-4';
const PX_4_PY_2 = 'px-4 py-2';

// Text Styles
const TEXT_SM_GRAY_600 = 'text-sm text-gray-600';
const TEXT_SM_GRAY_600_ML_1 = 'text-sm text-gray-600 ml-1';
const TEXT_LG_SEMIBOLD = 'text-lg font-semibold';
const TEXT_3XL_BOLD_GRAY_900 = 'text-3xl font-bold text-gray-900';
const TEXT_SM_GREEN_600 = 'text-sm text-green-600 font-medium';
const FONT_MEDIUM = 'font-medium';
const FONT_SEMIBOLD = 'font-semibold';

// Component Styles
const CATEGORY_TEXT = `${TEXT_SM_GRAY_600} mb-2 underline`;
const PRODUCT_TITLE = `${TEXT_3XL_BOLD_GRAY_900} mb-2`;
const RATING_CONTAINER = 'flex items-center gap-4 mb-4 mt-4';
const QUANTITY_CONTROL = 'flex items-center border-2 border-gray-300 rounded-lg';
const QUANTITY_BUTTON = 'p-2 hover:bg-gray-100 transition-colors';
const ADD_TO_CART_BASE = 'flex-1 py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2';
const ADD_TO_CART_DISABLED = 'bg-gray-300 text-gray-600 cursor-not-allowed';
const ADD_TO_CART_ACTIVE = 'bg-blue-600 text-white hover:bg-blue-700';
const FEATURES_CONTAINER = 'bg-gray-50 p-6 rounded-lg';
const FEATURE_ITEM = 'flex items-center gap-3';
const FEATURE_ICON = 'text-blue-600';

const ProductDetailsInfo = ({
    product,
    quantity,
    handleQuantityChange
}) => {
    const { addToCart } = useCart();

    return (
        <div className={SPACE_Y_6}>
            <div>
                <p className={CATEGORY_TEXT}>{product.category_name}</p>
                <h1 className={PRODUCT_TITLE}>{product.name}</h1>
                <div className={RATING_CONTAINER}>
                    <div className={FLEX_GAP_1}>
                        <RenderStars rating={product.rating} reviews={product.rating_count} />
                        <span className={TEXT_SM_GRAY_600_ML_1}>
                            ({product.reviews.length} reviews)
                        </span>
                    </div>
                    <span className={TEXT_SM_GREEN_600}>
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </span>
                </div>
                <div className={FLEX_GAP_3}>
                    <span className={TEXT_3XL_BOLD_GRAY_900}>RS {product.price}</span>
                </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className={SPACE_Y_4}>
                <div className={FLEX_GAP_4}>
                    <span className={TEXT_LG_SEMIBOLD}>Quantity:</span>
                    <div className={QUANTITY_CONTROL}>
                        <button
                            onClick={() => handleQuantityChange(-1)}
                            className={QUANTITY_BUTTON}
                        >
                            <Minus size={16} />
                        </button>
                        <span className={`${PX_4_PY_2} ${FONT_MEDIUM}`}>{quantity}</span>
                        <button
                            onClick={() => handleQuantityChange(1)}
                            className={QUANTITY_BUTTON}
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                </div>

                <div className={FLEX_GAP_4}>
                    <button
                        onClick={() => {
                            addToCart(product, quantity)
                            toast.success(`${product.name} (x${quantity}) added to your cart `);
                        }}
                        disabled={product.stock === 0}
                        className={`${ADD_TO_CART_BASE} ${product.stock > 0 ? ADD_TO_CART_ACTIVE : ADD_TO_CART_DISABLED
                            }`}
                    >
                        <ShoppingCart size={20} />
                        Add to Cart
                    </button>
                </div>
            </div>

            {/* Features */}
            <div className={FEATURES_CONTAINER}>
                <div className={GRID_FEATURES}>
                    <div className={FEATURE_ITEM}>
                        <Truck className={FEATURE_ICON} size={24} />
                        <div>
                            <p className={FONT_SEMIBOLD}>Free Shipping</p>
                            <p className={TEXT_SM_GRAY_600}>Orders over $50</p>
                        </div>
                    </div>
                    <div className={FEATURE_ITEM}>
                        <RotateCcw className={FEATURE_ICON} size={24} />
                        <div>
                            <p className={FONT_SEMIBOLD}>30-Day Returns</p>
                            <p className={TEXT_SM_GRAY_600}>Easy returns</p>
                        </div>
                    </div>
                    <div className={FEATURE_ITEM}>
                        <Shield className={FEATURE_ICON} size={24} />
                        <div>
                            <p className={FONT_SEMIBOLD}>Quality Guarantee</p>
                            <p className={TEXT_SM_GRAY_600}>100% authentic</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsInfo;