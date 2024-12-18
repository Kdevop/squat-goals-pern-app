// import dependencies
import React from 'react';
import Styles from './cardstyle.module.css';

function CalBurnToday(props) {
    return (
        <div className={Styles.cardContainer}>
            <p className={Styles.title}>Calories Burned</p>
            <div className={Styles.contentContainer}>
                <p>{props.data}</p>
                <p>kcal</p>
            </div>
            <p className={Styles.description}>Total calories burned today</p>
        </div>
    )
};

export default CalBurnToday;