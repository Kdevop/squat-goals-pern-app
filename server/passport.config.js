import dotenv from 'dotenv';
dotenv.config();
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GitHubStrategy } from 'passport-github2';
import passport from 'passport';
import bcrypt from 'bcrypt';
import pool from '../model/database.js';


function initialize(passport) {
    // local strategy
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
 
    //github strategy
    passport.use(new GitHubStrategy({
        // properties
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: 'https://squat-goals-pern-app.onrender.com/api/users/auth/github/callback',
        scope: ['user:email', 'read:user'],
    },
        async (accessToken, refreshToken, profile, done) => {
            // see if the user has logged in this way before and has an account
            try {
                const findUser = await pool.query('SELECT * FROM federated_credentials WHERE subject=$1', [profile.id]);
                // if user found, return the user
                if (findUser.rows.length > 0) {
                    return done(null, {id: findUser.rows[0].user_customer_id});
                } else {
                    // if the user was not found add them to the database
                    const newUser = await pool.query(
                        'INSERT INTO user_customer (email, name, password, account) VALUES ($1, $2, $3, $4) RETURNING *',
                        [profile.emails[0].value, profile.username, false, false]
                    );

                    await pool.query(
                        'INSERT INTO federated_credentials (user_customer_id, provider, subject) VALUES ($1, $2, $3) ',
                        [newUser.rows[0].id, profile.provider, profile.id]
                    )
                    // return the new user
                    return done(null, {id: newUser.rows[0].id})
                }

            } catch (error) {
                return done(error);
            }
        }
    )
    )

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
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).json({ message: 'You are not authorised to view this route.' })
    }
}

export { initialize, isAuth };