import { useState, useEffect } from 'react';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    TextField,
    CircularProgress,
    Avatar
} from '@mui/material';
import { getCountries, filterCountry } from '../../api';

export default function CountryList({ apiKey }) {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    //data fetching
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await getCountries(apiKey);
                setCountries(response.data);
            } catch (error) {
                console.error('Error fetching countries:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCountries();
    }, [apiKey]);

    //search functionality
    const handleSearch = async () => {
        if (!searchTerm) return;
        setLoading(true);
        try {
            const response = await filterCountry(searchTerm, apiKey);
            setCountries(response.data);
        } catch (error) {
            console.error('Error searching countries:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <CircularProgress />;

    return (
        <div>
            <TextField
                label="Search Country"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                sx={{ mb: 3, width: '100%' }}
            />

            <Grid container spacing={3}>
                {countries.map((country) => (
                    <Grid item xs={12} sm={6} md={4} key={country.cca3}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Avatar
                                src={country.flags.png}
                                alt={country.name.common}
                                variant="square"
                                sx={{ width: '100%', height: 140 }}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5">
                                    {country.name.common}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Capital: {country.capital?.[0] || 'N/A'}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Population: {country.population.toLocaleString()}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}