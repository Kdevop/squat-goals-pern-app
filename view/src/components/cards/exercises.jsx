// import dependencies
import React from 'react';
import Styles from './exercises.module.css';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector, useDispatch } from 'react-redux';

// import functions from utilities
import { removeWorkout } from '../../../utils';

// import detaila from store
import { user } from '../../store/authSlice';
import { getUserWorkouts } from '../../store/workoutSlice';


function Exercises(props) {
  // dependencies
  const id = useSelector(user);
  const dispatch = useDispatch();

  const deleteExercise = async () => {
    const toDelete = {
      id: id,
      workout: props.id,
    };

    const date = props.date;

    const response = await removeWorkout(toDelete);

    if (response.success) {
      const details = {
        date: date,
        id: id,
      };

      await dispatch(getUserWorkouts(details));
    }
  };

  return (
    <div className={Styles.mainContainer}>
      <div className={Styles.headingContainer}>
        <p className={Styles.title}>{props.category}</p>
        <button className={Styles.deleteButton} onClick={deleteExercise} ><CloseIcon /></button>
      </div>
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