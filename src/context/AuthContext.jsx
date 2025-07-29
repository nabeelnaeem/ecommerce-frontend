import { createContext, useContext, useState, useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import { logoutUser, refreshTokenAccess } from "../api/auth-service.js";

const REFRESH_REQUEST_TIMER = 5; // If expire time is less than these seconds, refresh request will be sent
const CHECK_INTERVAL = 5 * 1000; // a * 1000 (a) seconds, interval after which the check runs

const SESSION_EXPIRED_MSG = "🔒 Session expired. Please log in again.";
const LOGIN_API_FAILED_MSG = "Logout API failed:";

const AuthContext = createContext({
    user: null,
    isAuthenticated: false,
    loading: true,
    login: () => { },
    logout: () => { },
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { clearCart } = useCart();
    const logoutTimer = useRef(null);
    const refreshInterval = useRef(null);
    const navigate = useNavigate();

    const clearAuth = () => {
        localStorage.removeItem("accessToken");
        setUser(null);
        clearCart();
        navigate(0);
    };

    const logoutAndNotify = async () => {
        toast.error(SESSION_EXPIRED_MSG);
        setTimeout(() => {
            clearAuth();
        }, 1500);
        await logoutUser();
    };

    const logout = async () => {
        try {
            await logoutUser();
        } catch (error) {
            console.log(LOGIN_API_FAILED_MSG, error);
        } finally {
            clearAuth();
        }
    };

    const setLogoutTimer = () => {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        try {
            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            const timeLeft = decoded.exp - currentTime;

            if (logoutTimer.current) clearTimeout(logoutTimer.current);
            logoutTimer.current = setTimeout(() => {
                logoutAndNotify();
            }, timeLeft * 1000);
        } catch {
            logoutAndNotify();
        }
    };

    const setupAutoRefresh = () => {
        refreshInterval.current = setInterval(async () => {
            const token = localStorage.getItem("accessToken");
            if (!token) return;

            try {
                const decoded = jwtDecode(token);
                const currentTime = Date.now() / 1000;
                const timeLeft = decoded.exp - currentTime;

                if (timeLeft < REFRESH_REQUEST_TIMER) {
                    const newToken = await refreshTokenAccess();
                    localStorage.setItem("accessToken", newToken);

                    const decodedNew = jwtDecode(newToken);
                    setUser({
                        user_id: decodedNew.user_id,
                        username: decodedNew.username,
                        email: decodedNew.email,
                    });

                    setLogoutTimer();
                }
            } catch {
                logoutAndNotify();
            }
        }, CHECK_INTERVAL);
    };

    const setupStorageListener = () => {
        const onStorage = (e) => {
            if (e.key === "accessToken") {
                setLogoutTimer();
            }
        };
        window.addEventListener("storage", onStorage);

        setLogoutTimer();

        return () => {
            window.removeEventListener("storage", onStorage);
            if (logoutTimer.current) clearTimeout(logoutTimer.current);
        };
    };

    const login = (user) => {
        setUser(user);
        setupAutoRefresh();
        setupStorageListener();
    };

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }

        try {
            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000;

            if (decoded.exp < currentTime) {
                logoutAndNotify();
            } else {
                setUser({
                    user_id: decoded.user_id,
                    username: decoded.username,
                    email: decoded.email,
                });

                setupAutoRefresh();
                const cleanup = setupStorageListener();
                return cleanup;
            }
        } catch {
            logoutAndNotify();
        } finally {
            setLoading(false);
        }
    }, []);

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
