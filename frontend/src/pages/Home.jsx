// src/pages/HomePage.jsx
import { Box, Button, Container, Grid, Typography, useTheme, Stack } from '@mui/material';
import { Login, HowToReg, Public, ArrowForward } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function HomePage() {
    const theme = useTheme();
    const navigate = useNavigate();
    const { user } = useAuth();

    const features = [
        {
            title: "Explore Countries",
            description: "Discover detailed information about every country in the world",
            icon: <Public fontSize="large" />,
            action: () => navigate('/dashboard')
        },
        {
            title: "Admin Dashboard",
            description: "Manage users and API keys (Admin only)",
            icon: <Public fontSize="large" />,
            action: () => navigate('/admin'),
            adminOnly: true
        }
    ];

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Hero Section */}
            <Box sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                color: 'white',
                py: { xs: 8, md: 12 },
                px: 2,
                textAlign: 'center'
            }}>
                <Container maxWidth="md">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Typography variant="h2" component="h1" gutterBottom sx={{
                            fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                            fontWeight: 700
                        }}>
                            Welcome to Country Explorer
                        </Typography>
                        <Typography variant="h5" component="p" sx={{
                            mb: 4,
                            fontSize: { xs: '1.1rem', md: '1.25rem' }
                        }}>
                            Access comprehensive country data with secure API integration
                        </Typography>

                        {!user ? (
                            <Stack
                                direction={{ xs: 'column', sm: 'row' }}
                                spacing={2}
                                justifyContent="center"
                            >
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="large"
                                    startIcon={<Login />}
                                    onClick={() => navigate('/login')}
                                    sx={{
                                        px: 4,
                                        py: 1.5,
                                        borderRadius: 2,
                                        minWidth: { xs: '100%', sm: 'auto' }
                                    }}
                                >
                                    Login
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    startIcon={<HowToReg />}
                                    onClick={() => navigate('/register')}
                                    sx={{
                                        px: 4,
                                        py: 1.5,
                                        borderRadius: 2,
                                        borderColor: 'white',
                                        color: 'white',
                                        '&:hover': { borderColor: 'white' },
                                        minWidth: { xs: '100%', sm: 'auto' }
                                    }}
                                >
                                    Register
                                </Button>
                            </Stack>
                        ) : (
                            <Button
                                variant="contained"
                                color="secondary"
                                size="large"
                                onClick={() => navigate('/dashboard')}
                                sx={{ px: 4, py: 1.5, borderRadius: 2 }}
                            >
                                Go to Dashboard
                            </Button>
                        )}
                    </motion.div>
                </Container>
            </Box>

            {/* Features Section */}
            <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 }, flex: 1 }}>
                <Typography variant="h3" component="h2" align="center" gutterBottom sx={{
                    mb: 6,
                    fontSize: { xs: '1.8rem', md: '2.2rem' }
                }}>
                    Key Features
                </Typography>

                <Grid container spacing={4} justifyContent="center">
                    {features.map((feature, index) => {
                        if (feature.adminOnly && (!user || user.role !== 'admin')) return null;

                        return (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <Box
                                        onClick={feature.action}
                                        sx={{
                                            height: '100%',
                                            p: 4,
                                            borderRadius: 2,
                                            boxShadow: 3,
                                            textAlign: 'center',
                                            bgcolor: 'background.paper',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <Box sx={{ color: theme.palette.primary.main, mb: 2 }}>
                                            {feature.icon}
                                        </Box>
                                        <Typography variant="h5" component="h3" gutterBottom sx={{
                                            fontWeight: 600,
                                            fontSize: { xs: '1.3rem', md: '1.5rem' }
                                        }}>
                                            {feature.title}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            {feature.description}
                                        </Typography>
                                    </Box>
                                </motion.div>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>

            {/* CTA Section */}
            {!user && (
                <Box sx={{
                    bgcolor: 'action.hover',
                    py: { xs: 6, md: 8 },
                    px: 2
                }}>
                    <Container maxWidth="md" sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" component="h3" gutterBottom sx={{
                            mb: 3,
                            fontSize: { xs: '1.5rem', md: '2rem' }
                        }}>
                            Ready to explore?
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 4, fontSize: { xs: '1rem', md: '1.1rem' } }}>
                            Create an account to get your API key and start accessing country data
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            endIcon={<ArrowForward />}
                            onClick={() => navigate('/register')}
                            sx={{
                                px: 6,
                                py: 1.5,
                                borderRadius: 2,
                                fontSize: '1.1rem'
                            }}
                        >
                            Get Started
                        </Button>
                    </Container>
                </Box>
            )}
        </Box>
    );
}