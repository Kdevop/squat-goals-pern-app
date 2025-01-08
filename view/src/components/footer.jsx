import React from 'react';
import Styles from './footer.module.css';

function Footer() {
    return (
        <div className={Styles.footerContainer}>
            <div className={Styles.title}>
                <p>Disclaimer</p> 
            </div>
            <div className={Styles.content}>
                <p>This site is a student project with Code Academt through IT Career Switch. All Calculations regarding calroies burned and any data shown are for coding demonstration purposes</p>
                <p>All data sotored in this site will be deleted by xxxxxxxx</p>
                <br />
                <p>You can view more of my work here: Portfolio SITE TO BE ADDDED. </p>
            </div>
        </div>
    )
};

export default Footer;