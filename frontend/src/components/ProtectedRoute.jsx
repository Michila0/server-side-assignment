import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';


//component logic
const ProtectedRoute = ({ roles = [] }) => {
    const { user, loading } = useAuth();
    //loading state
    if (loading) {
        return <div>Loading...</div>; // Or a loading spinner
    }
    console.log('first'+user)
    //authentication check
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // role-based authorization
    if (roles.length > 0 && !roles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    //render authorized content
    return <Outlet/>;
};

//usage example
<Route
    path="/dashboard"
    element={
        <ProtectedRoute>
            <Dashboard />
        </ProtectedRoute>
    }
/>

export default ProtectedRoute;