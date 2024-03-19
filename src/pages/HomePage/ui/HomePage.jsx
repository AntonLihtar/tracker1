import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import { MyTable } from "src/widgets/Table/index.js";
import { getAllProducts } from "src/pages/HomePage/selectors/getProducts.js";
import cls from "./HomePage.module.scss";
import { getCollectionThunk } from "src/pages/HomePage/model/api/requestsFirebase.js";
import { useOutletContext } from "react-router-dom";

export const HomePage = () => {

    const products = useSelector(getAllProducts)

    useEffect(() => {
        // getProducts()
        dispatch(getCollectionThunk(db))

    }, [db, dispatch])

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

