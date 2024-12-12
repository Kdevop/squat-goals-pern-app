import { userWorkouts, workouts, removeWorkout } from "../model/workouts.js";

const addWorkout = async (req, res) => {
    
    //get the details from the body of the request
    let workout = req.body;
    const {exercise_id, sets, reps, weight, duration, user_customer_id, date} = workout;

    //confirm the session matches the id in the request.
    const id = user_customer_id;
    if(id != req.session.passport.user) {
        return res.status(403).json({ success: false, message: 'Unauthorised access'});
    }

    // check all details are present.
        if(!exercise_id || !sets || !reps || !weight || !duration || !user_customer_id || !date) {
        return res.status(400).json({ success: false, message: 'All details are required' });
    };

    //send to the model
    const result = await userWorkouts(workout);

    //manage the response from the model
    if(result.error) {
        return res.status(500).json({ success: false, message: result.message });
    }

    return res.status(200).json({ success: true, message: result.message, data: result.data });
};

const retrieveWorkouts = async (req, res) => {
    // retrieve the data from the query params
    // NOTE data for the query needs to be in american format MM-DD-YYYY the view will need to manage this.
    const date = req.params.date;
    const id = req.params.id;

    // check that the session matches the id in the request
    if(id != req.session.passport.user) {
        return res.status(403).json({ success: false, message: 'Unauthorised access'});
    }

    // send to the model
    const result = await workouts(date, id);

    // manage response from the model
    if(result.error) {
        return res.status(500).json({ suucess: false, message: result.message });
    }

    return res.status(200).json({ success: true, data: result.data, message: result.message });
};

const deleteWorkouts = async (req, res) => {
    // retrieve ID from query params
    const id = req.params.id;
    const userId = req.body.userId;

    // check that the session matches the ID in the request
    if(userId != req.session.passport.user) {
        return res.status(403).json({ success: false, message: 'Unauthorised access'});
    }

    // send to the model
    const result = await removeWorkout(id, userId);

    // manage response from the model
    if(result.error) {
        return res.status(500).json({ success: false, message: result.message });
    }

    return res.status(200).json({ success: true, message: result.message });
}

export { addWorkout, retrieveWorkouts, deleteWorkouts };