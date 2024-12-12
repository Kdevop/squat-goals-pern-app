import pool from './database.js';

//add workouts
const userWorkouts = async (updates) => {
    //destructor updates
    const { exercise_id, sets, reps, weight, duration, user_customer_id, date } = updates;

    //query for database
    const query = `INSERT INTO user_workouts (exercise_id, sets, reps, weight, duration, user_customer_id, date) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;

    //query the database
    try{
        const result = await pool.query(query, [exercise_id, sets, reps, weight, duration, user_customer_id, date]);

        //manage responses from the database.
        if(result.rows.length === 0) {
            return {error: true, message: 'Adding to workout failed, please try again later.'};
        }

        return {error: false, message: 'Workout added to calendar', data: result.rows[0]};

    } catch (error) {
        return {error: true, message: error.message};
    }
};

const workouts = async (date, id) => {
    // query for database
    const query = `SELECT uw.*, e.workout, wt.category
        FROM user_workouts uw
        JOIN exercise e ON uw.exercise_id = e.id
        JOIN workout_type wt ON e.workout_type_id = wt.id
        WHERE uw.user_customer_id = $1
        AND uw.date = $2`;
     

    // query the database
    try{
        const result = await pool.query(query, [id, date]);

        // response if there are no workouts on set date
        if(result.rows.length === 0) {
            return {error: false, hasWorkouts: false, message: 'There are no workouts for that day'};
        }

        // response if there are workouts on set date
        return {error: false, hasWorkouts: true, data: result.rows, message: 'Workouts for user and date returned'};
    } catch (error) {
        return {error: true, message: error.message};
    }
};

const removeWorkout = async (id, userId) => {
    // query for databse
    const query = `DELETE FROM user_workouts WHERE id = $1 AND user_customer_id = $2`;

    // query the database
    try{
        const result = await pool.query(query, [id, userId]);

        // manage response from database
        return {error: false, data: result.rows, message: 'workouts removed'};
    } catch (error) {
        return {error: true, message: error.message};
    }
}

export { userWorkouts, workouts, removeWorkout };
