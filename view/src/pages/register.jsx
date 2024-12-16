// import dependencies
import React from 'react';
import Styles from './register.module.css';

// import components
import LetsTalk from '../components/letsTalk';
import RegisterComp from '../components/registerComp'

function Register() {
    return (
        <div className={Styles.container}>
            <div className={Styles.titlecontainer}>
                <p className={Styles.title}>Sign Up!</p>
            </div>
            <div className={Styles.contentcontainer}>
                <div>
                    <LetsTalk />
                </div>
                <div>
                    <RegisterComp />
                </div>
            </div>
        </div>
    )
};

export default Register;