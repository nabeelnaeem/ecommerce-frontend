import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';


const CartDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const itemCount = 0; // You can connect this to your cart state

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
                    <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-3">Shopping Cart</h3>
                        <p className="text-gray-500 text-center py-4">Your cart is empty</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartDropdown;