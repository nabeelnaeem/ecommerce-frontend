// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import { useCart } from "./CartContext";

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

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }

        try {
            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000;

            if (decoded.exp < currentTime) {
                localStorage.removeItem("token");
                setUser(null);
            } else {
                setUser({
                    user_id: decoded.user_id,
                    username: decoded.username,
                    email: decoded.email
                });
            }
        } catch (err) {
            localStorage.removeItem("token");
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    const login = (user) => {
        setUser(user);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        clearCart();
    };

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
