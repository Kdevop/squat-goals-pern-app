import pool from '../model/database.js';

const retrieveDashboard = async (id, today, weekPrior) => {
    // query the database
    const query = `SELECT uw.*, e.workout, wt.category, wt.id AS category_id
        FROM user_workouts uw
        JOIN exercise e ON uw.exercise_id = e.id
        JOIN workout_type wt ON e.workout_type_id = wt.id
        WHERE uw.user_customer_id = $1
        AND uw.date BETWEEN $2 AND $3;`;
 
    // query the database
    try {
        const result = await pool.query(query, [id, weekPrior, today]);

        // manage responses from the database
        if (result.rows.length === 0) {
            return { error: false, hasData: false, message: 'No workouts for the past week', data: result.rows };
        }

        return { error: false, hasData: true, message: 'data returned', data: result.rows };
    } catch (error) {
        return { eroor: true, message: error.message }
    }

}

export { retrieveDashboard };