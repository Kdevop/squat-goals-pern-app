// import dependencies
import React, { useState, useEffect } from 'react';
import Styles from './workouts.module.css'
import AddWorkout from '../components/workouts/addWorkout.jsx';
import Exercises from '../components/cards/exercises';
import { DateCalendar } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux'; 

// import helpers and store (redux)
import { getUserWorkouts, userWorkouts } from '../store/workoutSlice.js';
import { user } from '../store/authSlice';

function Workouts() {
    // state for data
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [wData, setWData] = useState(null);
    const [wDataError, setWDataError] = useState(false);

    // dependencies
    const dispatch = useDispatch();
    const id = useSelector(user);
    const exercises = useSelector(userWorkouts);

    // Handle date change from the calendar
    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
    };

    // use effect to dispatch request for user workouts for selected date. 
    useEffect(() => {
        const userId = id;

        const details = {
            date: selectedDate,
            id: userId
        };

        const fetchData = async () => {
            try {

                await dispatch(getUserWorkouts(details));

            } catch (error) {
                console.error('Error fetching data for exercises: ', error);
                setWDataError(true);
            }
        };

        fetchData();
    }, [selectedDate]);

    // use effect for updating the data in wData when the userWorkouts is updated.
    useEffect(() => {
        if (exercises) {
            setWData(exercises);

        } else {
            setWData(false);
        }
    }, [exercises]);

    if (wDataError) {
        return (
            <div className={Styles.mainContainer}>
                <p className={Styles.title}>Workouts</p>
                <div>
                    <p>Sorry there seems to be on error. Please try again later.</p>
                </div>
            </div>
        )
    }

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
            {wData && wData.length > 0 ? (
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
                            date={selectedDate}
                            id={exercise.id}
                        />
                    ))}
                </div>
            ) : (
                <div className={Styles.cardContainer}>
                    <p>No exercises planned for selected date.</p>
                </div>
            )}
        </div>
    )
};

export default Workouts;