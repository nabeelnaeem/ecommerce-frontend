import axios from 'axios';
import { refreshTokenAccess } from './auth-service.js';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

// Attach Authorization header if token exists
api.interceptors.request.use(config => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(queuedRequest => {
        if (error) {
            queuedRequest.reject(error);
        } else {
            queuedRequest.resolve(token);
        }
    });

    failedQueue = [];
};

api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        const isAuthRoute =
            originalRequest.url.includes('/auth/login') ||
            originalRequest.url.includes('/auth/signup');

        // Skip refresh logic for login/signup failures
        if (error.response?.status === 401 && !originalRequest._retry && !isAuthRoute) {
            originalRequest._retry = true;

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then(token => {
                        originalRequest.headers['Authorization'] = `Bearer ${token}`;
                        return api(originalRequest);
                    })
                    .catch(err => Promise.reject(err));
            }

            isRefreshing = true;

            try {
                const newToken = await refreshTokenAccess();
                localStorage.setItem('accessToken', newToken);
                processQueue(null, newToken);
                originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                return api(originalRequest);
            } catch (refreshErr) {
                processQueue(refreshErr, null);
                localStorage.removeItem('accessToken');
                window.location.href = `/login?from=${encodeURIComponent(window.location.pathname)}`;
                return Promise.reject(refreshErr);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;
