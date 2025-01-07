// import dependencies
import React, { useState, useEffect } from 'react';
import Styles from './upgradeAccount.module.css';

function UpgradeAccount(props) {
    // useState for details and options
    const [account, setAccount] = useState('Free');
    const [stripe, setStripe] = useState(false);

    // useEffect to setAccount
    useEffect(() => {
        if (props.accountType) {
            setAccount('Paid')
        }
    }, [props.accountType]);

    // openStrip for payment options
    const openStripe = () => {
        setStripe(!stripe);
    }

    return (
        <div>
            <div className={Styles.accountDetails}>
                <div className={Styles.accountContainer}>
                    <p className={Styles.title}>Account Type: </p>
                    <p>{account}</p>
                </div>
                <div className={Styles.buttonContainer}>
                    <button className={Styles.stripeButton} onClick={openStripe}>Change Account Type</button>
                </div>
            </div>
            <div>
                {stripe ? (
                    <div className={Styles.stripeContainer}>
                        <p>This bit will be used for stripe - updates to app soon!</p>
                    </div>
                ) : (
                    null
                )}
            </div>
        </div>
    )
};

export default UpgradeAccount;