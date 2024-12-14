// Import dependencies
import React from 'react';
import Styles from './home.module.css';
import logo from '../assets/logo_full.jpg';
import hero from '../assets/man_lifting.jpg'
import planning from '../assets/planning.jpg';
import tracking from '../assets/tracking.jpg';
import ptimage from '../assets/ptimage.jpg';
import joingImg from '../assets/joinImage.jpg';
import { NavLink } from 'react-router-dom';

// Import components
import CustReviews from '../components/custReviews';
import PtReviews from '../components/ptReviews';

function Home() {
    return (
        <> 
            <div className={Styles.home} id='home'>
                <div className={Styles.hero_container}>
                    <img src={logo} alt='Image og company logo' className={Styles.logo} />
                    <div className={Styles.content}>
                        <p>Hit your workout goals with unparalleled planning and analysis</p>
                        <p>Obtain your own Personal Trainer to take your training to the next level.</p>
                    </div>
                    <div className={Styles.start1}>
                    <NavLink to='/login' className={Styles.navlink}><p>Get started for free</p></NavLink>
                    </div>
                </div>
                <div>
                    <img src={hero} alt='Man lifting.' className={Styles.hero} />
                </div>
            </div>
            <div className={Styles.csreviews_container} id='custReview'>
                <CustReviews />
            </div>
            <div className={Styles.featuresTitle} id='features'>
                <p>
                    Plan, Track, Achieve!
                </p>
            </div>
            <div className={Styles.features}>
                <div>
                    <img src={planning} alt='Screen shot of feature' className={Styles.planning} />
                </div>
                <div>
                    <div className={Styles.featuresContent}>
                        <p>Plan your workouts</p>
                        <p>Enter your planned workouts ahead of time  - know what you are doing that day at the gym to hit your goals.</p>
                    </div>
                    <div className={Styles.start2}>
                    <NavLink to='/login' className={Styles.navlink}><p>Get started for free</p></NavLink>
                    </div>
                </div>
            </div>
            <div className={Styles.features2}>
                <div>
                    <div className={Styles.featuresContent2}>
                        <p>Track your Progress</p>
                        <p>Track your progress and achievements. See how many calories your are burning and how your workouts breakdown.</p>
                    </div>
                    <div className={Styles.start3}>
                    <NavLink to='/login' className={Styles.navlink}><p>Get started for free</p></NavLink>
                    </div>
                </div>

                <div>
                    <img src={tracking} alt='Screen shot of feature' className={Styles.tracking} />
                </div>
            </div>
            <div className={Styles.featuresTitle} id='ptReview'>
                <p>Our Personal Trainers</p>
            </div>
            <div className={Styles.features}>
                <div>
                    <img src={ptimage} alt='Screen shot of feature' className={Styles.planning} />
                </div>
                <div>
                    <div className={Styles.featuresContent}>
                        <p>Work with one of our Personal Trainers</p>
                        <p>For premium you can work alongside one of our Personal Trainers!
                            Hit your goals with one of our experts. Select one that suits your goals.</p>
                    </div>
                    <div className={Styles.start2}>
                    <NavLink to='/login' className={Styles.navlink}><p>Get started for free</p></NavLink>
                    </div>
                </div>
            </div>
            <div className={Styles.ptreviews_container} >
                <PtReviews />
            </div>
            <div className={Styles.features2} id='begin'>
                <div>
                    <div className={Styles.featuresContent2}>
                        <p>Begin Today!</p>
                        <p>Take your workout to the next level! Whether you are new to training or just starting your journey, get great results!</p>

                    </div>
                    <div className={Styles.start3}>
                    <NavLink to='/login' className={Styles.navlink}><p>Get started for free</p></NavLink>
                    </div>
                </div>

                <div>
                    <img src={joingImg} alt='Screen shot of feature' className={Styles.tracking} />
                </div>
            </div>
        </>
    )
};

export default Home;