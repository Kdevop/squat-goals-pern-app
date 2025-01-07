// import dependencies
import React, { useState, useEffect } from 'react';
import Styles from './custReviews.module.css';

// data for reviews
const reviews = [
    {
        id: 1,
        review: 'This is such a great app! Really helped me achieve my goals',
        by: 'Claire'
    },
    {
        id: 2,
        review: 'This app is the best. I subscibed to the Personal Trainer feature and they gave great guidance.',
        by: 'John'
    },
    {
        id: 3,
        review: 'Really great app! Easy to use. Helped me plan and track my progress which kept me motivated.',
        by: 'Lucy'
    }
]

function CustReviews() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // use effect to incrememnt the current index
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
        }, 3000); // Change review every 3 seconds

        return () => clearInterval(interval); // Cleanup on component unmount
    }, []);

    // function to change the class of the review based on its index
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

export default CustReviews;