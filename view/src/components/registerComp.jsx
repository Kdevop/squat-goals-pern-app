// import dependencies
import React, {useState} from 'react';
import Styles from './registerComp.module.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isEmpty, isEmail } from 'validator';

// import store and reducers
import { register } from '../store/authSlice';

function RegisterComp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // function for managing register. 
    const onSubmit = async (e) => {
        e.preventDefault();
        const credentials = {
             password: password,
             email: email, 
             name: name
        };

        if(isEmail(email) && !isEmpty(password) && !isEmpty(name)) {
            try{
                const resultAction = await dispatch(register(credentials));

                if(register.fulfilled.match(resultAction)) {
                    alert('Success');
                    navigate('/dashboard');
                } else {
                    setError('User already exists.')
                }
            } catch (error) {
                console.error('Failed to register please try again')
            }
        } else {
            setError('Please enter a valid email, name and password.')
        }
    };

    const facebook = () => {
        alert('You are trying to join with facebook.')
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    return (
        <div>
            <form onSubmit={onSubmit} className={Styles.registerRight}>
                <label htmlFor='registerName'>Your Name</label>
                <input type='text' placeholder='Enter Your Name' name='registerName' value={name} onChange={handleNameChange} />
                <label htmlFor='registerEmail'>Your Email</label>
                <input type='email' placeholder='Enter Your Email' name='registerEmail' value={email} onChange={handleEmailChange}/>
                <label htmlFor='registerPassword'>Your Password</label>
                <input type='password' placeholder='Enter A Password' name='registerPassword' value={password} onChange={handlePasswordChange} />
                {/* <label>Confirm Password</label>
                <input type='text' placeholder='Confirm Password' name='confpassword' /> */}
                {error && <div className={Styles.error}>{error}</div>}
                <button className={Styles.registerSumbit} type='submit'>Submit now</button>
            </form>
             <button className={Styles.facebookSumbit} type='button' onClick={facebook}>Sign up with Facebook</button>
        </div>
    )
};

export default RegisterComp;