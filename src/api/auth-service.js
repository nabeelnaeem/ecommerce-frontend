import api from './api';

export const loginUser = async (credentials) => {
    const res = await api.post('/auth/login', credentials);
    return res.data; // { token, user }
};

export const registerUser = async (userData) => {
    const res = await api.post('/auth/signup', userData);
    return res.data; // { message }
};


//Newly added function
export const fetchProfile = async () => {
    const res = await api.get('/auth/profile');
    return res.data; // {}
}

export const updateProfile = async (userData) => {
    const res = await api.put('/auth/profile', userData);
    return res.data;
}