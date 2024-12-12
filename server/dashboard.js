import express from 'express';
import { userDashboard } from '../controllers/dashboard.js';
import { isAuth } from './passport.config.js';

const dashboardRouter = express.Router();
dashboardRouter.get('/:id', isAuth, userDashboard);

export { dashboardRouter }; 