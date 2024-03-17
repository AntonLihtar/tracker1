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
            <InputLabel id="demo-simple-select-label">Состояние</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={valueState}
                label={"Состояние"}
                onChange={handleValueChange}
            >
                <MenuItem value={'В наличии'}>В наличии</MenuItem>
                <MenuItem value={'Продается'}>Продается</MenuItem>
                <MenuItem value={'Продан'}>Продан</MenuItem>
            </Select>
        </FormControl>
    );
}


