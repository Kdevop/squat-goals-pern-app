// import dependencies
import React, { useEffect, useState } from 'react';
import Styles from './dashboard.module.css';
import { dashboardData } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';

// import components
// cards for top section of dashboard
import CalBurnToday from '../components/cards/calBurnToday';
import NoExercises from '../components/cards/noexercises';
import CalBurnLW from '../components/cards/calBurnLW';
// components for bar and pie chart data.
import CalorieBurnDay from '../components/calBurnDay';
import WeekWorkoutCat from '../components/weekWorkoutCat';
// exercise card for that days workouts
import Exercises from '../components/cards/exercises';

// import helpers and store (redux)
import { getFormattedDate } from '../../utils/index.js';
import { getUserWorkouts, userWorkouts } from '../store/workoutSlice.js';
import { user } from '../store/authSlice';
 
//mock data:
// const userExercises = [{
//     "success": true,
//     "data": [
//         {
//             "id": 1,
//             "exercise_id": "1",
//             "sets": "3",
//             "reps": "3",
//             "weight": "25",
//             "duration": "30",
//             "user_customer_id": "2",
//             "date": "2024-12-11T00:00:00.000Z",
//             "workout": "Lat Pulldown",
//             "category": "Back"
//         },
//         {
//             "id": 1,
//             "exercise_id": "1",
//             "sets": "3",
//             "reps": "3",
//             "weight": "25",
//             "duration": "30",
//             "user_customer_id": "2",
//             "date": "2024-12-11T00:00:00.000Z",
//             "workout": "Lat Pulldown",
//             "category": "Back"
//         },
//         {
//             "id": 1,
//             "exercise_id": "1",
//             "sets": "3",
//             "reps": "3",
//             "weight": "25",
//             "duration": "30",
//             "user_customer_id": "2",
//             "date": "2024-12-11T00:00:00.000Z",
//             "workout": "Lat Pulldown",
//             "category": "Back"
//         },
//         {
//             "id": 1,
//             "exercise_id": "1",
//             "sets": "3",
//             "reps": "3",
//             "weight": "25",
//             "duration": "30",
//             "user_customer_id": "2",
//             "date": "2024-12-11T00:00:00.000Z",
//             "workout": "Lat Pulldown",
//             "category": "Back"
//         },
//         {
//             "id": 1,
//             "exercise_id": "1",
//             "sets": "3",
//             "reps": "3",
//             "weight": "25",
//             "duration": "30",
//             "user_customer_id": "2",
//             "date": "2024-12-11T00:00:00.000Z",
//             "workout": "Lat Pulldown",
//             "category": "Back"
//         },
//         {
//             "id": 1,
//             "exercise_id": "1",
//             "sets": "3",
//             "reps": "3",
//             "weight": "25",
//             "duration": "30",
//             "user_customer_id": "2",
//             "date": "2024-12-11T00:00:00.000Z",
//             "workout": "Lat Pulldown",
//             "category": "Back"
//         },
//         {
//             "id": 1,
//             "exercise_id": "1",
//             "sets": "3",
//             "reps": "3",
//             "weight": "25",
//             "duration": "30",
//             "user_customer_id": "2",
//             "date": "2024-12-11T00:00:00.000Z",
//             "workout": "Lat Pulldown",
//             "category": "Back"
//         }
//     ],
//     "message": "Workouts for user and date returned"
// }]

function Dashboard() {
    // state for data
    const [dDataError, setDDataError] = useState(false);
    const [wDataError, setWDataError] = useState(false);
    const [dData, setDData] = useState(null);
    const [wData, setWData] = useState(null);

    // dependencies
    const dispatch = useDispatch();
    const userId = useSelector(user);
    const exercises = useSelector(userWorkouts);

    // useEffect to get dashboardData
    useEffect(() => {
        
        const fetchData = async () => {
            try {
                const data = await dashboardData(userId);

                if (data) {
                    setDData(data);

                } else {
                    setDDataError(true);
                }
            } catch (error) {
                console.error('Error fetching data: ', error);
                setDDataError(true);
            }
        };

        fetchData();
    }, []);

    // useEffect to get workouts
    useEffect(() => {
        const todayDate = getFormattedDate();

        console.log('This is todays date: ', todayDate);

        const details = {
            date: todayDate,
            id: userId
        };

        const fetchData = async () => {
            try {
                // const data = 
                await dispatch(getUserWorkouts(details));

                // if (data) {
                //     setWData(exercises);
                //     console.log(wData);
                // } else {
                //     setWDataError(true);
                // }
            } catch (error) {
                console.error('Error fetching data for exercises: ', error);
                setWDataError(true);
            }
        }; 

        fetchData();
    }, []);

    useEffect(() => {
        if(exercises) {
            setWData(exercises);
        }
    },[exercises])

    return (
        <div className={Styles.mainContainer}>
            <p className={Styles.title}>Dashboard</p>
            {dData ? (
                <>
                    <div className={Styles.cardContainer}>
                        <CalBurnToday data={dData.caloriesToday} />
                        <NoExercises data={dData.noWorkouts} />
                        <CalBurnLW data={dData.weeklyCalories} />
                    </div>
                    <div className={Styles.dataContainer}>
                        <CalorieBurnDay data={dData.dailyCalories} />
                        <WeekWorkoutCat data={dData.categoriesByWeek} />
                    </div>
                </>
            ) : (
                <div className={Styles.cardContainer}>
                    <p>Data coming</p>
                </div>
            )}
            <p className={Styles.title}>Today's Workouts</p>
            {wData ? (
                <div className={Styles.exercisesContainer}>
                    {wData.map((exercise) => (
                        <Exercises
                            key={exercise.id}
                            category={exercise.category}
                            exercise={exercise.workout}
                            sets={exercise.sets}
                            reps={exercise.reps}
                            weight={exercise.weight}
                            duration={exercise.duration}
                        />
                    ))}
                </div>
            ) : (
                <div className={Styles.cardContainer}>
                    <p>Data coming</p>
                </div>
            )}
        </div>
    );
};

export default Dashboard;