import { useContext} from "react";
import {
    Navigate,
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";


import { Context } from "src/main.jsx";
import { AllProduct } from "src/pages/AllProduct/index.js";
import { AuthPage } from "src/pages/AuthPage/index.js";
import { Loader } from "src/widgets/Loader/ui/Loader.jsx"
import { Statistics } from "src/pages/Statistics/index.js";
import { AddPage } from "src/pages/AddPage/index.js";
import { Layout } from "./Layout/Layout.jsx";

import { HomePage } from "src/pages/HomePage/index.js";
import cls from './App.module.scss'

console.log()
function App() {
    const { auth } = useContext(Context)
    const [user, loading, error] = useAuthState(auth)


    const publicRouter = createBrowserRouter([
        {
            path: "/auth",
            element: <AuthPage/>,
        },
        {
            path: "*",
            element: <Navigate replace to="auth"/>
        },
    ]);

    const privateRouter = createBrowserRouter([
        {
            path: "/",
            element: <Layout/>,
            children: [
                {
                    path: '/',
                    element: <HomePage/>,
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
            ]
        },
        {
            path: "*",
            element: <Navigate replace to="/"/>
        },
    ]);

    if(loading){
        return <Loader/>
    }

    return (
        <>
            {
                user
                    ? <RouterProvider router={privateRouter}/>
                    : <RouterProvider router={publicRouter}/>
            }
        </>
    )
}

export default App
