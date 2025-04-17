import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, createTheme } from '@mui/material';
import theme from './styles/theme.jsx';
import Home from './pages/Home.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AdminPanel from './pages/AdminPanel.jsx';
import Navbar from './components/Navbar.jsx';
import {AuthProvider} from "./context/AuthContext.jsx";
import ErrorBoundary from "./ErrorBoundar.jsx";
import Login from './components/Auth/Login.jsx'
import Register from './components/Auth/Register.jsx'


function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <ErrorBoundary>
                    <AuthProvider>
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/admin" element={<AdminPanel />} />
                        </Routes>
                    </AuthProvider>
                </ErrorBoundary>
            </Router>
        </ThemeProvider>
    );
}

export default App;