import { CreditCard } from 'lucide-react';

const PaymentMethods = ({ selectedMethod, setSelectedMethod }) => {
    const methods = [
        { id: 'easypaisa', name: 'Easypaisa', icon: '📱' },
        { id: 'jazzcash', name: 'JazzCash', icon: '💳' },
        { id: 'cash_on_delivery', name: 'Cash on Delivery', icon: '💵' },
        { id: 'bank_transfer', name: 'Bank Transfer', icon: '🏦' }
    ];

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b bg-gradient-to-r from-indigo-50 to-purple-50">
                <h2 className="text-xl font-semibold text-gray-900">
                    <CreditCard className="w-5 h-5 inline mr-2" />
                    Payment Method
                </h2>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4">
                {methods.map((method) => (
                    <button
                        key={method.id}
                        onClick={() => setSelectedMethod(method.id)}
                        className={`p-4 border-2 rounded-xl transition-all ${selectedMethod === method.id
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

export default PaymentMethods;
