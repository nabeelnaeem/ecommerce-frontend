import { ArrowLeft, CreditCard } from 'lucide-react';

const CheckoutHeader = () => (
    <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
                <button
                    className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                    onClick={() => window.history.back()}
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Cart
                </button>
                <div className="flex items-center space-x-2">
                    <CreditCard className="w-6 h-6 text-indigo-600" />
                    <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
                </div>
            </div>
        </div>
    </div>
);

export default CheckoutHeader;
