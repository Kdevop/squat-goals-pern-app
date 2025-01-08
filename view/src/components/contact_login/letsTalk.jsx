// import dependencies
import React from 'react';
import EmailIcon from '@mui/icons-material/Email';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Styles from './letsTalk.module.css';

function LetsTalk() {
    return ( 
        <div className={Styles.contactleft}>
            <p>Lets talk</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <div className={Styles.contactdetails}>
                <div className={Styles.contactdetail}>
                    <EmailIcon />
                    <p>info@squatgoals.com</p>
                </div>
                <div className={Styles.contactdetail}>
                    <PhoneInTalkIcon />
                    <p>01234567890</p>
                </div>
                <div className={Styles.contactdetail}>
                    <LocationOnIcon />
                    <p>Bristol, UK</p>
                </div>
            </div>
        </div>
    )
};

export default LetsTalk;