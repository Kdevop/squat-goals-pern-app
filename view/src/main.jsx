import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


// borrowed from other project: 
// const root = ReactDOM.createRoot(document.getElementById('root'));

// const renderApp = (user)=> {
//   const store = configureStore({
//     reducer: reducer, 
//     preloadedState:{
//       session: {
//         user: user,
//       }
//     }
//   });
//   root.render(
//     <Provider store={store}>
//       <App user={user}/>
//     </Provider>    
    
//   );
// }

// (async () => renderApp(await fetchSession()))();
// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

