import React from 'react';
import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import { MyTable } from "src/widgets/Table/index.js";
import { getAllProducts } from "src/pages/HomePage/selectors/getProducts.js";
import cls from "./HomePage.module.scss";

export const HomePage = () => {

    const products = useSelector(getAllProducts)

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

