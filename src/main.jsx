import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App.jsx'

import './index.css'
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { AuthPage } from "src/pages/AuthPage/index.js";
import { HomePage } from "src/pages/HomePage/index.js";
import { AddPage } from "src/pages/AddPage/index.js";
import { AllProduct } from "src/pages/AllProduct/index.js";
import { Statistics } from "src/pages/Statistics/index.js";

import { store } from './app/store/store.js'
import { Provider } from 'react-redux'

const router = createBrowserRouter([
    {
        path: "/",
        element:
        // <React.StrictMode>
            <Provider store={store}>
            <App/>
            </Provider>
        // </React.StrictMode>
        ,
        children: [
            {
                path: "/",
                element: <HomePage/>,
            },
            {
                path: "/auth",
                element: <AuthPage/>,
            },
            {
                path: '/add',
                element: <AddPage/>,
            },
            {
                path: '/all',
                element: <AllProduct/>,
            },
            {
                path: '/stat',
                element: <Statistics/>,
            },
            {
                path: "*",
                element: <Navigate replace to="home"/>
            },
        ]
    },
    {
        path: "*",
        element: <Navigate replace to="/"/>
    },
]);


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<RouterProvider router={router}/>)
