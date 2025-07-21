import { ArrowLeft, CreditCard } from 'lucide-react';

// Constants for classnames
const HEADER_CONTAINER_CLASSES = "bg-white shadow-sm border-b";
const INNER_CONTAINER_CLASSES = "max-w-7xl mx-auto px-4 py-4";
const FLEX_CONTAINER_CLASSES = "flex items-center justify-between";
const BACK_BUTTON_CLASSES = "flex items-center text-gray-600 hover:text-gray-800 transition-colors";
const BACK_ICON_CLASSES = "w-5 h-5 mr-2";
const TITLE_CONTAINER_CLASSES = "flex items-center space-x-2";
const CARD_ICON_CLASSES = "w-6 h-6 text-indigo-600";
const TITLE_CLASSES = "text-2xl font-bold text-gray-900";

const CheckoutHeader = () => (
    <div className={HEADER_CONTAINER_CLASSES}>
        <div className={INNER_CONTAINER_CLASSES}>
            <div className={FLEX_CONTAINER_CLASSES}>
                <button
                    className={BACK_BUTTON_CLASSES}
                    onClick={() => window.history.back()}
                >
                    <ArrowLeft className={BACK_ICON_CLASSES} />
                    Back to Cart
                </button>
                <div className={TITLE_CONTAINER_CLASSES}>
                    <CreditCard className={CARD_ICON_CLASSES} />
                    <h1 className={TITLE_CLASSES}>Checkout</h1>
                </div>
            </div>
        </div>
    </div>
);

export default CheckoutHeader;