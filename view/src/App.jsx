// import dependencies
// IMPORT STRICT MODE FOR DEV REMOVE FOR PROD.
import React, { StrictMode } from 'react';
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
const appRouter = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Root />}>
    {/* Public Routes */}
    <Route index element={<Home />} />
    <Route exact path='/contact' element={<Contact />} />
    <Route exact path='/login' element={<Login />} />
    <Route exact path='/register' element={<Register />} />

    {/* Protected Routes */}
    <Route exact path='/account' element={<Account />} />
    <Route exact path='/workouts' element={<Workouts />} />
    <Route exact path='/dashboard' element={<Dashboard />} />
  </Route>
))

function App() {
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
