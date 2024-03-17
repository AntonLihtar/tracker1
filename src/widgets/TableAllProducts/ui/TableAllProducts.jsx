import React, { useMemo } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import cls from "./MyTableAllProduct.module.scss";
import { TableCellBold } from "src/shared/ui/TableCellBold/TableCellBold.jsx";
import { TableCellNorm } from "src/shared/ui/TableCellNorm/TableCellNorm.jsx";
import { ButtonTable } from "src/shared/ui/ButtonTable/ButtonTable.jsx";
import { setBackgroundColor } from "src/shared/lib/setBackgroundColor/setBackgroundColor.js";


export const TableAllProducts = ({ products }) => {

    const tableCellTitle = useMemo(() => [
        'Бренд', 'Модель', 'Состояние', 'Imei', 'Описание', 'Стоимость', 'Доп затраты', 'Общая стоимость',
        'Дата создания', 'Цена продажи', 'Дата продажи', 'Маржа', 'Ред.', 'Удалить'
    ], [])

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
                    {products.map((product) => (
                        <TableRow
                            key={product.id}
                            className={cls.tableRow}
                            sx={{
                                '&:last-child td, &:last-child th': { border: 0 },
                                backgroundColor: setBackgroundColor(product.state)
                        }}
                        >
                            <TableCellNorm component="th" scope="row">
                                {product.brand}
                            </TableCellNorm>
                            <TableCellNorm>
                                {product.model}
                            </TableCellNorm>
                            <TableCellNorm>
                                {product.state}
                            </TableCellNorm>
                            <TableCellNorm>
                                {product.imei}
                            </TableCellNorm>
                            <TableCellNorm>
                                {product.description}
                            </TableCellNorm>
                            <TableCellNorm>
                                {product.expenses}
                            </TableCellNorm>
                            <TableCellNorm>
                                {product.otherExpenses}
                            </TableCellNorm>
                            <TableCellBold>
                                {Number(product.expenses) + Number(product.otherExpenses)}
                            </TableCellBold>
                            <TableCellNorm>
                                {product.date}
                            </TableCellNorm>
                            <TableCellNorm>
                                {product.price}
                            </TableCellNorm>

                            <TableCellNorm>
                                {product.dateSale || 'нет'}
                            </TableCellNorm>

                            <TableCellBold>
                                {Number(product.price) - Number(product.expenses) - Number(product.otherExpenses)}
                            </TableCellBold>

                            <TableCellNorm>
                                <ButtonTable color="warning">
                                    Ред.
                                </ButtonTable>
                            </TableCellNorm>

                            <TableCellNorm>
                                <ButtonTable color="error">
                                    Удалить
                                </ButtonTable>
                            </TableCellNorm>


                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
