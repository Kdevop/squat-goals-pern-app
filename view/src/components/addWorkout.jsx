// import dependencies
import React, { useState } from 'react';
import Styles from './addWorkout.module.css';


function AddWorkout(props) {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [exercises, setExercises] = useState([]);

    const categoryOptions = [
        { value: '1', label: 'Back' },
        { value: '2', label: 'Legs' },
        { value: '3', label: 'Shoulders' },
        { value: '4', label: 'Chest' },
        { value: '5', label: 'Core' }
    ];

    const exerciseOptions = {
        '1': ['Pull-up', 'Lat Pulldown'],
        '2': ['Squat', 'Lunge'],
        '3': ['Shoulder Press', 'Lateral Raise'],
        '4': ['Bench Press', 'Push-up'],
        '5': ['Plank', 'Crunch']
    };

    const handleCategoryChange = (event) => {
        const category = event.target.value;
        setSelectedCategory(category);
        setExercises(exerciseOptions[category] || []);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
    }

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