import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const TRANSITION_CLASS = "transition-colors";
const SHADOW_CLASS = "shadow-sm";
const BORDER_CLASS = "border-b";
const CONTAINER_CLASS = "bg-white";
const INNER_CONTAINER_CLASS = "max-w-7xl mx-auto px-4 py-4";
const FLEX_CONTAINER_CLASS = "flex items-center justify-between";
const LEFT_SECTION_CLASS = "flex items-center space-x-4";
const RIGHT_SECTION_CLASS = "flex items-center space-x-2";
const BACK_LINK_CLASS = "flex items-center text-gray-600 hover:text-gray-800";
const CART_ICON_CLASS = "w-6 h-6 text-indigo-600";
const ARROW_ICON_CLASS = "w-5 h-5 mr-2";
const TITLE_CLASS = "text-2xl font-bold text-gray-900";

const CartHeader = () => (
    <div className={`${CONTAINER_CLASS} ${SHADOW_CLASS} ${BORDER_CLASS}`}>
        <div className={INNER_CONTAINER_CLASS}>
            <div className={FLEX_CONTAINER_CLASS}>
                <div className={LEFT_SECTION_CLASS}>
                    <Link to="/products" className={`${BACK_LINK_CLASS} ${TRANSITION_CLASS}`}>
                        <ArrowLeft className={ARROW_ICON_CLASS} />
                        Continue Shopping
                    </Link>
                </div>
                <div className={RIGHT_SECTION_CLASS}>
                    <ShoppingBag className={CART_ICON_CLASS} />
                    <h1 className={TITLE_CLASS}>Shopping Cart</h1>
                </div>
            </div>
        </div>
    </div>
);

export default CartHeader;