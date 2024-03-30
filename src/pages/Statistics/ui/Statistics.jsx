import React from 'react';
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { getAllProducts } from "src/pages/HomePage/selectors/getProducts.js";
import cls from "./Statistics.module.scss";

export const Statistics = () => {

    const products = useSelector(getAllProducts)
    const productsArr = products && Object.values(products) || []

    const sumExpenses = productsArr.reduce((ac, value) => ac + value.expenses + value.otherExpenses, 0)

    const sumPrice = productsArr.reduce((ac, value) => ac + value.price, 0)

    const sum = sumPrice - sumExpenses

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
            <h2>За все время</h2>
            <div className={cls.blocks}>

                <div>
                    <Block
                        title="Всего позиций"
                        value={productsArr.length}
                    />
                    <PodBlock
                        title="продано"
                        value={productsArr.filter(el => el.state === 'Продан').length}
                    />
                    <PodBlock
                        title="В наличии"
                        value={productsArr.filter(el => el.state !== 'Продан').length}
                    />
                </div>
                <Block
                    title="Всего потрачено"
                    value={sumExpenses}
                />
                <Block
                    title="Получено с продаж"
                    value={sumPrice}
                />
                <Block
                    title="Чистая прибыль"
                    value={<span style={{ color: sum > 0 ? '#2ea72e' : '#f43131', fontWeight: 700 }}>
                        {sum}
                        </span>}
                />
            </div>
        </Box>
    );
};


const Block = ({ title, value }) => {
    return (
        <div className={cls.Block}>
            <p>{title}: </p><p>{value}</p>
        </div>
    )
}

const PodBlock = ({ title, value }) => {
    return (
        <div className={cls.PodBlock}>
            <p>{title}: </p><p>{value}</p>
        </div>
    )
}

