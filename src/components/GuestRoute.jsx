import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const GuestRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) return null;

    if (isAuthenticated) {
        return <Navigate to={location.state?.from || "/products"} replace />;
    }

    return children;
};

export default GuestRoute;

