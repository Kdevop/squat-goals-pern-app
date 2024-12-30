import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { user } from '../store/authSlice';

// route for re-directing is the user is logged in and they go to the landing / registration / or login page
function AuthRoute({ children }) {
    const userID = useSelector(user);

    if(userID) {
        return <Navigate to='/dashboard'/>
    }

    return children;
};

export default AuthRoute;