import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions();

export const FreeSoloCreateOption = ({ options, valueState, setValueState, label }) => {

    return (
        <Autocomplete
            value={valueState}
            onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                    setValueState({
                        title: newValue,
                    });
                } else if (newValue && newValue.inputValue) {
                    // Create a new value from the user input
                    setValueState({
                        title: newValue.inputValue,
                    });
                } else {
                    setValueState(newValue);
                }
            }}
            //ищет по списку и выводит в селекте
            filterOptions={(options, params) => {
                const filtered = filter(options, params);

                const { inputValue } = params;
                // Suggest the creation of a new value
                const isExisting = options.some((option) => inputValue === option.title);
                if (inputValue !== '' && !isExisting) {
                    filtered.push({
                        inputValue,
                        title: `Add "${inputValue}"`,
                    });
                }
                return filtered;
            }}

            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id="free-solo-with-text-demo"
            options={options}
            //перебор массива
            getOptionLabel={(option) => {
                // Значение, выбранное с помощью ввода, прямо из ввода
                if (typeof option === 'string') {
                    return option;
                }
                // Добавить опцию «xxx», созданную динамически.
                if (option.inputValue) {
                    return option.inputValue;
                }
                // Regular option(Обычный вариант)
                return option.title;
            }}
            renderOption={(props, option) => <li {...props}>{option.title}</li>}
            sx={{ width: 300 }}
            freeSolo
            //placeholder
            renderInput={(params) => (
                <TextField {...params} label={label}/>
            )}
        />
    );
}


