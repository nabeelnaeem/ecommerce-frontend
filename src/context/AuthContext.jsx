import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api.js";
import { useCart } from "./CartContext"; // ✅ import

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { clearCart } = useCart(); // ✅ get clearCart

    const fetchProfile = async () => {
        try {
            const res = await api.get("/auth/profile");
            const username = res.data.message.split(" ")[1];
            setUser(username);
        } catch (err) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetchProfile();
        } else {
            setLoading(false);
        }
    }, []);

    const login = (username) => setUser(username);

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        clearCart(); // ✅ clear cart on logout
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
