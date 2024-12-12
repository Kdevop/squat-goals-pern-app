import { retrieveDashboard } from "../model/dashboard.js";
import { calculateCalories, convertDate } from "../utils/helpers.js";

const userDashboard = async (req, res) => {
    // get user id from the query params;
    const id = req.params.id;

    // check that the user id matches the session
    if (id != req.session.passport.user) {
        return res.status(403).json({ success: false, message: 'Unauthorised access' });
    }

    // collect data from database
    // sort dates to get prior weeks data
    const date = new Date();

    // Helper function to format numbers to two digits
    const formatTwoDigits = (num) => num.toString().padStart(2, '0');

    // date for current day
    const today = `${formatTwoDigits(date.getMonth() + 1)}-${formatTwoDigits(date.getDate())}-${date.getFullYear()}`;

    // date for past week
    const priorWeekDate = new Date(date);
    priorWeekDate.setDate(date.getDate() - 6);
    const weekPrior = `${formatTwoDigits(priorWeekDate.getMonth() + 1)}-${formatTwoDigits(priorWeekDate.getDate())}-${priorWeekDate.getFullYear()}`;

    // send request for data to model with date range
    const result = await retrieveDashboard(id, today, weekPrior);

    // manage responses from the model error or no data
    if (result.error) {
        return res.status(500).json({ success: false, message: result.message })
    }

    if (!result.hasData) {
        return res.status(200).json({ success: true, hasData: result.hasData, message: result.message, data: result.data })
    }

    // DELETE: Early test to retreiving data from the database: DELETE WHEN DONE
    //return res.status(200).json({success: true, hasData: result.hasData, message: result.message, data: result.data})

    // convert dates in the result data to MM-DD-YYYY format BRING BACK ONCE TEST DONE
    result.data.forEach(workout => {
        workout.date = convertDate(workout.date);
    });

    // process request when data available
    // calories burned today
    const todaysWorkouts = result.data.filter(workout => workout.date === today);
    const totalCaloriesToday = todaysWorkouts.reduce((total, workout) => {
        return total + calculateCalories(workout);
    }, 0);

    // no. of workouts today
    const workoutsToday = result.data.filter(workout => workout.date === today);
    const NoWorkouts = workoutsToday.length;

    // total calories burned last week
    const totalCaloriesWeek = result.data.reduce((total, workout) => {
        return total + calculateCalories(workout);
    }, 0);

    // over past week, how many calories burned on each day.
    // Group workouts by date and calculate total calories for each day
    const caloriesByDate = result.data.reduce((acc, workout) => {
        const workoutDate = workout.date;
        if (!acc[workoutDate]) {
            acc[workoutDate] = 0;
        }
        acc[workoutDate] += calculateCalories(workout);
        return acc;
    }, {});

    // Convert the result to an array of objects with date and total calories
    const caloriesPerDay = Object.entries(caloriesByDate).map(([date, totalCalories]) => ({
        date,
        totalCalories
    }));

    // Workout categories over the past week.
    // Calculate total time spent on each category of workout
    const timeByCategory = result.data.reduce((acc, workout) => {
        const category = workout.category;
        const duration = parseFloat(workout.duration); // Ensure duration is a number

        if (!acc[category]) {
            acc[category] = 0; // Initialize category total time to 0
        };

        acc[category] += duration;
        return acc;
    }, {});

    // Convert the result to an array of objects with category and total time
    const timePerCategory = Object.entries(timeByCategory).map(([category, totalTime]) => ({
        category,
        totalTime
    }));

    return res.status(200).json({
        success: true, 
        hasData: result.hasData,
        message: result.message, 
        caloriesToday: totalCaloriesToday,
        noWorkouts: NoWorkouts,
        weeklyCalories: totalCaloriesWeek,
        dailyCalories: caloriesPerDay,
        categoriesByWeek: timePerCategory
    })
};

export { userDashboard };