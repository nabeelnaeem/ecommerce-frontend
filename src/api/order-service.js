import api from './api';
const ID_REQUIRED_ERROR = "User ID is Required";
export const fetchUserOrders = async (user_id) => {
    if (!user_id) throw new Error(ID_REQUIRED_ERROR);
    const response = await api.get(`/orders/user/${user_id}`);
    return response.data;
};