// adding the below to testing github oauth login
import https from 'https';
https.globalAgent.options.rejectUnauthorized = false;

// Dependencies
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import helmet from 'helmet';
import cors from 'cors';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import passport from 'passport';
import { initialize } from './server/passport.config.js';
import pool from './model/database.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Route imports
import { userRouter } from './server/users.js';
import { dashboardRouter } from './server/dashboard.js';
import { workoutsRouter } from './server/workouts.js';
import { accountRouter } from './server/account.js';

// Server setup
const PORT = process.env.PORT || 3001;
const app = express();

// Required for static pages
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('trust proxy', 1);

// Enabling middleware
app.use(helmet());
app.use(cors({ origin: 'squat-goals-pern-app.onrender.com', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
const buildPath = path.join(__dirname, 'view/build');
app.use(express.static(buildPath));

// Passport session setup
initialize(passport);
app.use(passport.initialize());

const pgSession = connectPgSimple(session);
//const SESS_LIFETIME = process.env.SESS_LIFETIME || 1000 * 60 * 60 * 2; // Default to 2 hours if not set
// Number(process.env.SESS_LIFETIME)

app.use(
    session({
        store: new pgSession({
            pool: pool,
        }),
        name: process.env.SESS_NAME,
        resave: false,
        saveUninitialized: false,
        secret: process.env.SESS_SECRET,
        cookie: {
            maxAge: 1000*60*60*24, 
            secure: true,
            httpOnly: true,
            sameSite: 'lax',
            domain: "squat-goals-pern-app.onrender.com",
        }
    })
);

app.use(passport.session());

// API Routes
app.use('/api/users', userRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/workouts', workoutsRouter);
app.use('/api/account', accountRouter);

// Fallback to index.html for client-side routing
app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

// App is listening on port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});