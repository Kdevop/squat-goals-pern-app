// import dependencies
import React from 'react';
import Styles from './account.module.css'

function Account () {
    return (
        <div className={Styles.mainContainer}>
            <p className={Styles.heading}>Your Account</p>
            <div>
                Div for personal details.
            </div>
            <div>
                Div for account details.
            </div>
        </div> 
    )
}

export default Account;