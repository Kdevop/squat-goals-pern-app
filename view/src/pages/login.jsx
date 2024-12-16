// import dependences
import React from 'react';
import Styles from './login.module.css';

// import components
import LetsTalk from '../components/letsTalk';
import SignInComp from '../components/signin';


function Login() {
    return (
        <div className={Styles.container}>
            <div className={Styles.titlecontainer}>
                <p className={Styles.title}>Sign In!</p>
            </div>
            <div className={Styles.contentcontainer}>
                <div>
                    <LetsTalk />
                </div>
                <div>
                    <SignInComp />
                </div>
            </div>
        </div>
    )
};

export default Login;