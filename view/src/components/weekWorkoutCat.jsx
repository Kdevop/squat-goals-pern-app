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
        <div className={Styles.pieChartContainer}>
            <p className={Styles.title}>Workout Categories</p>
            <PieChart
                series={[
                    {
                        data: pieChartData,
                        innerRadius: 10,
                        outerRadius: 100,
                        paddingAngle: 5,
                        cornerRadius: 5,
                    }
                ]}
                height={300}
                width={400}
            />
        </div>
    )
};

export default WeekWorkoutCat;