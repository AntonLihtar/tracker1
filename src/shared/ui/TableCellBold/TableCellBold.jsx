import React from 'react';
import TableCell from "@mui/material/TableCell";

export const TableCellBold = (props) => {
    return (
        <TableCell
            align="left"
            padding="none"
            sx={{ padding: 1, fontWeight:600 }}
            {...props}
        >
            {props.children}
        </TableCell>
    );
};
