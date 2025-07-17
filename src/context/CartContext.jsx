import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product, quantity = 1) => {
        setCart(prev => {
            const existing = prev.find(item => item.product_id === product.product_id);
            if (existing) {
                const newQty = existing.quantity + quantity;
                if (newQty > product.stock) return prev; // 👈 prevents overstock
                return prev.map(item =>
                    item.product_id === product.product_id
                        ? { ...item, quantity: newQty }
                        : item
                );
            }
            return quantity <= product.stock
                ? [...prev, { ...product, quantity }]
                : prev;
        });
    };

    const updateQuantity = (productId, change) => {
        setCart(prev => {
            return prev.map(item => {
                if (item.product_id !== productId) return item;

                const newQty = item.quantity + change;

                if (newQty <= 0) return item; // optionally remove item if 0?
                if (newQty > item.stock) return item; // prevent overstock

                return { ...item, quantity: newQty };
            });
        });
    };

    const removeFromCart = (productId) => {
        setCart(prev => prev.filter(item => item.product_id !== productId));
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('cart');
    };

    return (
        <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, clearCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
