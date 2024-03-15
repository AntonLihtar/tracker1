import React, { useContext, useEffect, useState } from 'react';
import Box from "@mui/material/Box";

import { MyTable } from "src/widgets/Table/index.js";
import { getCollections } from "src/pages/AddPage/api/brandsAPI.js";
import { Context } from "src/main.jsx";

import cls from "./HomePage.module.scss";

export const HomePage = () => {
    const { auth, db, app } = useContext(Context)
    const [products, setProducts] = useState([])

    const getProducts = async () => {
        const res = await getCollections(db, 'products')
        setProducts(res)
        return 'OK'
    }

    useEffect(()=> {
        getProducts().then(r => console.log('products loading OK', r))
    }, [])
    console.log(products)
    return (
        <Box
            width={1.0}
            my={4}
            display="flex"
            alignItems="center"
            flexDirection="column"
            gap={4}
            p={2}
            sx={{ border: '2px solid grey' }}>
            <h2>Активные товары</h2>
            <MyTable products={products}/>
        </Box>
    );
};

