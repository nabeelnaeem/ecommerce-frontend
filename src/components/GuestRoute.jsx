import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const GuestRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && isAuthenticated) {
            const params = new URLSearchParams(location.search);
            const from = params.get("from");

            if (from) {
                navigate(from, { replace: true });
            } else {
                navigate(-1); // fallback to previous page
            }
        }
    }, [isAuthenticated, loading, location.search, navigate]);

    if (loading || isAuthenticated) return null;

    return children;
};

export default GuestRoute;
