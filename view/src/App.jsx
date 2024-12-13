// import dependencies
import React from 'react';
import './App.css';
import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

// import components
import Account from './pages/account';
import Contact from './pages/contact';
import Dashboard from './pages/dashboard';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Workouts from './pages/workouts';
import Root from './router/index';

// create React Router
const appRouter=createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Root/>}>
    {/* Public Routes */}
    <Route index element={<Home/>}/>
    <Route exact path='/contact' element={<Contact />}/>
    <Route exact path='/login' element={<Login/>} />
    <Route exact path='register' element={<Register/>}/>
    
    {/* Protected Routes */}
    <Route exact path='/account' element={<Account/>}/>
    <Route exact path='/workouts' element={<Workouts/>}/>
    <Route exact path='/dashboard' element={<Dashboard />}/>
  </Route>
))

function App() {
    return (
    <>
      <RouterProvider router={appRouter}/>
    </>
  )
};

export default App;
