import { useState } from 'react';
import { ShoppingCart, X } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { Link } from 'react-router-dom';

const CartDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { cart, removeFromCart } = useCart();

    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);


    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
                <ShoppingCart className="w-5 h-5" />
                <span className="hidden sm:inline">Cart</span>
                {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {itemCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
                    <div className="p-4 max-h-96 overflow-y-auto">
                        <h3 className="font-semibold text-gray-900 mb-3">Shopping Cart</h3>

                        {cart.length === 0 ? (
                            <p className="text-gray-500 text-center py-4">Your cart is empty</p>
                        ) : (
                            <>
                                <ul className="space-y-3">
                                    {cart.map(item => (
                                        <li key={item.product_id} className="flex justify-between items-start border-b pb-2">
                                            <div>
                                                <p className="font-medium text-gray-800">{item.name}</p>
                                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.product_id)}
                                                className="text-gray-400 hover:text-red-600"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-4 text-center">
                                    <Link
                                        to="/cart"
                                        className="text-blue-600 hover:underline text-sm font-medium"
                                    >
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