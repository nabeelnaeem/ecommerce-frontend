import api from './api';

export const loginUser = async (credentials) => {
    const res = await api.post('/auth/login', credentials);
    return res.data; // { token, user }
};

export const registerUser = async (userData) => {
    const res = await api.post('/auth/signup', userData);
    return res.data; // { message }
};

export const fetchProfile = async () => {
    const res = await api.get('/auth/profile');
    return res.data; // {}
}

export const updateProfile = async (userData) => {
    const res = await api.put('/auth/profile', userData);
    return res.data;
}

//New added
export const refreshTokenAccess = async () => {
    const res = await api.post('/auth/refresh-token', {}, { withCredentials: true })
    //withCredentials tell browser to include credentials credentials (such as cookies,
    //authorization headers, or TLS client certificates) in cross-origin HTTP requests.
    return res.data.accessToken;
};

export const logoutUser = async () => {
    await api.post('/auth/logout', {}, { withCredentials: true });
};