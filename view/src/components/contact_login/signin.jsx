// import dependencies
import React, { useState } from 'react';
import Styles from './signin.module.css';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { isEmpty, isEmail } from "validator";

// import store and reducers
import { login } from '../../store/authSlice';


function SignInComp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        const credentials = {
            username: email,
            password: password
        };

        if (isEmail(email) && !isEmpty(password)) {
            try {
                const resultAction = await dispatch(login(credentials));
                if (login.fulfilled.match(resultAction)) {
                    alert('Success');
                    navigate('/dashboard'); // Example navigation after successful login
                } else {
                    setError('Email / password wrong. Please try again.');
                }
            } catch (error) {
                console.error('Failed to login: ', error);
                setError('An error occurred. Please try again.');
            }
        } else {
            setError('Please enter a valid email and password.');
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const github = () => {
        // redirect user to the server endpoint that handle GitHub OAuth flow
        window.location.href = 'http://localhost:3000/api/users/auth/github';
    };

    return (
        <div>
            <form onSubmit={onSubmit} className={Styles.signinRight}>
                <label htmlFor='loginEmail'>Your Email</label>
                <input type='email' placeholder='Enter Your Email' value={email} name='loginEmail' onChange={handleEmailChange} />
                <label htmlFor='loginPassword'>Your Password</label>
                <input type='password' placeholder='Enter A Password' value={password} name='loginPassword' onChange={handlePasswordChange} />
                {error && <div className={Styles.error}>{error}</div>}
                <button className={Styles.signinSumbit} type='submit'>Submit now</button>
            </form>

            <button className={Styles.facebookSumbit} type='button' onClick={github}>Sign up with GitHub</button>
        </div>
    );
}

export default SignInComp;