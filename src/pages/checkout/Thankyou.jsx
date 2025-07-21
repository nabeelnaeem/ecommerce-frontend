import React, { useEffect } from 'react';
import { data, useLocation, useNavigate } from 'react-router-dom';

// Constants for classnames and strings
const CONTAINER_CLASSES = "min-h-screen bg-gray-50";
const CARD_CLASSES = "max-w-3xl mx-auto px-4 py-12 bg-white rounded-2xl shadow-lg space-y-6";
const TITLE_CLASSES = "text-2xl font-bold text-indigo-600";
const TEXT_CLASSES = "text-gray-700";
const GRID_CLASSES = "grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm";
const LABEL_CLASSES = "font-medium text-gray-600";
const VALUE_CLASSES = "text-gray-900";
const SUMMARY_CLASSES = "border-t pt-6 space-y-2 text-sm";
const TOTAL_CLASSES = "flex justify-between font-bold text-lg border-t pt-4";
const TOTAL_AMOUNT_CLASSES = "text-indigo-600";
const CAPITALIZE_CLASS = "capitalize";
const FLEX_BETWEEN_CLASS = "flex justify-between";

const ThankYou = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const order = location.state;

    useEffect(() => {
        if (!order) {
            navigate('/');
        }
    }, [order, navigate])

    if (!order) return null;


    const { order_id, tracking_id, shipping_method, payment_method, subtotal, shipping, total } = order;

    return (
        <div className={CONTAINER_CLASSES}>
            <div className={CARD_CLASSES}>
                <h2 className={TITLE_CLASSES}>🎉 Thank You for Your Order!</h2>
                <p className={TEXT_CLASSES}>
                    Your order has been placed successfully. Below are your order details:
                </p>

                <div className={GRID_CLASSES}>
                    <div>
                        <span className={LABEL_CLASSES}>Order ID:</span>
                        <div className={VALUE_CLASSES}>{order_id}</div>
                    </div>
                    <div>
                        <span className={LABEL_CLASSES}>Tracking ID:</span>
                        <div className={VALUE_CLASSES}>{tracking_id}</div>
                    </div>
                    <div>
                        <span className={LABEL_CLASSES}>Shipping Method:</span>
                        <div className={`${VALUE_CLASSES} ${CAPITALIZE_CLASS}`}>{shipping_method}</div>
                    </div>
                    <div>
                        <span className={LABEL_CLASSES}>Payment Method:</span>
                        <div className={`${VALUE_CLASSES} ${CAPITALIZE_CLASS}`}>{payment_method}</div>
                    </div>
                </div>

                <div className={SUMMARY_CLASSES}>
                    <div className={FLEX_BETWEEN_CLASS}>
                        <span className={LABEL_CLASSES}>Subtotal:</span>
                        <span className={VALUE_CLASSES}>Rs {subtotal.toFixed(2)}</span>
                    </div>
                    <div className={FLEX_BETWEEN_CLASS}>
                        <span className={LABEL_CLASSES}>Shipping:</span>
                        <span className={VALUE_CLASSES}>Rs {shipping.toFixed(2)}</span>
                    </div>
                    <div className={TOTAL_CLASSES}>
                        <span>Total:</span>
                        <span className={TOTAL_AMOUNT_CLASSES}>Rs {total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThankYou;