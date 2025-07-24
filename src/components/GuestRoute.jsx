import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const GuestRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) return null; // or a loading spinner

    if (isAuthenticated) {
        // Redirect authenticated users away from login/signup
        return <Navigate to={location.state?.from || "/"} replace />;
    }

    return children;
};

export default GuestRoute;

