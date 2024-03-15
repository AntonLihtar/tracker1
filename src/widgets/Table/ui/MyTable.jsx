import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import cls from "./MyTable.module.scss";
import Button from "@mui/material/Button";
import { useEffect } from "react";

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];


export const MyTable = ({products}) => {

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow className={cls.tableRowHeader}>
                        <TableCell>Название</TableCell>
                        <TableCell align="left">Стоимость</TableCell>
                        <TableCell align="left">Описание</TableCell>
                        <TableCell align="left">Дата создания</TableCell>
                        <TableCell align="left">Состояние</TableCell>
                        <TableCell align="left">Отложить</TableCell>
                        <TableCell align="left">Редактировать</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product) => (
                        <TableRow
                            key={`${product.model}${product.date}${product.imei}`}
                            className={cls.tableRow}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {`${product.brand} ${product.model}`}
                            </TableCell>
                            <TableCell align="left">{product.price}</TableCell>
                            <TableCell align="left">{product.description}</TableCell>
                            <TableCell align="left">{product.date}</TableCell>
                            <TableCell align="left">
                                <Button variant="contained" size="small" color="info">
                                    Продал
                                </Button>
                            </TableCell>
                            <TableCell align="left">
                                <Button variant="contained" size="small" color="info">
                                    Отложить
                                </Button>
                            </TableCell>
                            <TableCell align="left">
                                <Button variant="contained" size="small" color="warning">
                                    Ред.
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
