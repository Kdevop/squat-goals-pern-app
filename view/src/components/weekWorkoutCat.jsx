// import dependencies
import React from 'react';
import Styles from './weekWorkoutCat.module.css';
import { PieChart } from '@mui/x-charts';

function WeekWorkoutCat(props) {

    const pieChartData = props.data.map((entry, index) => ({
        id: index,
        value: entry.totalTime,
        label: entry.category,
    }))

    console.log(pieChartData);

    return (
        <div>
            <p>Workout Categories</p>
            <div className={Styles.pieChartContainer}>
                <PieChart
                    series={[
                        {
                            data: pieChartData,
                            innerRadius: 30,
                            outerRadius: 150,
                            paddingAngle: 5,
                            cornerRadius: 5,
                        }
                    ]}
                />
            </div>
        </div>
    )
};

export default WeekWorkoutCat;