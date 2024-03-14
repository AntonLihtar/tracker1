import React from 'react';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { FormControl, InputLabel, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";


export const SelectToState = ({valueState,setValueState }) => {

    //handler to select
    const handleValueChange = (event) => {
        setValueState(event.target.value);
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">состояние</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={valueState}
                label={"состояние"}
                onChange={handleValueChange}
            >
                <MenuItem value={'in_stock'}>В наличии</MenuItem>
                <MenuItem value={'for_sale'}>Продается</MenuItem>
                <MenuItem value={'sold'}>Продан</MenuItem>
            </Select>
        </FormControl>
    );
}


