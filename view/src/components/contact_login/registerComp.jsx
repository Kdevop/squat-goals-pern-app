// import dependencies
import React, {useState} from 'react';
import Styles from './registerComp.module.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isEmpty, isEmail, isLength } from 'validator';

// import store and reducers
import { register } from '../../store/authSlice';

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

        if(isEmail(email) && !isEmpty(password) && !isEmpty(name) && isLength(password, { min: 6 })) {
            try{
                const resultAction = await dispatch(register(credentials));

                if(register.fulfilled.match(resultAction)) {
                    navigate('/dashboard');
                } else {
                    setError('User already exists.')
                }
            } catch (error) {
                console.error('Failed to register please try again')
            }
        } else {
            setError('Please enter a valid email, name and password with at least 6 characters.')
        }
    };

    const github = () => {
        // redirect user to the server endpoint that handle GitHub OAuth flow
        window.location.href = 'http://localhost:3000/api/users/auth/github';
    };

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
                {error && <div className={Styles.error}>{error}</div>}
                <button className={Styles.registerSumbit} type='submit'>Submit now</button>
            </form>
             <button className={Styles.facebookSumbit} type='button' onClick={github}>Sign up with Github</button>
        </div>
    )
};

export default RegisterComp;