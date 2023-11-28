import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Signin from './pages/Signin';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import { store } from './store/store'
import { Provider } from 'react-redux';
import ViewParticipants from './pages/ViewParticipants';

// const router = createBrowserRouter([//nested routes with object orientation
//   {
//     path: '/',//path you want to go to
//     element: <App />, //component you want to render at that path
//     children: [//add more routes in children
//       {
//         path: '/signup',
//         element:
//       }
//     ]
//   }
// ])

const router = createBrowserRouter(
  createRoutesFromElements((
    <Route path='/' element={<RootLayout/>}>
      <Route path = '/' element={<App/>}/>
      <Route path ='/Signin' element = {<Signin />}/>
      <Route path ='ViewParticipants' element = {<ViewParticipants/>}/>
    </Route>//s
  )
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router = {router}/>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
