// import dependencies
import React from 'react';
import Styles from './registerComp.module.css';

function RegisterComp() {

    // function for managing register. Not yet actioned!
    const onSubmit = () => {
        alert('Someone pressed submit!')
    };

    const facebook = () => {
        alert('You are trying to join with facebook.')
    }
    return (
        <div>
            <form onSubmit={onSubmit} className={Styles.registerRight}>
                <label>Your Name</label>
                <input typle='text' placeholder='Enter Your Name' name='name' />
                <label>Your Email</label>
                <input type='text' placeholder='Enter Your Email' name='email' />
                <label>Your Password</label>
                <input type='text' placeholder='Enter A Password' name='password' />
                {/* <label>Confirm Password</label>
                <input type='text' placeholder='Confirm Password' name='confpassword' /> */}
                <button className={Styles.registerSumbit} type='submit'>Submit now</button>
            </form>
             <button className={Styles.facebookSumbit} type='button' onClick={facebook}>Sign up with Facebook</button>
        </div>
    )
};

export default RegisterComp;