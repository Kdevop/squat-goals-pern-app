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

const loginUser = async (req, res, next) => {
    passport.authenticate('local', async (err, user, info) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (!user) {
            return res.status(401).json({ message: info.message })
        }
        req.login(user, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Login failed' });
            }
            return res.status(200).json({ user: user.id });
        });
    })(req, res, next);
};

const githubCallback = async (req, res, next) => {
    passport.authenticate('github', (err, user, info) => {
        if(err) {
            console.log('Authentication error', err)
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        req.login(user, (err) => {
            if(err) {
                return res.status(500).json({ error: 'Login failed' });
            }

            return res.redirect('https://squat-goals-pern-app.onrender.com/');
        });
    })(req, res, next);
};

const logoutUser = async (req, res, next) => { 
    req.logout((err) => {
        if (err) {
            return next(err);
        }

        //Destroy the session
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session', err);
                return next(err);
            }
        })

        //Clear the cookie
        res.clearCookie('sportapp2025', {
            path: '/',
            domain: 'localhost',
        });

        res.status(200).json({ success: true, message: 'Logged out' });

    });
};

const checkSession = (req, res) => {
    res.status(200).json({ user: req.session.passport.user })
};

export { registerUser, logoutUser, loginUser, checkSession, githubCallback };