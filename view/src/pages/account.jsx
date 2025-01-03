// import dependencies
import React, { useState, useEffect } from 'react';
import Styles from './account.module.css';
import { useDispatch, useSelector } from 'react-redux';

// import components
import PersonalDetails from '../components/personalDetails';
import UpgradeAccount from '../components/upgradeAccount';

// import functions and store
import { accountDetails, userAccount } from '../store/accountSlice';
import { user } from '../store/authSlice';

const data = [
    {
        "result": {
            "error": false,
            "data": {
                "id": 2,
                "email": "test@example.com",
                "account": false,
                "name": "Test User"
            }
        }
    }
];

function Account() {
    // dependencies
    const dispatch = useDispatch();
    const id = useSelector(user);
    const account = useSelector(userAccount);

    // state
    const [error, setError] = useState(false);
    const [userData, setUserData] = useState(null);

    // useEffect to get account details when the page loads
    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(accountDetails(id));
            } catch {
                console.error('Error fetching user account', error);
                setError(true)
            }
        };

        fetchData();
    }, [dispatch]);

    // useEffect to set account details into state.
    useEffect(() => {
        if (account) {
            setUserData(account);
        }
    }, [account]);

    return (
        <div className={Styles.mainContainer}>
            <p className={Styles.heading}>Your Account</p>
            <div className={Styles.contentcontainer}>
                <div>
                    <p className={Styles.title}>Your Details</p>

                    {userData ? (
                        <PersonalDetails
                            email={userData.email}
                            name={userData.name}
                        />
                    ) : (
                        <p>Data Loading</p>
                    )}

                </div>
                <div>
                    <p>Div for account details.</p>
                    <UpgradeAccount
                        accountType={data[0].result.data.account}
                    />
                </div>
            </div>
        </div>
    )
}

export default Account;