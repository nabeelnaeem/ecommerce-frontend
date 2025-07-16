import { useState } from 'react';
import { ShoppingCart, X } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { Link } from 'react-router-dom';

//Classes
const CART_BUTTON_CLASS = 'relative flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors duration-200';
const CART_ICON_CLASS = 'w-5 h-5';
const CART_TEXT_CLASS = 'hidden sm:inline';
const CART_BADGE_CLASS = 'absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center';
const DROPDOWN_CONTAINER_CLASS = 'absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-100 z-50';
const DROPDOWN_CONTENT_CLASS = 'p-4 max-h-96 overflow-y-auto';
const DROPDOWN_TITLE_CLASS = 'font-semibold text-gray-900 mb-3';
const EMPTY_CART_TEXT_CLASS = 'text-gray-500 text-center py-4';
const CART_ITEM_LIST_CLASS = 'space-y-3';
const CART_ITEM_CLASS = 'flex justify-between items-start border-b pb-2';
const ITEM_NAME_CLASS = 'font-medium text-gray-800';
const ITEM_QUANTITY_CLASS = 'text-sm text-gray-500';
const REMOVE_ITEM_BUTTON_CLASS = 'text-gray-400 hover:text-red-600';
const REMOVE_ITEM_ICON_CLASS = 'w-4 h-4';
const VIEW_CART_LINK_CONTAINER_CLASS = 'mt-4 text-center';
const VIEW_CART_LINK_CLASS = 'text-blue-600 hover:underline text-sm font-medium';

const CartDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { cart, removeFromCart } = useCart();

    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)} className={CART_BUTTON_CLASS}>
                <ShoppingCart className={CART_ICON_CLASS} />
                <span className={CART_TEXT_CLASS}>Cart</span>
                {itemCount > 0 && (
                    <span className={CART_BADGE_CLASS}>{itemCount}</span>
                )}
            </button>

            {isOpen && (
                <div className={DROPDOWN_CONTAINER_CLASS}>
                    <div className={DROPDOWN_CONTENT_CLASS}>
                        <h3 className={DROPDOWN_TITLE_CLASS}>Shopping Cart</h3>

                        {cart.length === 0 ? (
                            <p className={EMPTY_CART_TEXT_CLASS}>Your cart is empty</p>
                        ) : (
                            <>
                                <ul className={CART_ITEM_LIST_CLASS}>
                                    {cart.map(item => (
                                        <li key={item.product_id} className={CART_ITEM_CLASS}>
                                            <div>
                                                <p className={ITEM_NAME_CLASS}>{item.name}</p>
                                                <p className={ITEM_QUANTITY_CLASS}>Qty: {item.quantity}</p>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.product_id)}
                                                className={REMOVE_ITEM_BUTTON_CLASS}
                                            >
                                                <X className={REMOVE_ITEM_ICON_CLASS} />
                                            </button>
                                        </li>
                                    ))}
                                </ul>

                                <div className={VIEW_CART_LINK_CONTAINER_CLASS}>
                                    <Link to="/cart" className={VIEW_CART_LINK_CLASS}>
                                        View full cart →
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartDropdown;