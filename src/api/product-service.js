import api from './api';
const FAILED_TO_FETCH_MESSAGE = "Failed to fetch products";

export const fetchProductsFromApi = async ({ page, limit, sortBy, sortOrder, name }) => {
    try {
        const response = await api.get('/products', {
            params: {
                page,
                limit,
                sortBy,
                sortOrder,
                ...(name?.trim() && { name }), // add name only if it exists and is not empty
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(`${FAILED_TO_FETCH_MESSAGE}: ${error.response?.status || error.message}`);
    }
};

export const fetchProductById = async (id) => {
    try {
        const response = await api.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`${FAILED_TO_FETCH_MESSAGE}: ${error.response?.status || error.message}`);
    }
};
