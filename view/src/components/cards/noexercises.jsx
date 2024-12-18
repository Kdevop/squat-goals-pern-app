// import dependencies
import React from 'react';
import Styles from './cardstyle.module.css';

function NoExercises(props) {
    return (
        <div className={Styles.cardContainer}>
            <p className={Styles.title}>Exercises</p>
            <div className={Styles.contentContainer}>
                <p>{props.data}</p>
            </div>
            <p className={Styles.description}>Total no. of exercises today</p>
        </div>
    )
};

export default NoExercises;