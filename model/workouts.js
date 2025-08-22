import pool from './database.js';

//add workouts
const userWorkouts = async (updates) => {
    // Destructure updates
    const { exercise_id, sets, reps, weight, duration, user_customer_id, date } = updates;

    // Query for inserting new workouts to the database
    const insertQuery = `
        INSERT INTO user_worksouts (exercise_id, sets, reps, weight, duration(mins), user_customer_id, date)
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;

    // Query for fetching all user workouts for date and id
    const fetchQuery = `
        SELECT uw.*, e.workout, wt.category
        FROM user_worksouts uw
        JOIN exercise e ON uw.exercise_id = e.id
        JOIN workout_type wt ON e.workout_type_id = wt.id
        WHERE uw.user_customer_id = $1
        AND uw.date = $2`;

    try {
        // Insert the new workout
        await pool.query(insertQuery, [exercise_id, sets, reps, weight, duration, user_customer_id, date]);

        // Fetch all workouts for the user on the specified date
        const result = await pool.query(fetchQuery, [user_customer_id, date]);

        // Manage responses from the database
        if (result.rows.length === 0) {
            return { error: true, message: 'Adding to workout failed, please try again later.' };
        }

        // Return all workouts for the user on the specified date
        return { error: false, message: 'Workout added to calendar', data: result.rows };

    } catch (error) {
        return { error: true, message: error.message };
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
            return {error: false, hasWorkouts: false, data: false, message: 'There are no workouts for that day'};
        }

        // response if there are workouts on set date
        return {error: false, hasWorkouts: true, data: result.rows, message: 'Workouts for user and date returned'};
    } catch (error) {
        return {error: true, message: error.message};
    }
};

const removeWorkout = async (id, userId) => {
    // query for databse
    const query = `DELETE FROM user_worksouts WHERE id = $1 AND user_customer_id = $2`;

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
