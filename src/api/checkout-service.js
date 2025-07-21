import api from './api';

export const placeOrder = async (cart, formData, paymentMethod) => {
    const payload = {
        cart: cart.map(item => ({
            product_id: item.product_id,
            quantity: item.quantity
        })),
        shippingInfo: {
            full_name: formData.fullName,
            address: formData.address,
            phone: formData.phone,
            method: 'standard'
        },
        paymentInfo: {
            method: paymentMethod,
            status: 'paid'
        }
    };

    const res = await api.post('/orders', payload);
    return res.data;
};
