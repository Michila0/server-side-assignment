const db = require('../dao/initDB');

exports.changeRole = (req, res) => {
    const { email, role } = req.body;
    db.run('UPDATE users SET role = ? WHERE email = ?', [role, email], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Role updated' });
    });
};

exports.deleteUser = (req, res) => {
    const { email } = req.body;
    db.run('DELETE FROM users WHERE email = ?', [email], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'User deleted' });
    });
};

exports.getUsage = (req, res) => {
    db.all('SELECT email, apiKeyUsage, lastUsed FROM users', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

exports.getUsers = (req, res) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};