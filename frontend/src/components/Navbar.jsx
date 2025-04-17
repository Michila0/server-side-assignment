import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Country App
                </Typography>
                {user ? (
                    <Box>
                        <Button color="inherit" onClick={() => navigate('/dashboard')}>
                            Dashboard
                        </Button>
                        {user.role === 'admin' && (
                            <Button color="inherit" onClick={() => navigate('/admin')}>
                                Admin
                            </Button>
                        )}
                        <Button color="inherit" onClick={logout}>
                            Logout
                        </Button>
                    </Box>
                ) : (
                    <Button color="inherit" onClick={() => navigate('/login')}>
                        Login
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
}