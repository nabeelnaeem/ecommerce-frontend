import api from './api';

export const placeOrder = async (cart, formData, paymentMethod, shippingMethod, shippingFee) => {
    const payload = {
        cart: cart.map(item => ({
            product_id: item.product_id,
            quantity: item.quantity
        })),
        shippingInfo: {
            full_name: formData.fullName,
            address: formData.address,
            phone: formData.phone,
            method: shippingMethod,
            shipping_fee: shippingFee
        },
        paymentInfo: {
            method: paymentMethod,
            status: 'paid'
        }
    };

    const res = await api.post('/orders', payload);
    return res.data;
};
