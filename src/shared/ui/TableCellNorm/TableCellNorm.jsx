import React from 'react';
import TableCell from "@mui/material/TableCell";

export const TableCellNorm = (props) => {

    return (
        <TableCell
            align="left"
            padding="none"
            sx={{ padding: 1}}
            {...props}
        >
            {props.children}
        </TableCell>
    );
};
