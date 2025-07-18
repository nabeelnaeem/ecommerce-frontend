import api from './api';

export const loginUser = async (credentials) => {
    const res = await api.post('/auth/login', credentials);
    return res.data; // { token, user }
};

export const registerUser = async (userData) => {
    const res = await api.post('/auth/signup', userData);
    return res.data; // { message }
};
