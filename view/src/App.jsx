// import dependencies
// IMPORT STRICT MODE FOR DEV REMOVE FOR PROD.
import React, { StrictMode, useEffect } from 'react';
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
import ProtectedRoute from './router/protectedRoute';
import AuthRoute from './router/authRoute';
//import ErrorPage from './error/errorPage';


// create React Router
const appRouter = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Root />}>
    {/* Public Routes */}
    <Route index element={<AuthRoute><Home /></AuthRoute>} />
    <Route exact path='/contact' element={<Contact />} />
    <Route exact path='/login' element={<AuthRoute><Login /></AuthRoute>} />
    <Route exact path='/register' element={<AuthRoute><Register /></AuthRoute>} />

    {/* Protected Routes */}
    <Route exact path='/account' element={<ProtectedRoute><Account /></ProtectedRoute>} />
    <Route exact path='/workouts' element={<ProtectedRoute><Workouts /></ProtectedRoute>} />
    <Route exact path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

    {/* Error Route */}
    {/* <Route exact path='/error' element={<ErrorPage />} /> */}
  </Route>
))

function App(user) {

  return (
    <>
      {/* Enabling strict mode for Development. Remove for production. */}
      <React.StrictMode>
        <div className="app-container">
          <RouterProvider router={appRouter} />
        </div>
      </React.StrictMode>
    </>
  )
};

export default App;
