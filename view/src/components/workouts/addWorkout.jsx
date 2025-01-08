// import dependencies
import React, { useState } from 'react';
import Styles from './addWorkout.module.css';
import { useDispatch, useSelector } from 'react-redux';

// import helpers and store(redux)
import { user } from '../../store/authSlice.js';
import { addWorkouts } from '../../store/workoutSlice.js';


function AddWorkout(props) {
    // site state
    const [selectedCategory, setSelectedCategory] = useState('');
    const [exercises, setExercises] = useState([]);

    // date from props
    let date = props.date;
    // format date?


    // dependencies
    const id = useSelector(user);
    const dispacth = useDispatch();

    // category options
    const categoryOptions = [
        { value: '1', label: 'Back' },
        { value: '2', label: 'Legs' },
        { value: '3', label: 'Shoulders' },
        { value: '4', label: 'Chest' },
        { value: '5', label: 'Core' }
    ];

    // exercise options against category
    const exerciseOptions = {
        '1': ['Row', 'Lat Pulldown'],
        '2': ['Squat', 'Lunge'],
        '3': ['Shoulder Press', 'Lateral Raise'],
        '4': ['Bench Press', 'Fly'],
        '5': ['Situp', 'Crunch']
    };

    // Map of exercises against ID's.
    const exerciseIdMap = {
        'Lat Pulldown': 1,
        'Row': 2,
        'Squat': 3,
        'Deadlift': 4,
        'Shoulder Press': 5,
        'Lateral Raise': 6,
        'Bench Press': 7,
        'Fly': 8,
        'Situp': 9,
        'Crunch': 10
    };

    // amend state to update form options based on category selected
    const handleCategoryChange = (event) => {
        const category = event.target.value;
        setSelectedCategory(category);
        setExercises(exerciseOptions[category] || []);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        // get the exercise id from the exercise name
        const selectedExercise = formData.get('exercise');
        const exerciseId = exerciseIdMap[selectedExercise];

        console.log('Exercise ID:', exerciseId);

        // create object of form data
        const formDataObject = {};
        for (let [key, value] of formData.entries()) {
            formDataObject[key] = value;
        };

        // Prepare the data to be dispatched
        const updates = {
            exercise_id: exerciseId,
            sets: formDataObject.sets,
            reps: formDataObject.reps,
            weight: formDataObject.weight,
            duration: formDataObject.time,
            user_customer_id: id,
            date: date
        }

        console.log(date);
        console.log(formDataObject);
        console.log(updates);

        // send request to the store
        const sendData = async () => {
            try {
                await dispacth(addWorkouts(updates));
            } catch (error) {
                console.log('Error dispatching addWorkout: ', error);
            }
        }

        sendData();
    };

    return (
        <div>
            <form className={Styles.form_container} onSubmit={onSubmit}>
                <div className={Styles.item_container}>
                    <label htmlFor="category">Category</label>
                    <select id="category" name="category" value={selectedCategory} onChange={handleCategoryChange} required>
                        <option value="" disabled>Select a category</option>
                        {categoryOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
                <div className={Styles.item_container}>
                    <label htmlFor="exercise">Exercise</label>
                    <select id="exercise" name="exercise" disabled={!selectedCategory} required>
                        <option value="" disabled>Select an exercise</option>
                        {exercises.map((exercise, index) => (
                            <option key={index} value={exercise}>{exercise}</option>
                        ))}
                    </select>
                </div>
                <div className={Styles.sets_reps_container}>
                    <div className={Styles.item_container}>
                        <label htmlFor="sets">Sets</label>
                        <select id="sets" name="sets">
                            <option value="1">1</option>
                            <option value="3">3</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div className={Styles.item_container}>
                        <label htmlFor="reps">Reps</label>
                        <select id="reps" name="reps">
                            <option value="1">1</option>
                            <option value="3">3</option>
                            <option value="5">6</option>
                            <option value="10">10</option>
                            <option value="12">12</option>
                        </select>
                    </div>
                </div>
                <div className={Styles.item_container}>
                    <label htmlFor="weight">Weight</label>
                    <select id="weight" name="weight" >
                        <option value='10'>10kg</option>
                        <option value='20'>20kg</option>
                        <option value='30'>30kg</option>
                        <option value='40'>40kg</option>
                        <option value='50'>50kg</option>
                        <option value='75'>75kg</option>
                        <option value='100'>100kg</option>
                    </select>
                </div>
                <div className={Styles.item_container}>
                    <label htmlFor="time">Time</label>
                    <select id="time" name="time">
                        <option value="10">10 mins</option>
                        <option value="20">20 mins</option>
                        <option value="30">30 mins</option>
                        <option value="40">40 mins</option>
                        <option value="50">50 mins</option>
                        <option value="60">60 mins</option>
                    </select>
                </div>
                <button className={Styles.submit} type='submit'>Submit</button>
            </form>
        </div>
    );
};

export default AddWorkout;