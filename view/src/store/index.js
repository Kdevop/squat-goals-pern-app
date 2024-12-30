// Import reducers
import authReducer from './authSlice';
import workoutsReducer from './workoutSlice';

const reducer = {
    auth: authReducer,
    workouts: workoutsReducer,
};

export default reducer;



