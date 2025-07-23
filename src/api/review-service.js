import api from './api';

export const checkIfPurchase = async (product_id) => {
    const response = await api.get(`/reviews/has-purchased/${product_id}`);
    return response.data;
};