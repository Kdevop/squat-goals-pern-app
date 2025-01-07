// import dependenices
import React, { useEffect, useState } from 'react';
import Styles from './ptReviews.module.css';


// data for pt reviews
const reviews = [
    {
        id: 1,
        review: 'Working through this app means that I can help people plan out their routine when and where is suits them.',
        by: 'David - Personal Trainer (Functional Fitness)'
    },
    {
        id: 2,
        review: 'I love working with people through this app! It gives me the opportunity to help a wider array of people.',
        by: 'Nicola - Personal Trainer (Muscle Gain)'
    },
    {
        id: 3,
        review: 'This app really helps me share my love of fitness with people who are new to training. Giving people confidence in training is what motivates me.',
        by: 'Becky - Personal Trainer (Weight Loss)'
    }
]

function PtReviews() {
const [currentIndex, setCurrentIndex] = useState(0);

// use effect to incremement the current index
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
        }, 3000); // Change review every 3 seconds

        return () => clearInterval(interval); // Cleanup on component unmount
    }, []);

    // function to change the class of review based on idex.
    const getReviewClass = (index) => {
        if (index === currentIndex) return Styles.highlighted;
        if (index === (currentIndex + 1) % reviews.length) return Styles.next;
        if (index === (currentIndex + 2) % reviews.length) return Styles.previous;
        return Styles.reviewCard;
    };

    return (
        <div className={Styles.carousel}>
            {reviews.map((review, index) => (
                <div key={review.id} className={`${Styles.reviewCard} ${getReviewClass(index)}`}>
                    <p>{review.review}</p>
                    <p><strong>- {review.by}</strong></p>
                </div>
            ))}
        </div>
    );
};

export default PtReviews;