import { createContext, useContext, useState, useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();

    const clearAuth = () => {
        localStorage.removeItem("accessToken");
        setUser(null);
        clearCart();
        navigate(0);
        console.log(path);
    };

    const logoutAndNotify = () => {
        toast.error("🔒 Session expired. Please log in again.");
        setTimeout(() => {
            clearAuth();
        }, 1500);
    };

    const login = (user) => {
        setUser(user);
        setupTokenAutoLogout();
    };

    const logout = () => {
        clearAuth();
    };

    const setupTokenAutoLogout = () => {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) return;

        try {
            const decoded = jwtDecode(accessToken);
            const currentTime = Date.now() / 1000;
            const timeLeft = decoded.exp - currentTime;

            if (timeLeft <= 0) {
                logoutAndNotify();
            } else {
                if (logoutTimer.current) clearTimeout(logoutTimer.current);
                logoutTimer.current = setTimeout(() => {
                    logoutAndNotify();
                }, timeLeft * 1000);
            }
        } catch (err) {
            logoutAndNotify();
        }
    };

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            setUser(null);
            setLoading(false);
            return;
        }

        try {
            const decoded = jwtDecode(accessToken);
            const currentTime = Date.now() / 1000;

            if (decoded.exp < currentTime) {
                logoutAndNotify();
            } else {
                setUser({
                    user_id: decoded.user_id,
                    username: decoded.username,
                    email: decoded.email,
                });
                setupTokenAutoLogout();
            }
        } catch (err) {
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
