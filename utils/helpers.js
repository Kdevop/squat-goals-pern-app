// Helpers for dahsbooard

// helper to calculate calories
// NOTED LEFT PREVIOUS CODE IN FOR NOW BUT WILL DELETE ONCE TESTED IN BROWSER.
const calculateCalories = (workout) => {
    //let calories = [];
    const duration = workout.duration;
    const weight = workout.weight;
    //const caloriesPerMin = 5;
    return duration * weight; //* caloriesPerMin;
};

// helper to convert date to MM-DD-YYYY
const convertDate = (currentDate) => {
    const date = new Date(currentDate);
    const formatDate = (num) => num.toString().padStart(2, '0');
    return `${formatDate(date.getMonth() +1)}-${formatDate(date.getDate())}-${date.getFullYear()}`;
};

// sort data for Bar chart
const getDates = () => {

    const dates = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
        const pastDate = new Date(today);
        pastDate.setDate(today.getDate() - i);
        dates.push(convertDate(pastDate));
    }

    return dates;
};

export { calculateCalories, convertDate, getDates };



// notes on function that I need
// import { convertDate } from './utils/helpers';
// 
// const getPastWeekDates = () => {
//     const dates = [];
//     const today = new Date();
// 
//     for (let i = 0; i < 7; i++) {
//         const pastDate = new Date(today);
//         pastDate.setDate(today.getDate() - i);
//         dates.push(convertDate(pastDate));
//     }
// 
//     return dates;
// };
// 
// // Example usage
// console.log(getPastWeekDates());


 