import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(config => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
});

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            localStorage.removeItem("accessToken");
            const currentPath = window.location.pathname + window.location.search;
            const encodedPath = encodeURIComponent(currentPath);
            window.location.href = `/login?from=${encodedPath}`;
        }
        return Promise.reject(error);
    }
);

export default api;
