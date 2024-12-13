// import dependencies
import React from 'react';
import { Outlet } from 'react-router-dom';

// imort components
import Header from '../components/header';
import Footer from '../components/footer';

const Root = () => {
    return (
        <>
            <Header/>
            <Outlet/>
            <Footer />
        </>
    )
};

export default Root;

