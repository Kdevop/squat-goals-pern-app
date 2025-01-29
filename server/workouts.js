import express from 'express';
import { addWorkout, retrieveWorkouts, deleteWorkouts } from '../controllers/workouks.js';
import { isAuth } from './passport.config.js';
import { checkValidations, validateDeleteWorkouts, addWorkoutValidationRules, validateRetrieveWorkouts } from '../utils/validators.js';

const workoutsRouter = express.Router();
workoutsRouter.get('/:date/:id', isAuth, validateRetrieveWorkouts, checkValidations, retrieveWorkouts); 
workoutsRouter.post('/add', isAuth, addWorkoutValidationRules, checkValidations, addWorkout);
workoutsRouter.delete('/delete/:id', isAuth, validateDeleteWorkouts, checkValidations, deleteWorkouts);

export { workoutsRouter };