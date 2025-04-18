import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api.js';

//context creation
const AuthContext = createContext();

//authprovider component
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    //authentication check
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await api.get('http://localhost:5001/api/me');
                setUser(response.data.user);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false); 
            }
        };
        checkAuth();
    }, []);
//login
    const login = async (credentials) => {
        const response = await api.post('/auth/login', credentials);
        setUser(response.data.user);
        navigate('/dashboard');
    };
//logout
    const logout = async () => {
        await api.post('http://localhost:5001/api/logout');
        setUser(null);
        navigate('/');
    };
//context provider
    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
//custom hook
export function useAuth() {
    return useContext(AuthContext);
}