// import dependencies
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { user } from '../store/authSlice';

// route for re-directing is the user is not logged in and they go to the one of the protected route
function ProtectedRoute({ children }) {
    const userID = useSelector(user);

    if(!userID) {
        return <Navigate to='/'/>
    }

    return children;
};

export default ProtectedRoute;