// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { fetchProfile } from "../api/auth-service";
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

    const initializeAuth = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const data = await fetchProfile();
            setUser(data.user ?? null);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        initializeAuth();
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
