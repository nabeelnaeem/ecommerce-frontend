import axios from 'axios';
import { toast } from 'react-toastify';
import { refreshTokenAccess } from './auth-service.js';

const SESSION_END_MSG = "Your session has ended";
const ACCESS_REVOKED_MSG = "Your access has been revoked";
const SESSION_EXPIRED_MSG = "Session expired. Please log in again.";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
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
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

const forceLogout = (message = SESSION_END_MSG) => {
    localStorage.removeItem('accessToken');
    toast.error(message);
    setTimeout(() => {
        window.location.href = '/login';
    }, 1500);
};

api.interceptors.response.use(
    response => {
        // 🔒 Check revoked user in successful response
        if (response.data?.is_revoked) {
            forceLogout(ACCESS_REVOKED_MSG);
            return Promise.reject({ response: { data: { error: "Access revoked" } } });
        }

        return response;
    },

    async error => {
        const originalRequest = error.config;

        const isAuthRoute =
            originalRequest.url.includes('/auth/login') ||
            originalRequest.url.includes('/auth/signup');

        // 🔁 Handle expired access token
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
                if (refreshErr.response?.data?.is_revoked) {
                    forceLogout(ACCESS_REVOKED_MSG);
                } else {
                    forceLogout(SESSION_EXPIRED_MSG);
                }
                return Promise.reject(refreshErr);
            } finally {
                isRefreshing = false;
            }
        }

        // 🔒 If 403 and access is revoked explicitly
        if (error.response?.status === 403 && error.response?.data?.is_revoked) {
            forceLogout(ACCESS_REVOKED_MSG);
        }

        return Promise.reject(error);
    }
);

export default api;
