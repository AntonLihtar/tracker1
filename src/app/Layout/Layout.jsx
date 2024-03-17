import React from 'react';
import { Outlet } from "react-router-dom";

import Container from "@mui/material/Container";
import { NavBar } from "src/widgets/NavBar/ui/NavBar.jsx";

export const Layout = ({ auth, db, app }) => {

    return (
        <div>
            <NavBar auth={auth}/>
            <hr/>
            <Container maxWidth={"xl"}>
                <Outlet context={{ auth, db, app }}/>
            </Container>
        </div>
    )
}