import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

// Common class constants
const HEADER_CONTAINER_CLASSES = "bg-white shadow-sm border-b";
const INNER_CONTAINER_CLASSES = "max-w-7xl mx-auto px-4 py-4";
const FLEX_CONTAINER_CLASSES = "flex items-center justify-between";
const BACK_BUTTON_CLASSES = "flex items-center text-gray-600 hover:text-gray-800 transition-colors";
const BACK_ICON_CLASSES = "w-5 h-5 mr-2";
const TITLE_CONTAINER_CLASSES = "flex items-center space-x-2";
const TITLE_CLASSES = "text-2xl font-bold text-gray-900";
const ICON_CLASSES = "w-6 h-6 text-indigo-600";

const OrderPageHeader = ({
    title,               // e.g. "Shopping Cart"
    icon,                // e.g. <ShoppingBag />
    backText,            // e.g. "Continue Shopping"
    backTo = null,       // optional: URL to go back to
    onBackClick = null,  // optional: function to call on back
}) => (
    <div className={HEADER_CONTAINER_CLASSES}>
        <div className={INNER_CONTAINER_CLASSES}>
            <div className={FLEX_CONTAINER_CLASSES}>
                {backTo ? (
                    <Link to={backTo} className={BACK_BUTTON_CLASSES}>
                        <ArrowLeft className={BACK_ICON_CLASSES} />
                        {backText}
                    </Link>
                ) : (
                    <button onClick={onBackClick} className={BACK_BUTTON_CLASSES}>
                        <ArrowLeft className={BACK_ICON_CLASSES} />
                        {backText}
                    </button>
                )}
                <div className={TITLE_CONTAINER_CLASSES}>
                    {icon && <span className={ICON_CLASSES}>{icon}</span>}
                    <h1 className={TITLE_CLASSES}>{title}</h1>
                </div>
            </div>
        </div>
    </div>
);

export default OrderPageHeader;
