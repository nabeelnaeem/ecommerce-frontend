import api from './api';

export const checkIfPurchase = async (product_id) => {
    const response = await api.get(`/reviews/has-purchased/${product_id}`);
    return response.data;
};

export const submitProductReview = async (product_id, rating, comment) => {
    const response = await api.post(`/reviews`, {
        product_id,
        rating,
        comment
    });
    return response.data;
}

export const updateProductReview = async (product_id, rating, comment) => {
    const response = await api.put(`/reviews`, {
        product_id,
        rating,
        comment
    });
    return response.data;
}