import { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Select,
    MenuItem,
    Button
} from '@mui/material';
import { changeRole, deleteUser, getUsageStats, getAllUsers } from '../api';

export default function AdminPanel() {
    const [users, setUsers] = useState([]);
    const [usageStats, setUsageStats] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersResponse = await getAllUsers();
                const statsResponse = await getUsageStats();
                setUsers(usersResponse.data);
                setUsageStats(statsResponse.data);
            } catch (error) {
                console.error('Error fetching admin data:', error);
            }
        };
        fetchData();
    }, []);

    const handleRoleChange = async (email, newRole) => {
        try {
            await changeRole({ email, role: newRole });
            setUsers(users.map(user =>
                user.email === email ? { ...user, role: newRole } : user
            ));
        } catch (error) {
            console.error('Error changing role:', error);
        }
    };

    const handleDeleteUser = async (email) => {
        try {
            await deleteUser({ email });
            setUsers(users.filter(user => user.email !== email));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>Admin Panel</Typography>

            <Typography variant="h5" sx={{ mt: 4 }}>User Management</Typography>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.email}>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user.email, e.target.value)}
                                    >
                                        <MenuItem value="admin">Admin</MenuItem>
                                        <MenuItem value="user">User</MenuItem>
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        color="error"
                                        onClick={() => handleDeleteUser(user.email)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Typography variant="h5" sx={{ mt: 4 }}>API Usage Statistics</Typography>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Email</TableCell>
                            <TableCell>API Calls</TableCell>
                            <TableCell>Last Used</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {usageStats.map((stat) => (
                            <TableRow key={stat.email}>
                                <TableCell>{stat.email}</TableCell>
                                <TableCell>{stat.apiKeyUsage}</TableCell>
                                <TableCell>{stat.lastUsed || 'Never'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}