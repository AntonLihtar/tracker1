import React, { useEffect, useState } from 'react';
import { useOutletContext } from "react-router-dom";

import Box from "@mui/material/Box";

import { MyTable } from "src/widgets/Table/index.js";
import { getCollections } from "src/pages/AddPage/api/brandsAPI.js";

import cls from "./HomePage.module.scss";

export const HomePage = () => {
    const {app, db, auth} =  useOutletContext();
    const [products, setProducts] = useState([])

    const getProducts = async () => {
        const res = await getCollections(db, 'products')
        res && setProducts(res)
        return 'OK'
    }

    useEffect(()=> {
        db && getProducts().then(r => console.log('products loading', r))
    }, [])

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

