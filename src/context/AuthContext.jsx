// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { useCart } from "./CartContext";

const AuthContext = createContext({
    user: null,
    isAuthenticated: false,
    loading: true,
    login: () => { },
    logout: () => { },
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [loading, setLoading] = useState(false); // no need to auto-fetch user
    const { clearCart } = useCart();

    const login = (user) => {
        localStorage.setItem("user", JSON.stringify(user)); // persist user
        setUser(user);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
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
