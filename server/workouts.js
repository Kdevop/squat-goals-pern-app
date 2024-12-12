import express from 'express';
import { addWorkout, retrieveWorkouts, deleteWorkouts } from '../controllers/workouks.js';
import { isAuth } from './passport.config.js';

const workoutsRouter = express.Router();
workoutsRouter.get('/:date/:id', isAuth, retrieveWorkouts);
workoutsRouter.post('/add', isAuth, addWorkout);
workoutsRouter.delete('/delete/:id', isAuth, deleteWorkouts);

export { workoutsRouter };