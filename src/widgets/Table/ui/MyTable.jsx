import * as React from 'react';
import { nanoid } from 'nanoid'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import cls from "./MyTable.module.scss";
import Button from "@mui/material/Button";


export const MyTable = ({ products }) => {

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow className={cls.tableRowHeader}>
                        <TableCell padding="none" sx={{ padding: 1 }}>Название</TableCell>
                        <TableCell align="left" padding="none" sx={{ padding: 1 }}>Стоимость</TableCell>
                        <TableCell align="left" padding="none" sx={{ padding: 1 }}>Описание</TableCell>
                        <TableCell align="left" padding="none" sx={{ padding: 1 }}>Дата создания</TableCell>
                        <TableCell align="left" padding="none" sx={{ padding: 1 }}>Состояние</TableCell>
                        <TableCell align="left" padding="none" sx={{ padding: 1 }}>Отложить</TableCell>
                        <TableCell align="left" padding="none" sx={{ padding: 1 }}>Редактировать</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product) => (
                        <TableRow
                            key={nanoid(6)}
                            className={cls.tableRow}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell
                                component="th"
                                scope="row"
                                padding="none" sx={{ padding: 1 }}
                            >
                                {`${product.brand} ${product.model}`}
                            </TableCell>
                            <TableCell align="left" padding="none"
                                       sx={{ padding: 1 }}
                            >
                                {Number(product.expenses) + Number(product.otherExpenses)}
                            </TableCell>
                            <TableCell align="left" padding="none" sx={{ padding: 1 }}>{product.description}</TableCell>
                            <TableCell align="left" padding="none" sx={{ padding: 1 }}>{product.date}</TableCell>
                            <TableCell align="left" padding="none" sx={{ padding: 1 }}>
                                <Button variant="contained" size="small" color="info" sx={{ fontSize: 12 }}>
                                    Продал
                                </Button>
                            </TableCell>
                            <TableCell align="left" padding="none" sx={{ padding: 1 }}>
                                <Button variant="contained" size="small" color="info" sx={{ fontSize: 12 }}>
                                    Отложить
                                </Button>
                            </TableCell>
                            <TableCell align="left" padding="none" sx={{ padding: 1 }}>
                                <Button variant="contained" size="small" color="warning" sx={{ fontSize: 12 }}>
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
