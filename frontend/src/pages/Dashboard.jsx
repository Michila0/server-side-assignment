import { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Container,
    Grid,
    Card,
    CardContent,
    TextField,
    Button,
    Chip,
    CircularProgress,
    Alert,
    Paper,
    IconButton,
    Tooltip
} from '@mui/material';
import {
    Public as CountryIcon,
    VpnKey as KeyIcon,
    Refresh as RefreshIcon,
    ContentCopy as CopyIcon,
    Logout as LogoutIcon,
    ArrowBack as BackIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { getCountries, filterCountry } from '../api';
import { motion } from 'framer-motion';

export default function Dashboard() {
    const { user, logout } = useAuth();
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [apiKey, setApiKey] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await getCountries(apiKey);
                setCountries(response.data);
                setFilteredCountries(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch countries. Please check your API key.');
                setLoading(false);
            }
        };

        if (apiKey) {
            fetchCountries();
        }
    }, [apiKey]);

    useEffect(() => {
        if (searchTerm === '') {
            setFilteredCountries(countries);
        } else {
            const filtered = countries.filter(country =>
                country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredCountries(filtered);
        }
    }, [searchTerm, countries]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleCopyKey = () => {
        navigator.clipboard.writeText(apiKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleRefreshKey = () => {
        // Implement API key refresh logic here
        alert('API key refresh functionality to be implemented');
    };

    if (!user) {
        return (
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Alert severity="error">Please login to access the dashboard</Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            {/* Header Section */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                <Typography variant="h4" component="h1">
                    <CountryIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                    Country Dashboard
                </Typography>
                <Box>
                    <Tooltip title="Logout">
                        <IconButton onClick={logout} color="error">
                            <LogoutIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>

            {/* API Key Section */}
            <Paper elevation={3} sx={{ p: 3, mb: 4, backgroundColor: '#f5f5f5' }}>
                <Typography variant="h6" gutterBottom>
                    <KeyIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                    Your API Key
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <TextField
                        value={apiKey || 'No API key available'}
                        variant="outlined"
                        size="small"
                        fullWidth
                        disabled
                        sx={{ backgroundColor: 'white' }}
                    />
                    <Tooltip title={copied ? "Copied!" : "Copy to clipboard"}>
                        <IconButton
                            onClick={handleCopyKey}
                            color="primary"
                            disabled={!apiKey}
                        >
                            <CopyIcon />
                        </IconButton>
                    </Tooltip>
                    <Button
                        variant="outlined"
                        startIcon={<RefreshIcon />}
                        onClick={handleRefreshKey}
                    >
                        Refresh Key
                    </Button>
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                    Use this key to authenticate your API requests
                </Typography>
            </Paper>

            {/* Search and Filter Section */}
            <Box sx={{ mb: 4 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search countries..."
                    value={searchTerm}
                    onChange={handleSearch}
                    InputProps={{
                        startAdornment: (
                            <CountryIcon color="action" sx={{ mr: 1 }} />
                        ),
                    }}
                />
            </Box>

            {/* Content Section */}
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Alert severity="error" sx={{ mb: 4 }}>
                    {error}
                </Alert>
            ) : (
                <>
                    <Typography variant="subtitle1" sx={{ mb: 2 }}>
                        Showing {filteredCountries.length} countries
                    </Typography>

                    <Grid container spacing={4}>
                        {filteredCountries.map((country) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={country.cca3}>
                                <motion.div
                                    whileHover={{ scale: 1.03 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                        <Box
                                            component="img"
                                            src={country.flags.png}
                                            alt={country.name.common}
                                            sx={{
                                                width: '100%',
                                                height: 160,
                                                objectFit: 'cover',
                                                borderBottom: '1px solid rgba(0,0,0,0.12)'
                                            }}
                                        />
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography gutterBottom variant="h6" component="h2">
                                                {country.name.common}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                                <strong>Capital:</strong> {country.capital?.[0] || 'N/A'}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                                <strong>Population:</strong> {country.population.toLocaleString()}
                                            </Typography>
                                            <Box sx={{ mt: 1 }}>
                                                {country.currencies && Object.values(country.currencies).map(currency => (
                                                    <Chip
                                                        key={currency.name}
                                                        label={`${currency.name} (${currency.symbol || ''})`}
                                                        size="small"
                                                        sx={{ mr: 1, mb: 1 }}
                                                    />
                                                ))}
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}
        </Container>
    );
}