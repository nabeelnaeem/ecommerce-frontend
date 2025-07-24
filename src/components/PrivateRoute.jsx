import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) return null; // or loading indicator
    if (!isAuthenticated) {
        return <Navigate to={`/login?from=${encodeURIComponent(location.pathname + location.search)}`} replace />;
    }

    return children;
};

export default PrivateRoute;
