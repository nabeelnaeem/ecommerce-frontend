import { useCart } from '../../context/CartContext.jsx';
import CartHeader from '../../components/CartHeader.jsx';
import CartItems from '../../components/CartItems.jsx';
import OrderSummary from '../../components/OrderSummary.jsx';
import CheckoutButton from '../../components/CheckoutButton.jsx';
import TrustIndicators from '../../components/TrustIndicators.jsx';

const PAGE_CONTAINER_CLASS = "min-h-screen bg-gray-50";
const CONTENT_CONTAINER_CLASS = "max-w-7xl mx-auto px-4 py-8";
const GRID_CONTAINER_CLASS = "grid grid-cols-1 lg:grid-cols-3 gap-8";
const SIDEBAR_CLASS = "space-y-6";

const Cart = () => {
    const { cart, setCart, removeFromCart } = useCart();
    const updateQuantity = (id, change) => {
        setCart(prev =>
            prev.map(item =>
                item.product_id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + change) }
                    : item
            )
        );
    };

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div className={PAGE_CONTAINER_CLASS}>
            <CartHeader />
            <div className={CONTENT_CONTAINER_CLASS}>
                <div className={GRID_CONTAINER_CLASS}>
                    <CartItems
                        cart={cart}
                        updateQuantity={updateQuantity}
                        removeFromCart={removeFromCart}
                    />
                    <div className={SIDEBAR_CLASS}>
                        <OrderSummary subtotal={subtotal} />
                        <CheckoutButton />
                        <TrustIndicators />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;