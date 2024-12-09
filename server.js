//dependencies
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

//Route imports
import { userRouter } from './server/users.js';
import { dashboardRouter } from './server/dashboard.js';
import { workoutsRouter } from './server/workouts.js';
import { accountRouter } from './server/account.js';

//server set up
const app = express();
const port = 3000;

// Required for static pages
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// enabling Helmet middleware
app.use(helmet());

// enabling cors middleware
app.use(cors());

//Initial .get to check server running.
app.get('/api/test', (req, res) => {
    console.log('Recieved request for /api/test')
    res.send('Hello Kiernan :)');
});

// Serve static files
const buildPath = path.join(__dirname, 'view/build');
app.use(express.static(buildPath));

// API Routes
// User Route
app.use('/api/users', userRouter);

// Dashboard Route
app.use('/api/dashboard', dashboardRouter);

// Workout Route
app.use('/api/workouts', workoutsRouter);

// Account Route
app.use('/api/account', accountRouter);

//App is listening on port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

