import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';



const ProtectedRoute = ({ roles = [] }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // Or a loading spinner
    }
    console.log('first'+user)
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Check if route requires specific role
    if (roles.length > 0 && !roles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet/>;
};

<Route
    path="/dashboard"
    element={
        <ProtectedRoute>
            <Dashboard />
        </ProtectedRoute>
    }
/>

export default ProtectedRoute;