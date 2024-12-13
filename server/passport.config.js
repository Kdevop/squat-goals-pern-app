import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';
import bcrypt from 'bcrypt';
import pool from '../model/database.js';

function initialize(passport) {
    passport.use(new LocalStrategy(
        async (username, password, done) => {
            try {
                const findUser = await pool.query('SELECT * FROM user_customer WHERE email=$1', [username]);
                if (findUser.rows.length === 0) {
                    return done(null, false, { message: 'User not found' });
                }

                const passwordMatch = await bcrypt.compare(password, findUser.rows[0].password);
                if (passwordMatch) {
                    return done(null, {
                        id: findUser.rows[0].id,
                    });
                } else {
                    return done(null, false, { message: 'Incorrect password' });
                }
            } catch (error) {
                return done(error);
            }
        }
    ));

    // Serialize user
    passport.serializeUser((user, done) => {
        return done(null, user.id);
    });

    // Deserialize user
    passport.deserializeUser((id, done) => {
        pool.query('SELECT id, email FROM user_customer WHERE id = $1', [id], (error, result) => {
            if (error) { return done(error); }
            return done(null, result.rows[0].id);
        });
    });
};

// Check is user has a session
const isAuth = async (req, res, next) => {
    if(req.isAuthenticated()) {
        next();
    } else {
        res.status(401).json({ message: 'You are not authorised to view this route.' })
    }
}

export { initialize, isAuth };