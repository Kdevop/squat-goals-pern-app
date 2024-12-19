// import dependencies
import React from 'react';
import Styles from './calBurnDay.module.css';
import { BarChart } from '@mui/x-charts';

function CalorieBurnDay(props) {
    // Prepare data for the bar chart
    const chartData = {
        dates: props.data.map(entry => {
            const [month, day, year] = entry.date.split('-');
            return `${day}-${month}`;
        }),
        caloriesBurned: props.data.map(entry => entry.totalCalories),
    };

    console.log(chartData);

    return (
        // render bar chart of calories used each day over the past week.
        <div className={Styles.container}> 
            <p className={Styles.title}>Weekly Calories Burned</p>
            <BarChart
                xAxis={[
                    { scaleType: "band", data: chartData.dates }
                ]}
                series={[
                    { data: chartData.caloriesBurned }
                ]}
                height={300}
                width={400}
            />
        </div>

        // <div>
        //     This is the calories burned per day componenent.
        //     <div>
        //         {props.data.map((entry, index) => (
        //             <p key={index}>
        //                 Date: {entry.date}, Calories: {entry.totalCalories}
        //             </p>
        //         ))}
        //     </div>
        // </div>
    );
};

export default CalorieBurnDay;