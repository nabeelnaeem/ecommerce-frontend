import React from 'react';
import { ShoppingCart } from 'lucide-react';

const CartSummary = ({ cart }) => {
    if (cart.length === 0) return null;

    return (
        <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg">
            <div className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                <span>Cart: {cart.reduce((sum, item) => sum + item.quantity, 0)} items</span>
            </div>
        </div>
    );
};

export default CartSummary;