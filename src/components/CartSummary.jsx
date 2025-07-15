import React from 'react';
import { ShoppingCart } from 'lucide-react';

// Cart Summary Classes
const CART_SUMMARY_CONTAINER = "fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg";
const CART_CONTENT = "flex items-center gap-2";
const CART_ICON = "w-4 h-4";

const CartSummary = ({ cart }) => {
    if (cart.length === 0) return null;

    return (
        <div className={CART_SUMMARY_CONTAINER}>
            <div className={CART_CONTENT}>
                <ShoppingCart className={CART_ICON} />
                <span>Cart: {cart.reduce((sum, item) => sum + item.quantity, 0)} items</span>
            </div>
        </div>
    );
};

export default CartSummary;