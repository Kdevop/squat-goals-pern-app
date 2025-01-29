import express from 'express';
import { userDashboard } from '../controllers/dashboard.js';
import { isAuth } from './passport.config.js';
import { dashboardValidationsRules, checkValidationDashboard } from '../utils/validators.js';

const dashboardRouter = express.Router();
dashboardRouter.get('/:id', isAuth, dashboardValidationsRules, checkValidationDashboard, userDashboard);

export { dashboardRouter }; 