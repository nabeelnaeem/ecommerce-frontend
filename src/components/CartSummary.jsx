import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

// Cart Summary Classes
const CART_SUMMARY_CONTAINER = "fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg";
const CART_CONTENT = "flex items-center gap-2";
const CART_ICON = "w-4 h-4";

const CartSummary = () => {
    const { cart } = useCart();
    if (!cart || cart.length === 0) return null;

    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className={CART_SUMMARY_CONTAINER}>
            <div className={CART_CONTENT}>
                <ShoppingCart className={CART_ICON} />
                <span>Cart: {itemCount} {itemCount === 1 ? 'item' : 'items'}</span>
            </div>
        </div>
    );
};

export default CartSummary;