import React, { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { placeOrder } from '../../api/checkout-service.js';
import { fetchProfile } from '../../api/auth-service.js';
import TrustIndicators from '../../components/TrustIndicators';
import CustomerInformation from '../../components/CustomerInformation';
import PaymentMethods from '../../components/PaymentMethods';
import ShippingMethod from '../../components/ShippingMethod';
import SecureButton from '../../components/SecureButton';
import { CreditCard } from 'lucide-react';
import OrderPageHeader from '../../components/OrderPageHeader';
import OrderSummary from '../../components/OrderSummary.jsx';


// Constants
const SHIPPING_RATES = {
    standard: 150,
    express: 300,
    pickup: 0
};

// Classname constants
const PAGE_CLASSES = "min-h-screen bg-gray-50";
const CONTAINER_CLASSES = "max-w-7xl mx-auto px-4 py-8";
const GRID_CLASSES = "grid grid-cols-1 lg:grid-cols-3 gap-8";
const MAIN_CONTENT_CLASSES = "lg:col-span-2 space-y-6";
const SIDEBAR_CLASSES = "space-y-6";
const LOADING_TEXT_CLASSES = "text-gray-500";

// Messages
const TOAST_PROFILE_ERROR_MESSAGE = '⚠️ Failed to load profile';
const TOAST_ORDER_ERROR_MESSAGE = '❌ Failed to place order';
const TOAST_WARNING_MESSAGE = '⚠️ Please complete all required fields';
const TOAST_SUCCESS_MESSAGE = '✅ Order placed!';


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
    const [shipping, setShipping] = useState(SHIPPING_RATES.standard);
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
                toast.error(TOAST_PROFILE_ERROR_MESSAGE);
            } finally {
                setProfileLoaded(true);
            }
        };

        loadUserData();
    }, []);

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const total = subtotal + shipping;
    const isFormValid = formData.fullName && formData.phone && formData.address && cart.length > 0;

    const handleSubmit = async () => {
        if (!isFormValid) {
            toast.warn(TOAST_WARNING_MESSAGE);
            return;
        }

        setLoading(true);
        try {
            const result = await placeOrder(cart, formData, selectedMethod, selectedShipping, shipping);

            toast.success(TOAST_SUCCESS_MESSAGE);
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
            toast.error(TOAST_ORDER_ERROR_MESSAGE);

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={PAGE_CLASSES}>
            <OrderPageHeader
                title="Checkout"
                icon={<CreditCard />}
                backText="Cart Details"
                onBackClick={() => navigate("/cart")}

            />
            <div className={CONTAINER_CLASSES}>
                <div className={GRID_CLASSES}>
                    <div className={MAIN_CONTENT_CLASSES}>
                        {profileLoaded ? (
                            <CustomerInformation formData={formData} setFormData={setFormData} />
                        ) : (
                            <div className={LOADING_TEXT_CLASSES}>Loading profile...</div>
                        )}
                        <PaymentMethods selectedMethod={selectedMethod} setSelectedMethod={setSelectedMethod} />
                        <ShippingMethod
                            selectedShipping={selectedShipping}
                            setSelectedShipping={setSelectedShipping}
                            setShippingPrice={setShipping}
                        />
                    </div>
                    <div className={SIDEBAR_CLASSES}>
                        <OrderSummary
                            subtotal={subtotal}
                            shipping={shipping}
                            total={total}
                        />
                        {loading ? (
                            <SecureButton
                                label="Placing Your Order ..."
                                disabled={true}
                                spinner={true}
                            />) : (
                            <SecureButton
                                label="Complete Order"
                                onClick={handleSubmit}
                                disabled={!isFormValid || loading}
                            />
                        )}

                        <TrustIndicators />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;