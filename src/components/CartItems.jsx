import { Link } from 'react-router-dom';
import CartItem from './CartItem';

const CONTAINER_CLASS = "lg:col-span-2";
const CARD_CLASS = "bg-white rounded-2xl shadow-lg overflow-hidden";
const HEADER_CLASS = "p-6 border-b bg-gradient-to-r from-indigo-50 to-purple-50";
const EMPTY_CART_CLASS = "p-6 text-center text-gray-500";
const ITEM_CONTAINER_CLASS = "divide-y divide-gray-200";
const HEADER_TITLE_CLASS = "text-xl font-semibold text-gray-900";
const SHOPPING_LINK_CLASS = "text-indigo-600 underline";

const CartItems = ({ cart, updateQuantity, removeFromCart }) => (
    <div className={CONTAINER_CLASS}>
        <div className={CARD_CLASS}>
            <div className={HEADER_CLASS}>
                <h2 className={HEADER_TITLE_CLASS}>
                    Your Items ({cart.length})
                </h2>
            </div>

            {cart.length === 0 ? (
                <div className={EMPTY_CART_CLASS}>
                    Your cart is empty. <Link to="/products" className={SHOPPING_LINK_CLASS}>Go shopping</Link>
                </div>
            ) : (
                <div className={ITEM_CONTAINER_CLASS}>
                    {cart.map((item) => (
                        <CartItem
                            key={item.product_id}
                            item={item}
                            updateQuantity={updateQuantity}
                            removeFromCart={removeFromCart}
                        />
                    ))}
                </div>
            )}
        </div>
    </div>
);

export default CartItems;