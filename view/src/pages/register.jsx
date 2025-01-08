// import dependencies
import React from 'react';
import Styles from './register.module.css';

// import components
import LetsTalk from '../components/contact_login/letsTalk';
import RegisterComp from '../components/contact_login/registerComp'

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