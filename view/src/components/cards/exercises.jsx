// import dependencies
import React from 'react';
import Styles from './exercises.module.css';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import TimelapseIcon from '@mui/icons-material/Timelapse';

function Exercises(props) {
  return (
    <div className={Styles.mainContainer}>
      <p className={Styles.title}>{props.category}</p>
      <p className={Styles.exercise}>{props.exercise}</p>
      <p className={Styles.details}>Count: {props.sets} sets x {props.reps} reps</p>
      <div className={Styles.detailsContainer}>
        <div className={Styles.weightContainer}>
          <FitnessCenterIcon />
          <p className={Styles.details}>{props.weight} kg</p>
        </div>
        <div className={Styles.timeContainer}>
          <TimelapseIcon />
          <p className={Styles.details}>{props.duration} mins</p>
        </div>
      </div>
    </div>
  )
};

export default Exercises;