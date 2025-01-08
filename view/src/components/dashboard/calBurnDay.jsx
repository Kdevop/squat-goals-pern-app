// import dependencies
import React from 'react';
import Styles from './calBurnDay.module.css';
import { BarChart } from '@mui/x-charts';

function CalorieBurnDay(props) {
    // Prepare data for the bar chart
    const chartData = {
        dates: props.data?.map(entry => { 
            const [month, day, year] = entry.date.split('-');
            return `${day}-${month}`;
        }),
        caloriesBurned: props.data?.map(entry => entry.totalCalories),
    };

    return (
        // render bar chart of calories used each day over the past week.
        <div className={Styles.container}> 
            <p className={Styles.title}>Weekly Calories Burned</p>
            {props.data? (
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
            ) : (
                <p>No data to display.</p>
            )}

        </div>
    );
};

export default CalorieBurnDay;