import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ThankYou = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const order = location.state;

    if (!order) {
        navigate('/'); // Redirect if user lands directly
        return null;
    }

    const { order_id, tracking_id, shipping_method, payment_method, subtotal, shipping, total } = order;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-3xl mx-auto px-4 py-12 bg-white rounded-2xl shadow-lg space-y-6">
                <h2 className="text-2xl font-bold text-indigo-600">🎉 Thank You for Your Order!</h2>
                <p className="text-gray-700">
                    Your order has been placed successfully. Below are your order details:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                        <span className="font-medium text-gray-600">Order ID:</span>
                        <div className="text-gray-900">{order_id}</div>
                    </div>
                    <div>
                        <span className="font-medium text-gray-600">Tracking ID:</span>
                        <div className="text-gray-900">{tracking_id}</div>
                    </div>
                    <div>
                        <span className="font-medium text-gray-600">Shipping Method:</span>
                        <div className="text-gray-900 capitalize">{shipping_method}</div>
                    </div>
                    <div>
                        <span className="font-medium text-gray-600">Payment Method:</span>
                        <div className="text-gray-900 capitalize">{payment_method}</div>
                    </div>
                </div>

                <div className="border-t pt-6 space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="font-medium">Rs {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Shipping:</span>
                        <span className="font-medium">Rs {shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-4">
                        <span>Total:</span>
                        <span className="text-indigo-600">Rs {total.toFixed(2)}</span>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ThankYou;
