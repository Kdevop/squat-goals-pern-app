// import dependencies
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Styles from './personalDetails.module.css';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

//import store and functions
import { user } from '../../store/authSlice';
import { accountUpdate } from '../../store/accountSlice';

function PersonalDetails(props) { 
    // state for component
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false);
    const [formCheck, setFormCheck] = useState(false);

    // dependencies 
    const dispatch = useDispatch();
    const id = useSelector(user);

    // function to submit form
    const onSubmit = async (e) => {
        e.preventDefault();

        // get the values
        const values = {
            name,
            email,
            password
        };

        // check user has updated at least one field
        const formCheck = () => {
            if (Object.values(values).every(value => value === '')) {
                return false;
            } else {
                return true;
            }
        }

        // create the object to be sent via api
        if (formCheck()) {
            const updates = Object.entries(values)
                .filter(([key, value]) => value !== '')
                .reduce((acc, [key, value]) => {
                    acc[key] = value;
                    return acc;
                }, {});

            updates.id = id;

            // dispatch request to update details
            try {
                await dispatch(accountUpdate(updates));
            } catch (error) {
                setShowError(true);
                console.log(error);
            }
        } else {
            setFormCheck(true);
        }

        // reset form fields
        setName('');
        setEmail('');
        setPassword('');
    };

    // functions to handle changes submitted
    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    return (
        <div>
            <form onSubmit={onSubmit} className={Styles.form}>
                <label htmlFor='name' className={Styles.title}>Change Name</label>
                <div className={Styles.inputContainer}>
                    <PersonIcon />
                    <input type='text' placeholder={props.name} value={name} name='name' onChange={handleNameChange} />
                </div>
                <label htmlFor='email' className={Styles.title}>Change Email</label>
                <div className={Styles.inputContainer}>
                    <EmailIcon />
                    <input type='email' placeholder={props.email} value={email} name='email' onChange={handleEmailChange} />
                </div>
                <label htmlFor='password' className={Styles.title}>Change Password</label>
                <div className={Styles.inputContainer}>
                    <LockIcon />
                    <input type='password' placeholder='Enter a new password' value={password} name='password' onChange={handlePasswordChange} />
                </div>
                
                {showError ? (
                    <p className={Styles.message}>Error updating details, please try again later</p>
                ) : (
                    null
                )}
                {formCheck ? (
                    <p className={Styles.message}>Please update a field to submit.</p>
                ) : (
                    null
                )}
                <button className={Styles.submit} type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default PersonalDetails;