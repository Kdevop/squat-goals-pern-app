// Import reducers
import authReducer from './authSlice';
import workoutsReducer from './workoutSlice';
import accountReducer from './accountSlice';

const reducer = {
    auth: authReducer,
    workouts: workoutsReducer,
    account: accountReducer,
};

export default reducer;



