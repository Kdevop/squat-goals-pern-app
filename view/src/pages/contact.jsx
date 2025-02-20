// import the dependencies
import React from 'react';
import Styles from './contact.module.css';

// import components
import LetsTalk from '../components/contact_login/letsTalk';
import Email from '../components/contact_login/email';

function Contact() { 
    return (
        <div className={Styles.container}>
            <div className={Styles.titlecontainer}>
                <p className={Styles.title}>Get in touch</p>
            </div>
            <div className={Styles.contentcontainer}>
                <div>
                    <LetsTalk />
                </div>
                <div>
                    <Email />
                </div>
            </div>
        </div>
    )
}

export default Contact;