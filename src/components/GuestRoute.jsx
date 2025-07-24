import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const GuestRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) return null;

    if (isAuthenticated) {
        // Extract ?from=... from URL
        const params = new URLSearchParams(location.search);
        const from = params.get("from") || "/";
        return <Navigate to={from} replace />;
    }

    return children;
};

export default GuestRoute;
