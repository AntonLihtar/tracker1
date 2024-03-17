import React from 'react';
import Button from "@mui/material/Button";

export const ButtonTable = (props) => {
    return (
        <Button
            variant="contained"
            size="small"
            color="info"
            sx={{ fontSize: 12 }}
            {...props}
        >
            {props.children}
        </Button>
    );
};
