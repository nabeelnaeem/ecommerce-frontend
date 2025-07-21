import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Lock, Shield, CheckCircle, User, MapPin, Phone } from 'lucide-react';

// Style constants matching your cart page pattern
const PAGE_CONTAINER_CLASS = "min-h-screen bg-gray-50";
const CONTENT_CONTAINER_CLASS = "max-w-7xl mx-auto px-4 py-8";
const GRID_CONTAINER_CLASS = "grid grid-cols-1 lg:grid-cols-3 gap-8";
const SIDEBAR_CLASS = "space-y-6";
const TRANSITION_CLASS = "transition-colors";
const SHADOW_CLASS = "shadow-sm";
const SHADOW_LG_CLASS = "shadow-lg";
const BORDER_CLASS = "border-b";
const CONTAINER_CLASS = "bg-white";
const ROUNDED_CLASS = "rounded-2xl";
const INNER_CONTAINER_CLASS = "max-w-7xl mx-auto px-4 py-4";
const FLEX_CONTAINER_CLASS = "flex items-center justify-between";
const LEFT_SECTION_CLASS = "flex items-center space-x-4";
const RIGHT_SECTION_CLASS = "flex items-center space-x-2";
const BACK_LINK_CLASS = "flex items-center text-gray-600 hover:text-gray-800";
const CART_ICON_CLASS = "w-6 h-6 text-indigo-600";
const ARROW_ICON_CLASS = "w-5 h-5 mr-2";
const TITLE_CLASS = "text-2xl font-bold text-gray-900";
const CARD_CLASS = "bg-white rounded-2xl shadow-lg overflow-hidden";
const HEADER_CLASS = "p-6 border-b bg-gradient-to-r from-indigo-50 to-purple-50";
const HEADER_TITLE_CLASS = "text-xl font-semibold text-gray-900";
const BUTTON_CLASS = "w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg";
const INNER_CLASS = "flex items-center justify-center space-x-2";
const LOCK_ICON_CLASS = "w-5 h-5";

// Checkout Header Component
const CheckoutHeader = () => (
    <div className={`${CONTAINER_CLASS} ${SHADOW_CLASS} ${BORDER_CLASS}`}>
        <div className={INNER_CONTAINER_CLASS}>
            <div className={FLEX_CONTAINER_CLASS}>
                <div className={LEFT_SECTION_CLASS}>
                    <button className={`${BACK_LINK_CLASS} ${TRANSITION_CLASS}`}>
                        <ArrowLeft className={ARROW_ICON_CLASS} />
                        Back to Cart
                    </button>
                </div>
                <div className={RIGHT_SECTION_CLASS}>
                    <CreditCard className={CART_ICON_CLASS} />
                    <h1 className={TITLE_CLASS}>Checkout</h1>
                </div>
            </div>
        </div>
    </div>
);

// Customer Information Component
const CustomerInformation = ({ formData, setFormData }) => (
    <div className={CARD_CLASS}>
        <div className={HEADER_CLASS}>
            <h2 className={HEADER_TITLE_CLASS}>
                <User className="w-5 h-5 inline mr-2" />
                Customer Information
            </h2>
        </div>
        <div className="p-6 space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                </label>
                <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="John Doe"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                </label>
                <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="(555) 123-4567"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                </label>
                <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
                    rows="3"
                    placeholder="123 Main Street, City, State, ZIP Code"
                    required
                />
            </div>
        </div>
    </div>
);

// Payment Methods Component
const PaymentMethods = ({ selectedMethod, setSelectedMethod }) => {
    const methods = [
        { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
        { id: 'paypal', name: 'PayPal', icon: '🅿️' },
        { id: 'cod', name: 'Cash on Delivery', icon: '💵' },
        { id: 'bank', name: 'Bank Transfer', icon: '🏦' }
    ];

    return (
        <div className={CARD_CLASS}>
            <div className={HEADER_CLASS}>
                <h2 className={HEADER_TITLE_CLASS}>
                    <CreditCard className="w-5 h-5 inline mr-2" />
                    Payment Method
                </h2>
            </div>
            <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
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
        </div>
    );
};

// Order Summary Component (matching your design)
const CheckoutOrderSummary = ({ subtotal }) => {
    const shipping = 150;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    return (
        <div className="space-y-6">
            <div className={`bg-white p-6 ${ROUNDED_CLASS} ${SHADOW_LG_CLASS}`}>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

                <div className="space-y-4">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium">Rs {subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-600">Shipping</span>
                        <span className="font-medium">Rs {shipping.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-600">Tax (8%)</span>
                        <span className="font-medium">Rs {tax.toFixed(2)}</span>
                    </div>

                    <div className="border-t pt-4">
                        <div className="flex justify-between text-lg font-bold">
                            <span>Total</span>
                            <span className="text-indigo-600">Rs {total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Complete Order Button Component
const CompleteOrderButton = ({ onSubmit, isValid }) => (
    <button
        onClick={onSubmit}
        disabled={!isValid}
        className={`${BUTTON_CLASS} ${!isValid ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
        <div className={INNER_CLASS}>
            <Lock className={LOCK_ICON_CLASS} />
            <span>Complete Order</span>
        </div>
    </button>
);

// Trust Indicators Component (matching your design)
const CheckoutTrustIndicators = () => (
    <div className={`bg-white p-6 ${ROUNDED_CLASS} ${SHADOW_LG_CLASS}`}>
        <div className="space-y-4">
            <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">SSL Secured Payment</span>
            </div>
            <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">30-Day Money Back Guarantee</span>
            </div>
            <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Free Returns & Exchanges</span>
            </div>
            <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">24/7 Customer Support</span>
            </div>
        </div>
    </div>
);

// Main Checkout Component
const Checkout = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        address: ''
    });

    const [selectedMethod, setSelectedMethod] = useState('card');

    // Sample cart data for demonstration
    const subtotal = 2850.00;

    const isFormValid = formData.fullName && formData.phone && formData.address;

    const handleSubmit = () => {
        if (isFormValid) {
            alert('🎉 Order placed successfully! Thank you for your purchase.');
        } else {
            alert('⚠️ Please fill in all required fields.');
        }
    };

    return (
        <div className={PAGE_CONTAINER_CLASS}>
            <CheckoutHeader />
            <div className={CONTENT_CONTAINER_CLASS}>
                <div className={GRID_CONTAINER_CLASS}>
                    {/* Main Content - Form */}
                    <div className="lg:col-span-2 space-y-6">
                        <CustomerInformation
                            formData={formData}
                            setFormData={setFormData}
                        />
                        <PaymentMethods
                            selectedMethod={selectedMethod}
                            setSelectedMethod={setSelectedMethod}
                        />
                    </div>

                    {/* Sidebar - Order Summary */}
                    <div className={SIDEBAR_CLASS}>
                        <CheckoutOrderSummary subtotal={subtotal} />
                        <CompleteOrderButton
                            onSubmit={handleSubmit}
                            isValid={isFormValid}
                        />
                        <CheckoutTrustIndicators />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;