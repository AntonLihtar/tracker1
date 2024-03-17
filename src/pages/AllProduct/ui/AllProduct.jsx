import React, { useEffect, useState } from 'react';
import { useOutletContext } from "react-router-dom";
import Box from "@mui/material/Box";
import { getCollections } from "src/shared/api/getRequestsFirebase.js";
import { TableAllProducts } from "src/widgets/TableAllProducts/index.js";

export const AllProduct = () => {

    const { app, db, auth } = useOutletContext();
    const [products, setProducts] = useState([])

    const getProducts = async () => {
        setProducts(await getCollections(db, 'products'))
    }

    useEffect(() => {
        getProducts()
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
            <h2>Все товары</h2>
            <TableAllProducts products={products}/>
        </Box>
    );
};

