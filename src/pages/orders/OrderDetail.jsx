import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/api';
import { toast } from 'react-toastify';
import { Receipt } from 'lucide-react';
import OrderPageHeader from '../../components/OrderPageHeader';

// ✅ Classname Constants
const PAGE_CLASS = "min-h-screen bg-gray-50";
const CONTAINER_CLASS = "max-w-5xl mx-auto px-4 py-10 space-y-10";
const SECTION_CLASS = "bg-white p-6 rounded-2xl shadow-md space-y-4 border border-gray-200";
const SECTION_TITLE_CLASS = "text-2xl font-semibold text-indigo-700 flex items-center gap-2";
const ROW_CLASS = "flex justify-between flex-wrap text-sm md:text-base border-b border-gray-100 py-2";
const LABEL_CLASS = "text-gray-500 font-medium w-1/2 md:w-auto";
const VALUE_CLASS = "font-semibold text-gray-800 text-right w-1/2 md:w-auto";
const LOADING_PARAGRAPH_CLASS = "text-center text-gray-600 mt-10";
const STATUS_BADGE_CLASS = "px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700";
const SHIPPING_BADGE_CLASS = "px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700";
const SECTION_DIVIDER_CLASS = "border-t border-gray-100 pt-4";

// ✅ Toast Message Constants
const FAILED_ORDER_LOAD_MESSAGE = "⚠️ Failed to load order details";

const OrderDetail = () => {
    const { order_id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await api.get(`/orders/${order_id}`);
                setData(response.data);
            } catch (err) {
                toast.error(FAILED_ORDER_LOAD_MESSAGE);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [order_id]);

    if (loading) return <div className={PAGE_CLASS}><p className={LOADING_PARAGRAPH_CLASS}>Loading order...</p></div>;
    if (!data) return null;

    const { user, order, items, shipping, payment } = data;

    return (
        <div className={PAGE_CLASS}>
            <OrderPageHeader
                title="Order Details"
                icon={<Receipt />}
                backText="Back to Orders"
                backTo="/orders"
            />

            <div className={CONTAINER_CLASS}>

                {/* ✅ Customer Info */}
                <div className={SECTION_CLASS}>
                    <h2 className={SECTION_TITLE_CLASS}>👤 Customer Information</h2>
                    <div className={ROW_CLASS}><span className={LABEL_CLASS}>Full Name</span><span className={VALUE_CLASS}>{user.full_name}</span></div>
                    <div className={ROW_CLASS}><span className={LABEL_CLASS}>Email</span><span className={VALUE_CLASS}>{user.email}</span></div>
                    <div className={ROW_CLASS}><span className={LABEL_CLASS}>Phone</span><span className={VALUE_CLASS}>{user.phone}</span></div>
                    <div className={ROW_CLASS}><span className={LABEL_CLASS}>Billing Address</span><span className={VALUE_CLASS}>{user.address}</span></div>
                </div>

                {/* ✅ Order Info */}
                <div className={SECTION_CLASS}>
                    <h2 className={SECTION_TITLE_CLASS}>🧾 Order Summary</h2>
                    <div className={ROW_CLASS}><span className={LABEL_CLASS}>Order ID</span><span className={VALUE_CLASS}>#{order.order_id}</span></div>
                    <div className={ROW_CLASS}><span className={LABEL_CLASS}>Status</span>
                        <span className={`${VALUE_CLASS}`}>
                            <span className={STATUS_BADGE_CLASS}>{order.status}</span>
                        </span>
                    </div>
                    <div className={ROW_CLASS}><span className={LABEL_CLASS}>Date</span><span className={VALUE_CLASS}>{new Date(order.date).toLocaleDateString()}</span></div>
                    <div className={ROW_CLASS}><span className={LABEL_CLASS}>Total</span><span className={VALUE_CLASS}>Rs {order.total_amount.toFixed(2)}</span></div>
                </div>

                {/* ✅ Items */}
                <div className={SECTION_CLASS}>
                    <h2 className={SECTION_TITLE_CLASS}>🛒 Items</h2>
                    {items.map(item => (
                        <div key={item.product_id} className={ROW_CLASS}>
                            <span className={LABEL_CLASS}>{item.product_name} × {item.quantity}</span>
                            <span className={VALUE_CLASS}>Rs {item.amount.toFixed(2)}</span>
                        </div>
                    ))}
                </div>

                {/* ✅ Shipping Info */}
                <div className={SECTION_CLASS}>
                    <h2 className={SECTION_TITLE_CLASS}>🚚 Shipping Details</h2>
                    <div className={ROW_CLASS}><span className={LABEL_CLASS}>Shipping Method</span>
                        <span className={VALUE_CLASS}>
                            <span className={SHIPPING_BADGE_CLASS}>{shipping.method}</span>
                        </span>
                    </div>
                    <div className={ROW_CLASS}><span className={LABEL_CLASS}>Tracking ID</span><span className={VALUE_CLASS}>{shipping.tracking_id}</span></div>
                    <div className={ROW_CLASS}><span className={LABEL_CLASS}>Shipping Status</span><span className={VALUE_CLASS}>{shipping.shipping_status}</span></div>
                    <div className={ROW_CLASS}><span className={LABEL_CLASS}>Shipping Address</span><span className={VALUE_CLASS}>{shipping.address}</span></div>
                </div>

                {/* ✅ Payment Info */}
                <div className={SECTION_CLASS}>
                    <h2 className={SECTION_TITLE_CLASS}>💳 Payment Details</h2>
                    <div className={ROW_CLASS}><span className={LABEL_CLASS}>Payment Method</span><span className={VALUE_CLASS}>{payment.method}</span></div>
                    <div className={ROW_CLASS}><span className={LABEL_CLASS}>Status</span><span className={VALUE_CLASS}>{payment.payment_status}</span></div>
                    <div className={ROW_CLASS}><span className={LABEL_CLASS}>Date</span><span className={VALUE_CLASS}>{new Date(payment.payment_date).toLocaleString()}</span></div>
                    <div className={ROW_CLASS}><span className={LABEL_CLASS}>Amount</span><span className={VALUE_CLASS}>Rs {payment.amount.toFixed(2)}</span></div>
                </div>

            </div>
        </div>
    );
};

export default OrderDetail;
