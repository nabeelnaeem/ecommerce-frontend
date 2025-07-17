import { Trash2, Plus, Minus } from 'lucide-react';

const TRANSITION_CLASS = "transition-colors";
const ROUNDED_CLASS = "rounded-lg";
const SHADOW_CLASS = "shadow-md";
const ITEM_CLASS = "p-6 hover:bg-gray-50";
const ITEM_INNER_CLASS = "flex items-center space-x-4";
const IMAGE_CONTAINER_CLASS = "relative";
const IMAGE_CLASS = "w-24 h-24 object-cover rounded-xl";
const DETAILS_CLASS = "flex-1 min-w-0";
const NAME_CLASS = "text-lg font-medium text-gray-900 truncate";
const PRICE_CONTAINER_CLASS = "flex items-center space-x-2 mt-2";
const CURRENT_PRICE_CLASS = "text-xl font-bold text-indigo-600";
const ORIGINAL_PRICE_CLASS = "text-sm text-gray-500 line-through";
const QUANTITY_CONTAINER_CLASS = "flex items-center space-x-3";
const QUANTITY_CONTROLS_CLASS = "flex items-center border border-gray-300 rounded-lg";
const QUANTITY_BUTTON_CLASS = "p-2 hover:bg-gray-100";
const QUANTITY_DISPLAY_CLASS = "px-4 py-2 font-medium min-w-[3rem] text-center";
const DELETE_BUTTON_CLASS = "p-2 text-red-500 hover:bg-red-50 rounded-lg";
const QUANTITY_SYMBOL_CLASS = "w-4 h-4";
const DELETE_SYMBOL_CLASS = "w-5 h-5";

const CartItem = ({ item, updateQuantity, removeFromCart }) => (
    <div className={`${ITEM_CLASS} ${TRANSITION_CLASS}`}>
        <div className={ITEM_INNER_CLASS}>
            <div className={IMAGE_CONTAINER_CLASS}>
                <img
                    src={item.image || `https://placehold.co/300x300?text=${encodeURIComponent(item.name)}`}
                    alt={item.name}
                    className={`${IMAGE_CLASS} ${SHADOW_CLASS}`}
                />
            </div>

            <div className={DETAILS_CLASS}>
                <h3 className={NAME_CLASS}>
                    {item.name}
                </h3>

                <div className={PRICE_CONTAINER_CLASS}>
                    <span className={CURRENT_PRICE_CLASS}>
                        Rs {item.price}
                    </span>
                    {item.originalPrice && (
                        <span className={ORIGINAL_PRICE_CLASS}>
                            Rs {item.originalPrice}
                        </span>
                    )}
                </div>
            </div>

            <div className={QUANTITY_CONTAINER_CLASS}>
                <div className={QUANTITY_CONTROLS_CLASS}>
                    <button
                        onClick={() => updateQuantity(item.product_id, -1)}
                        className={`${QUANTITY_BUTTON_CLASS} ${TRANSITION_CLASS}`}
                    >
                        <Minus className={QUANTITY_SYMBOL_CLASS} />
                    </button>
                    <span className={QUANTITY_DISPLAY_CLASS}>
                        {item.quantity}
                    </span>
                    <button
                        onClick={() => updateQuantity(item.product_id, 1)}
                        className={`${QUANTITY_BUTTON_CLASS} ${TRANSITION_CLASS}`}
                    >
                        <Plus className={QUANTITY_SYMBOL_CLASS} />
                    </button>
                </div>

                <button
                    onClick={() => removeFromCart(item.product_id)}
                    className={`${DELETE_BUTTON_CLASS} ${TRANSITION_CLASS}`}
                >
                    <Trash2 className={DELETE_SYMBOL_CLASS} />
                </button>
            </div>
        </div>
    </div>
);

export default CartItem;