import { MapPin } from 'lucide-react';

// Constants for shipping rates
const SHIPPING_RATES = {
    standard: 150,
    express: 300,
    pickup: 0
};

// Constants for shipping methods
const SHIPPING_METHODS = [
    { id: 'standard', name: 'Standard (3–5 Days)', icon: '📦', rate: SHIPPING_RATES.standard },
    { id: 'express', name: 'Express (1–2 Days)', icon: '🚀', rate: SHIPPING_RATES.express },
    { id: 'pickup', name: 'Store Pickup', icon: '🏬', rate: SHIPPING_RATES.pickup }
];

// Constants for classnames
const CONTAINER_CLASSES = "bg-white rounded-2xl shadow-lg overflow-hidden";
const HEADER_CLASSES = "p-6 border-b bg-gradient-to-r from-indigo-50 to-purple-50";
const TITLE_CLASSES = "text-xl font-semibold text-gray-900";
const ICON_CLASSES = "w-5 h-5 inline mr-2";
const METHODS_GRID_CLASSES = "p-6 grid grid-cols-1 sm:grid-cols-3 gap-4";
const METHOD_BUTTON_BASE = "p-4 border-2 rounded-xl transition-all";
const METHOD_BUTTON_SELECTED = "border-indigo-500 bg-indigo-50 text-indigo-700";
const METHOD_BUTTON_UNSELECTED = "border-gray-200 hover:border-gray-300";
const METHOD_CONTENT_CLASSES = "text-center";
const METHOD_ICON_CLASSES = "text-2xl mb-2";
const METHOD_NAME_CLASSES = "text-sm font-medium";

const ShippingMethod = ({ selectedShipping, setSelectedShipping, setShippingPrice }) => {
    const handleSelect = (methodId) => {
        setSelectedShipping(methodId);
        setShippingPrice(SHIPPING_RATES[methodId]);
    };

    return (
        <div className={CONTAINER_CLASSES}>
            <div className={HEADER_CLASSES}>
                <h2 className={TITLE_CLASSES}>
                    <MapPin className={ICON_CLASSES} />
                    Shipping Method
                </h2>
            </div>
            <div className={METHODS_GRID_CLASSES}>
                {SHIPPING_METHODS.map((method) => (
                    <button
                        key={method.id}
                        onClick={() => handleSelect(method.id)}
                        className={`${METHOD_BUTTON_BASE} ${selectedShipping === method.id
                            ? METHOD_BUTTON_SELECTED
                            : METHOD_BUTTON_UNSELECTED
                            }`}
                    >
                        <div className={METHOD_CONTENT_CLASSES}>
                            <div className={METHOD_ICON_CLASSES}>{method.icon}</div>
                            <div className={METHOD_NAME_CLASSES}>{method.name} +Rs. {method.rate}</div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ShippingMethod;