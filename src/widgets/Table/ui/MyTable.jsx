import * as React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import cls from "./MyTable.module.scss";
import { useMemo } from "react";
import { TableCellBold } from "src/shared/ui/TableCellBold/TableCellBold.jsx";
import { TableCellNorm } from "src/shared/ui/TableCellNorm/TableCellNorm.jsx";
import { ButtonTable } from "src/shared/ui/ButtonTable/ButtonTable.jsx";
import { setBackgroundColor } from "src/shared/lib/setBackgroundColor/setBackgroundColor.js";
import { useNavigate } from "react-router-dom";


export const MyTable = ({ products }) => {

    const navigate = useNavigate()

    const tableCellTitle = useMemo(() => ['Название', 'Стоимость',
            'Описание', 'Дата создания', 'Состояние', 'Отложить', 'Редактировать'],
        [])

    const goToFixPage = (id) => {
        navigate(`/fix/${id}`)
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow className={cls.tableRowHeader}>
                        {tableCellTitle.map(el => (
                            <TableCellBold
                                key={el}
                            >
                                {el}
                            </TableCellBold>))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products && Object.entries(products)
                        .filter(([key1, el])=> el.state !== 'Продан')
                        .map(([key, product]) => (
                        <TableRow
                            key={product.id}
                            className={cls.tableRow}
                            sx={{
                                '&:last-child td, &:last-child th': { border: 0 },
                                backgroundColor: setBackgroundColor(product.state)
                            }}
                        >
                            <TableCellNorm
                                component="th"
                                scope="row"
                            >
                                {`${product.brand} ${product.model}`}
                            </TableCellNorm>
                            <TableCellNorm>
                                {Number(product.expenses) + Number(product.otherExpenses)}
                            </TableCellNorm>
                            <TableCellNorm>
                                {product.description}
                            </TableCellNorm>
                            <TableCellNorm>
                                {product.date}
                            </TableCellNorm>
                            <TableCellNorm>
                                <ButtonTable color="info">
                                    Продал
                                </ButtonTable>
                            </TableCellNorm>
                            <TableCellNorm>
                                <ButtonTable color="info">
                                    Отложить
                                </ButtonTable>
                            </TableCellNorm>
                            <TableCellNorm>
                                <ButtonTable
                                    color="warning"
                                    onClick={() => {
                                        goToFixPage(key)
                                    }}
                                >
                                    Ред.
                                </ButtonTable>
                            </TableCellNorm>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
