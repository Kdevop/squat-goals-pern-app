import bcrypt from 'bcrypt';
import pool from '../model/database.js';
import passport from 'passport';

const registerUser = async (req, res) => {
    const { password, email, name } = req.body;

    if (!password || !email || !name) {
        return res.status(400).json({ success: false, message: 'All fields required.' });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const account = false;

        // Insert user into the database
        const result = await pool.query(
            'INSERT INTO user_customer (email, name, password, account) VALUES ($1, $2, $3, $4) RETURNING id',
            [email, name, hashedPassword, account]
        );

        const user = { id: result.rows[0].id, email, name };

        // Log the user in
        req.login(user, (err) => {
            if (err) {
                console.error('Error logging in user:', err);
                return res.status(500).json({ success: false, message: 'Internal server error.' });
            }
            return res.status(201).json({ success: true, userId: user.id });
        });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

export { registerUser };