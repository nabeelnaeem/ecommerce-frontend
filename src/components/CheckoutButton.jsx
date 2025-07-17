import { Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

// Button Classes
const BUTTON_CLASS = "w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg";
const INNER_CLASS = "flex items-center justify-center space-x-2";
const LOCK_ICON_CLASS = "w-5 h-5";

const CheckoutButton = () => (
    <Link to="/checkout" className="block">
        <button className={BUTTON_CLASS}>
            <div className={INNER_CLASS}>
                <Lock className={LOCK_ICON_CLASS} />
                <span>Secure Checkout</span>
            </div>
        </button>
    </Link>
);

export default CheckoutButton;