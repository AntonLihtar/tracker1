import React from 'react';
import Box from "@mui/material/Box";
import { TableAllProducts } from "src/widgets/TableAllProducts/index.js";
import { useSelector } from "react-redux";
import { getAllProducts } from "src/pages/HomePage/selectors/getProducts.js";

export const AllProduct = () => {

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
            <h2>Все товары</h2>
            <TableAllProducts products={products}/>
        </Box>
    );
};

