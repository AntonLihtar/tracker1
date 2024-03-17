import React, { useEffect, useState } from 'react';
import { useOutletContext } from "react-router-dom";

import Box from "@mui/material/Box";

import { getCollections } from "src/shared/api/getRequestsFirebase.js";
import { MyTable } from "src/widgets/Table/index.js";
import cls from "./HomePage.module.scss";

export const HomePage = () => {
    const { app, db, auth } = useOutletContext();
    const [products, setProducts] = useState([])

    const getProducts = async () => {
        setProducts(await getCollections(db, 'products'))
    }

    useEffect(() => {
        getProducts().then(r => console.log(r))
    }, [db])

    return (
        <Box
            width={1.0}
            my={4}
            display="flex"
            alignItems="center"
            flexDirection="column"
            gap={4}
            sx={{
                padding: { xs: 0, md: 2 },
                border: { xs: 'none', md: '2px solid grey' }
            }}
        >
            <h2>Активные товары</h2>
            <MyTable products={products}/>
        </Box>
    );
};

