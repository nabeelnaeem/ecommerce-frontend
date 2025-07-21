import { MapPin } from 'lucide-react';

const SHIPPING_RATES = {
    standard: 150,
    express: 300,
    pickup: 0
};

const ShippingMethod = ({ selectedShipping, setSelectedShipping, setShippingPrice }) => {
    const methods = [
        { id: 'standard', name: 'Standard (3–5 Days)', icon: '📦' },
        { id: 'express', name: 'Express (1–2 Days)', icon: '🚀' },
        { id: 'pickup', name: 'Store Pickup', icon: '🏬' }
    ];

    const handleSelect = (methodId) => {
        setSelectedShipping(methodId);
        setShippingPrice(SHIPPING_RATES[methodId]);
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b bg-gradient-to-r from-indigo-50 to-purple-50">
                <h2 className="text-xl font-semibold text-gray-900">
                    <MapPin className="w-5 h-5 inline mr-2" />
                    Shipping Method
                </h2>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {methods.map((method) => (
                    <button
                        key={method.id}
                        onClick={() => handleSelect(method.id)}
                        className={`p-4 border-2 rounded-xl transition-all ${selectedShipping === method.id
                                ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                    >
                        <div className="text-center">
                            <div className="text-2xl mb-2">{method.icon}</div>
                            <div className="text-sm font-medium">{method.name}</div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ShippingMethod;
