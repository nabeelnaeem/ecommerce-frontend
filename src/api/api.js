import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            const currentPath = window.location.pathname + window.location.search;
            const encodedPath = encodeURIComponent(currentPath);
            window.location.href = `/login?from=${encodedPath}`;
        }
        return Promise.reject(error);
    }
);

export default api;
