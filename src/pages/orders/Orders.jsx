import React, { useEffect, useState } from 'react';
import { fetchUserOrders } from '../../api/order-service';
import OrderPageHeader from '../../components/OrderPageHeader';
import { ShoppingBag } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext'; // ✅ Use this
import UserOrderCard from '../../components/UserOrderCard'; // ✅ new import

// Classes
const PAGE_CLASS = "min-h-screen bg-gray-50";
const CONTAINER_CLASS = "max-w-7xl mx-auto px-4 py-8 space-y-6";
const TEXT_GRAY_CLASS = "text-gray-600";

// Messages
const ORDER_FETCH_FAIL_MSG = "⚠️ Failed to fetch orders";

const Orders = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const data = await fetchUserOrders(user?.user_id);
                setOrders(data.orders || []);
            } catch (error) {
                toast.error(ORDER_FETCH_FAIL_MSG);
            } finally {
                setLoading(false);
            }
        };

        if (user?.user_id) {
            loadOrders();
        }
    }, [user?.user_id]);


    return (
        <div className={PAGE_CLASS}>
            <OrderPageHeader
                title="My Orders"
                icon={<ShoppingBag />}
                backText="Back to Shop"
                backTo="/products"
            />

            <div className={CONTAINER_CLASS}>
                {loading ? (
                    <p className={TEXT_GRAY_CLASS}>Loading your orders...</p>
                ) : orders.length === 0 ? (
                    <p className={TEXT_GRAY_CLASS}>You haven't placed any orders yet.</p>
                ) : (
                    orders.map(order => (
                        <UserOrderCard key={order.order_id} order={order} />
                    ))
                )}
            </div>
        </div>
    );
};

export default Orders;
