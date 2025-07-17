import api from './api';

export const fetchProfile = async () => {
    const res = await api.get('/auth/profile');
    return res.data; // expected: { user: { ... } }
};

export const loginUser = async (credentials) => {
    const res = await api.post('/auth/login', credentials);
    return res.data; // expected: { token, user }
};

export const registerUser = async (userData) => {
    const res = await api.post('/auth/signup', userData);
    return res.data; // expected: { message }
};
