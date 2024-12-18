// import dependencies
import React from 'react';
import Styles from './cardstyle.module.css';


function CalBurnLW(props) {
    return (
        <div className={Styles.cardContainer}>
            <p className={Styles.title}>Total Calories Burned</p>
            <div className={Styles.contentContainer}>
                <p>{props.data}</p>
                <p>kcal</p>
            </div>
            <p className={Styles.description}>Total calories burned this week</p>
        </div>
    )
};

export default CalBurnLW;