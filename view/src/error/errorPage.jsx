// import dependencies
import React from 'react';
import Styles from './errorPage.module.css';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo_full.jpg';

const ErrorPage = () => {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/');
    }

    return (
        <div className={Styles.mainContainer}>
            <div>
                <p className={Styles.heading}>Something went wrong.</p>
            </div>
            <div className={Styles.content}>
                <p>Sorry, there seems to be an issue.</p>
                <p>Please press the logo below to go home.</p>
            </div>
            <div>
                <img src={logo} alt='Company logo' className={Styles.logo} onClick={handleLogoClick}/>
            </div>
        </div>
    )
}

export default ErrorPage;