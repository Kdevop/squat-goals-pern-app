// import dependencies
import React from 'react';
import Styles from './signin.module.css';



function SignInComp() {
    // function for managing Sign in. Not yet actioned!
    const onSubmit = () => {
        alert('Someone pressed submit!')
    };

    const facebook = () => {
        alert('You are trying to sign in with facebook.')
    };

    return (
        <div>
            <form onSubmit={onSubmit} className={Styles.signinRight}>
                <label>Your Name</label>
                <input typle='text' placeholder='Enter Your Name' name='name' />
                <label>Your Email</label>
                <input type='text' placeholder='Enter Your Email' name='email' />
                <label>Your Password</label>
                <input type='text' placeholder='Enter A Password' name='password' />
                <button className={Styles.signinSumbit} type='submit'>Submit now</button>
            </form>
            <button className={Styles.facebookSumbit} type='button' onClick={facebook}>Sign up with Facebook</button>
        </div>
    )
};

export default SignInComp;