import React from 'react';
import { Link } from 'react-router-dom';

const CARD_CLASS = "bg-white rounded-2xl m-2 shadow-md p-6 hover:shadow-xl border border-gray-200 hover:border-indigo-500 transition-all";
const HEADER_CLASS = "text-lg font-bold text-gray-800 mb-4";
const TABLE_CLASS = "w-full text-sm md:text-base table-fixed";
const ROW_CLASS = "border-t border-gray-100 py-2 flex justify-between";
const LABEL_CLASS = "text-gray-500 font-medium text-left w-1/2 pr-4";
const VALUE_CLASS = "text-gray-700 text-right w-1/2 break-words";

const UserOrderCard = ({ order }) => {
    const {
        order_id,
        order_status,
        total_amount,
        payment_method,
        shipping_method,
        order_date,
        tracking_id,
    } = order;

    return (
        <Link to={`/orders/${order_id}`}>
            <div className={CARD_CLASS}>
                <h3 className={HEADER_CLASS}>Order Summary</h3>
                <div className={TABLE_CLASS}>
                    <div className={ROW_CLASS}>
                        <span className={LABEL_CLASS}>Order ID</span>
                        <span className={VALUE_CLASS}>ORD-{order_id.slice(0, 8).toUpperCase()}</span>
                    </div>

                    <div className={ROW_CLASS}>
                        <span className={LABEL_CLASS}>Tracking ID</span>
                        <span className={VALUE_CLASS}>{tracking_id || 'N/A'}</span>
                    </div>

                    <div className={ROW_CLASS}>
                        <span className={LABEL_CLASS}>Status</span>
                        <span className={VALUE_CLASS}>{order_status}</span>
                    </div>

                    <div className={ROW_CLASS}>
                        <span className={LABEL_CLASS}>Payment Method</span>
                        <span className={VALUE_CLASS}>{payment_method}</span>
                    </div>

                    <div className={ROW_CLASS + " "}>
                        <span className={LABEL_CLASS}>Shipping Method</span>
                        <span className={VALUE_CLASS}>{shipping_method}</span>
                    </div>

                    <div className={ROW_CLASS}>
                        <span className={LABEL_CLASS}>Total Amount</span>
                        <span className={VALUE_CLASS}>Rs {total_amount.toFixed(2)}</span>
                    </div>

                    <div className={ROW_CLASS}>
                        <span className={LABEL_CLASS}>Placed On</span>
                        <span className={VALUE_CLASS}>{new Date(order_date).toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default UserOrderCard;
