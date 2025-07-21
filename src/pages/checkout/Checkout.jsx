import React, { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { placeOrder } from '../../api/checkout-service.js';
import { fetchProfile } from '../../api/auth-service.js';
import TrustIndicators from '../../components/TrustIndicators';
import CheckoutHeader from '../../components/CheckoutHeader';
import CustomerInformation from '../../components/CustomerInformation';
import PaymentMethods from '../../components/PaymentMethods';
import CheckoutOrderSummary from '../../components/CheckoutOrderSummary';
import CompleteOrderButton from '../../components/CompleteOrderButton.jsx';
import ShippingMethod from '../../components/ShippingMethod';

const SHIPPING_RATES = {
    standard: 150,
    express: 300,
    pickup: 0
};

const Checkout = () => {
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        address: ''
    });
    const [selectedMethod, setSelectedMethod] = useState('easypaisa');
    const [loading, setLoading] = useState(false);
    const [selectedShipping, setSelectedShipping] = useState('standard');
    const [shipping, setShipping] = useState(150); // initial value from default

    const [profileLoaded, setProfileLoaded] = useState(false);

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const data = await fetchProfile();
                setFormData({
                    fullName: data.user.full_name || '',
                    phone: data.user.phone || '',
                    address: data.user.address || ''
                });
            } catch (err) {
                toast.error('⚠️ Failed to load profile');
            } finally {
                setProfileLoaded(true);
            }
        };

        loadUserData();
    }, []);



    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.08;
    const total = subtotal + shipping;
    const isFormValid = formData.fullName && formData.phone && formData.address && cart.length > 0;
    const handleSubmit = async () => {
        if (!isFormValid) {
            toast.warn('⚠️ Please complete all required fields');
            return;
        }

        setLoading(true);
        try {
            const result = await placeOrder(cart, formData, selectedMethod, selectedShipping, shipping);

            toast.success('✅ Order placed!');
            clearCart();

            navigate('/thank-you', {
                state: {
                    order_id: result.order_id,
                    tracking_id: result.tracking_id,
                    shipping_method: selectedShipping,
                    payment_method: selectedMethod,
                    subtotal,
                    shipping,
                    total
                }
            });

        } catch (err) {
            toast.error('❌ Failed to place order');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-gray-50">
            <CheckoutHeader />
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        {profileLoaded ? (
                            <CustomerInformation formData={formData} setFormData={setFormData} />
                        ) : (
                            <div className="text-gray-500">Loading profile...</div>
                        )}
                        <PaymentMethods selectedMethod={selectedMethod} setSelectedMethod={setSelectedMethod} />
                        <ShippingMethod selectedShipping={selectedShipping} setSelectedShipping={setSelectedShipping} setShippingPrice={setShipping}
                        />
                    </div>
                    <div className="space-y-6">
                        <CheckoutOrderSummary subtotal={subtotal} shipping={shipping} total={total} />
                        <CompleteOrderButton
                            onSubmit={handleSubmit}
                            isValid={isFormValid && !loading}
                        />
                        <TrustIndicators />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
