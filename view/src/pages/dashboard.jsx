// import dependencies
import React from 'react';
import Styles from './dashboard.module.css';

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

// mock data:
const data = [
    {
        "success": true,
        "hasData": true,
        "message": "data returned",
        "caloriesToday": 1900,
        "noWorkouts": 2,
        "weeklyCalories": 2950,
        "dailyCalories": [
            {
                "date": "12-09-2024",
                "totalCalories": 300
            },
            {
                "date": "12-10-2024",
                "totalCalories": 0
            },
            {
                "date": "12-11-2024",
                "totalCalories": 750
            },
            {
                "date": "12-12-2024",
                "totalCalories": 1900
            },
            {
                "date": "12-14-2024",
                "totalCalories": 0
            },
            {
                "date": "12-15-2024",
                "totalCalories": 0
            },
            {
                "date": "12-16-2024",
                "totalCalories": 0
            }
        ],
        "categoriesByWeek": [
            {
                "category": "Back",
                "totalTime": 30
            },
            {
                "category": "Legs",
                "totalTime": 15
            },
            {
                "category": "Shoulders",
                "totalTime": 65
            }
        ]
    }
]

const userExercises = [{
    "success": true,
    "data": [
        {
            "id": 1,
            "exercise_id": "1",
            "sets": "3",
            "reps": "3",
            "weight": "25",
            "duration": "30",
            "user_customer_id": "2",
            "date": "2024-12-11T00:00:00.000Z",
            "workout": "Lat Pulldown",
            "category": "Back"
        },
        {
            "id": 1,
            "exercise_id": "1",
            "sets": "3",
            "reps": "3",
            "weight": "25",
            "duration": "30",
            "user_customer_id": "2",
            "date": "2024-12-11T00:00:00.000Z",
            "workout": "Lat Pulldown",
            "category": "Back"
        },
        {
            "id": 1,
            "exercise_id": "1",
            "sets": "3",
            "reps": "3",
            "weight": "25",
            "duration": "30",
            "user_customer_id": "2",
            "date": "2024-12-11T00:00:00.000Z",
            "workout": "Lat Pulldown",
            "category": "Back"
        },
        {
            "id": 1,
            "exercise_id": "1",
            "sets": "3",
            "reps": "3",
            "weight": "25",
            "duration": "30",
            "user_customer_id": "2",
            "date": "2024-12-11T00:00:00.000Z",
            "workout": "Lat Pulldown",
            "category": "Back"
        },
        {
            "id": 1,
            "exercise_id": "1",
            "sets": "3",
            "reps": "3",
            "weight": "25",
            "duration": "30",
            "user_customer_id": "2",
            "date": "2024-12-11T00:00:00.000Z",
            "workout": "Lat Pulldown",
            "category": "Back"
        },
        {
            "id": 1,
            "exercise_id": "1",
            "sets": "3",
            "reps": "3",
            "weight": "25",
            "duration": "30",
            "user_customer_id": "2",
            "date": "2024-12-11T00:00:00.000Z",
            "workout": "Lat Pulldown",
            "category": "Back"
        },
        {
            "id": 1,
            "exercise_id": "1",
            "sets": "3",
            "reps": "3",
            "weight": "25",
            "duration": "30",
            "user_customer_id": "2",
            "date": "2024-12-11T00:00:00.000Z",
            "workout": "Lat Pulldown",
            "category": "Back"
        }
    ],
    "message": "Workouts for user and date returned"
}]
 
function Dashboard() {
    return (
        <div className={Styles.mainContainer}>
            <p className={Styles.title}>Dashboard</p>
            <div className={Styles.cardContainer}>
                <CalBurnToday data={data[0].caloriesToday} />
                <NoExercises data={data[0].noWorkouts} />
                <CalBurnLW data={data[0].weeklyCalories} />
            </div>
            <div className={Styles.dataContainer}>
                <CalorieBurnDay data={data[0].dailyCalories} />
                <WeekWorkoutCat data={data[0].categoriesByWeek} />
            </div>
            <p className={Styles.title}>Todays Workouts</p>
            <div className={Styles.exercisesContainer}>
                {userExercises[0].data.map((exercise, index) => (
                    <Exercises 
                        key={index}
                        category={exercise.category}
                        exercise={exercise.workout}
                        sets={exercise.sets}
                        reps={exercise.reps}
                        weight={exercise.weight}
                        duration={exercise.duration}
                    />
                ))}
            </div>
        </div>
    )
};

export default Dashboard;