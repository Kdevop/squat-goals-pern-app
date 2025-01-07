import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { configureStore } from '@reduxjs/toolkit';
import reducer from './store/index.js';
import { fetchSession } from '../utils/index.js';
import { Provider } from 'react-redux';
//import ErrorBoundary from './error/utils.js';

const root = createRoot(document.getElementById('root'));

const renderApp = async () => {
  const user = await fetchSession();
  const store = configureStore({
    reducer: reducer,
    preloadedState: {
      auth: {
        user: user,
      },
    },
  });


  root.render(
    <StrictMode>
      <Provider store={store}>
        {/* <ErrorBoundary /> */}
          <App user={user} />
        {/* <ErrorBoundary /> */}
      </Provider>
    </StrictMode>
  );
};

renderApp();

