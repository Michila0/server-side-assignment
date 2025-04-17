import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Container,
    Typography,
    Grid,
    Paper,
    useTheme
} from '@mui/material';
import {
    Login as LoginIcon,
    HowToReg as RegisterIcon,
    Public as CountriesIcon,
    AdminPanelSettings as AdminIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function Home() {
    const theme = useTheme();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [hoveredCard, setHoveredCard] = useState(null);

    const features = [
        {
            id: 1,
            title: 'Explore Countries',
            description: 'Discover detailed information about every country in the world',
            icon: <CountriesIcon fontSize="large" color="primary" />,
            action: () => navigate('/dashboard'),
            color: theme.palette.primary.main
        },
        {
            id: 2,
            title: 'Admin Dashboard',
            description: 'Manage users and view API usage statistics',
            icon: <AdminIcon fontSize="large" color="secondary" />,
            action: () => navigate('/admin'),
            color: theme.palette.secondary.main,
            adminOnly: true
        },
    ];

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Hero Section */}
            <Paper
                elevation={4}
                sx={{
                    p: 4,
                    mb: 4,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    color: 'white',
                    borderRadius: 2,
                    textAlign: 'center'
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Typography variant="h3" component="h1" gutterBottom>
                        Welcome to Country Explorer
                    </Typography>
                    <Typography variant="h6" component="p" sx={{ mb: 3 }}>
                        Access comprehensive country data with secure API integration
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                        {!user ? (
                            <>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="large"
                                    startIcon={<LoginIcon />}
                                    onClick={() => navigate('/login')}
                                    sx={{
                                        px: 4,
                                        borderRadius: '8px',
                                    }}
                                >
                                    Login
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    startIcon={<RegisterIcon />}
                                    onClick={() => navigate('/register')}
                                    sx={{
                                        px: 4,
                                        borderRadius: '8px',
                                        color: 'white',
                                        borderColor: 'white',
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                        }
                                    }}
                                >
                                    Register
                                </Button>
                            </>
                        ) : (
                            <Button
                                variant="contained"
                                color="secondary"
                                size="large"
                                startIcon={<CountriesIcon />}
                                onClick={() => navigate('/dashboard')}
                                sx={{ px: 4 }}
                            >
                                Go to Dashboard
                            </Button>
                        )}
                    </Box>
                </motion.div>
            </Paper>

            {/* Features Section */}
            <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
                Key Features
            </Typography>

            <Grid container spacing={4} justifyContent="center">
                {features.map((feature) => {
                    if (feature.adminOnly && (!user || user.role !== 'admin')) return null;

                    return (
                        <Grid item xs={12} sm={6} md={4} key={feature.id}>
                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Paper
                                    elevation={hoveredCard === feature.id ? 6 : 3}
                                    onClick={feature.action}
                                    onMouseEnter={() => setHoveredCard(feature.id)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                    sx={{
                                        p: 3,
                                        height: '100%',
                                        cursor: 'pointer',
                                        borderLeft: `4px solid ${feature.color}`,
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                                        {feature.icon}
                                    </Box>
                                    <Typography variant="h5" component="h3" gutterBottom align="center">
                                        {feature.title}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary" align="center">
                                        {feature.description}
                                    </Typography>
                                </Paper>
                            </motion.div>
                        </Grid>
                    );
                })}
            </Grid>

            {/* Call to Action */}
            {!user && (
                <Paper elevation={3} sx={{ p: 4, mt: 6, textAlign: 'center' }}>
                    <Typography variant="h5" component="h3" gutterBottom>
                        Ready to explore?
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                        Create an account to get your API key and start accessing country data
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<RegisterIcon />}
                        onClick={() => navigate('/register')}
                        sx={{ px: 5, borderRadius: '8px' }}
                    >
                        Get Started
                    </Button>
                </Paper>
            )}
        </Container>
    );
}