import React from 'react';
import { NavBar } from "src/widgets/NavBar/ui/NavBar.jsx";
import {Outlet } from "react-router-dom";
import Container from "@mui/material/Container";

export const Layout = () => {

    return (
        <div>
            <NavBar/>

            <hr/>
            <Container>
                <Outlet/>
            </Container>
        </div>
    )
}