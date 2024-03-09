import { AuthPage } from "../pages/AuthPage/index.js";
import cls from './App.module.scss'
import { Layout } from "./Layout/Layout.jsx";
import { Navigate} from "react-router-dom";


import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { useContext} from "react";
import { Context } from "src/main.jsx";
import { useAuthState } from "react-firebase-hooks/auth";
import { Home } from "@mui/icons-material";
import { AllProduct } from "src/pages/AllProduct/index.js";
import { AddPage } from "src/pages/AddPage/index.js";
import { Statistics } from "src/pages/Statistics/index.js";
import { Loader } from "src/widgets/Loader/ui/Loader.jsx";


function App() {
    const { auth } = useContext(Context)
    const [user, loading, error] = useAuthState(auth)

    console.log(user)

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
                    element: <Home/>,
                },
                {
                    path: '/all',
                    element: <AllProduct/>,
                },
                {
                    path: '/add',
                    element: <AddPage/>,
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
