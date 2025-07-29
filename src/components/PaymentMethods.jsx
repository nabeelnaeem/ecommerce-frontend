import { CreditCard } from 'lucide-react';
const RECEIPT_PHONE_MSG = 'Send the recipet to 03058912118 with Order ID'
const PaymentMethods = ({ selectedMethod, setSelectedMethod }) => {
    const methods = [
        { id: 'easypaisa', name: 'Easypaisa', icon: '📱', info: `Pay using your Easypaisa mobile account. EASYPAISA ACCOUNT # 0000000000` },
        { id: 'jazzcash', name: 'JazzCash', icon: '💳', info: `Pay using your JAZZCASH mobile account. JAZZCASH ACCOUNT # 0000000000` },
        { id: 'cash_on_delivery', name: 'Cash on Delivery', icon: '💵', info: 'Pay with cash when the order arrives.' },
        { id: 'bank_transfer', name: 'Bank Transfer', icon: '🏦', info: `Directly transfer to our bank account. (HBL, ACCOUNT# 0000000000)` }
    ];

    const selectedInfo = methods.find(m => m.id === selectedMethod)?.info;

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden text-center">
            <div className="p-6 border-b bg-gradient-to-r from-indigo-50 to-purple-50">
                <h2 className="text-xl font-semibold text-gray-900">
                    <CreditCard className="w-5 h-5 inline mr-2" />
                    Payment Method
                </h2>
            </div>
            <div className="p-6 grid grid-cols-4 gap-4">
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

            {selectedInfo && (
                <div className="px-6 pb-6 text-sm text-gray-600">
                    <div className="mt-2 rounded-md bg-indigo-50 text-indigo-800 p-3 inline-block">
                        {selectedInfo} <br></br>
                        {RECEIPT_PHONE_MSG}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentMethods;
