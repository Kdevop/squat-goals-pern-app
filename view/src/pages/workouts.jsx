// import dependencies
import React, { useState, useEffect } from 'react';
import Styles from './workouts.module.css'
import SelectDate from '../components/selectDate';
import AddWorkout from '../components/addWorkout';
import Exercises from '../components/cards/exercises';
import { DateCalendar } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// mock data for exercises
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

function Workouts() {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
        console.log('Selected date: ', newDate);
        //console.log('Date in state OLD, ', selectedDate);
    };

    useEffect(() => {
        console.log('Date in state: ', selectedDate)
    }, [selectedDate])

    return (
        <div className={Styles.mainContainer}>
            <p className={Styles.heading}>Workouts</p>
            <div className={Styles.add_date_container}>
                <div className={Styles.add_date_child}>
                    <p className={Styles.title}>Select Date</p>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar value={selectedDate} onChange={handleDateChange} />
                    </LocalizationProvider>
                </div>
                <div className={Styles.add_date_child}>
                    <p className={Styles.title}>Add Workout</p>
                    <AddWorkout date={selectedDate} />
                </div>
            </div>
            <p className={Styles.heading}>Planned Workouts</p>
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

export default Workouts;