// import dependendcies
import React, { useState, useEffect } from 'react';
import Styles from './header.module.css';
import logo from '../assets/logo_short.png';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { NavLink } from 'react-router-dom';


// import components

function Header() {
    const [activeSection, setActiveSection] = useState('#home');

    const handleSetActive = (section) => {
        setActiveSection(section);
    };

    return (
        <div className={Styles.navbar}>
            <div className={Styles.left}>
                <MenuIcon alt='Menu Icon' className={Styles.navmobopen} />
                <NavLink to='/' className={Styles.logoLink}><img src={logo} alt='Company Logo' className={Styles.logo}/></NavLink>
                <ul className={Styles.navmenu}>
                    <li><CloseIcon alt='Close menu icon' className={Styles.navbarclose}/></li>
                    <li><AnchorLink className={`${Styles.anchorlink} ${activeSection === '#home' ? Styles.activeLink : ''}`} href='#home' onClick={() => handleSetActive('#home')}><p>Home</p></AnchorLink></li>
                    <li><AnchorLink className={`${Styles.anchorlink} ${activeSection === '#custReview' ? Styles.activeLink : ''}`} href='#custReview' onClick={() => handleSetActive('#custReview')}><p>User Reviews</p></AnchorLink></li>
                    <li><AnchorLink className={`${Styles.anchorlink} ${activeSection === '#features' ? Styles.activeLink : ''}`} href='#features' onClick={() => handleSetActive('#features')}><p>Features</p></AnchorLink></li>
                    <li><AnchorLink className={`${Styles.anchorlink} ${activeSection === '#ptReview' ? Styles.activeLink : ''}`} href='#ptReview' onClick={() => handleSetActive('#ptReview')}><p>Our Personal Trainers</p></AnchorLink></li>
                    <li><AnchorLink className={`${Styles.anchorlink} ${activeSection === '#begin' ? Styles.activeLink : ''}`} href='#begin' onClick={() => handleSetActive('#begin')}><p>Begin Today</p></AnchorLink></li>
                </ul>
            </div>
            <div>
                <ul className={Styles.right}>
                    <li><NavLink to='/contact' className={Styles.navlink1} activeClassName={Styles.activeLink}>Contact</NavLink></li>
                    <li><NavLink to='/login' className={Styles.navlink2} activeClassName={Styles.activeLink}>Sign In</NavLink></li>
                </ul>
            </div>
        </div>
    )
};

export default Header;

{/* <div className={Styles.navbar}>
<img src={MenuIcon} alt='Menu Icon' />
<img src={logo} alt='Company Logo'/>

This is the header component.
</div>
) */}