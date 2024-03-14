import React, { useContext, useEffect, useState } from 'react';
import { FreeSoloCreateOption } from "src/features/FreeSoloCreateOption/index.js";
import { Context } from "src/main.jsx";
import { useAuthState } from "react-firebase-hooks/auth";
import { getCollections, getModels, setCollections, setCollectionsToID } from "../api/brandsAPI.js";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import cls from "./AddPage.module.scss";
import { SelectToState } from "src/features/SelectToState/index.js";


//db


export const AddPage = () => {

    const { auth, db, app } = useContext(Context)
    const [user] = useAuthState(auth)

    //модели которых еще нет в базе
    const [valueBrand, setValueBrand] = React.useState(null);
    const [valueModel, setValueModel] = React.useState(null);
    const [valueState, setValueState] = React.useState('in_stock');
    const [valueSImei, setValueImei] = React.useState('');
    const [valueExpenses, setValueExpenses] = React.useState(0);
    const [valueDescription, setValueDescription] = React.useState('');
    const [valueOtherExpenses, setValueOtherExpenses] = React.useState(0);
    const [valuePrice, setValuePrice] = React.useState(0);


    //все модели и бренды в базе
    const [arrBrands, setArrBrands] = useState([])
    const [arrModels, setArrModels] = useState([])
    const [arrModelsElement, setArrModelsElement] = useState([])

    const refreshBrands = async () => {
        const res = await getCollections(db, 'brands')
        setArrBrands(res)
        return 'OK'
    }
    const refreshModels = async () => {
        const res = await getModels(db)
        setArrModels(res)
        return 'OK'
    }

    useEffect(() => {
        //все бренды в консоль (не настроено)
        refreshBrands().then(r => {
        })
        refreshModels().then(r => {
        })

    }, [])

    const getEqual = (el, value) => {
        return el.title.toLowerCase() === value.title.toLowerCase()
    }

    useEffect(() => {
        if (valueBrand) {

            //обнуляем 2рое поле
            setValueModel(null)
            const obj = arrModels.find(el => getEqual(el, valueBrand))
            setArrModelsElement((obj || { models: [] }).models.map(el => {
                return { title: el }
            }))
        }
    }, [valueBrand, arrModels])


    const submitForm = (e) => {
        e.preventDefault()

        /*
        TODO : ВКЛЮЧИТЬ для добавления в базы
        if (valueBrand && !arrBrands.find(el => getEqual(el, valueBrand))) {
            setCollections(db, 'brands', valueBrand)
                .then(r => {
                    console.log(`Запись в базу brands: title = ${valueBrand.title}; ID = `, r)
                    refreshBrands().then(r => console.log('Обновление brands', r))
                })
        }

        if (valueModel && !arrModelsElement.find(el => getEqual(el, valueModel))) {

            setCollectionsToID(db,
                valueBrand.title,
                { models: [...arrModelsElement.map(el => el.title), valueModel.title] })
                .then(r => console.log(`Запись в базу models:  id = ${valueBrand.title}`, r))
        }
        refreshModels().then(r => console.log('Обновление models', r))

        */

        console.log('valueBrand', valueBrand)
        console.log('valueModel', valueModel)
        console.log('valueState', valueState)
        console.log('valueSImei', valueSImei)
        console.log('valueExpenses', valueExpenses)
        console.log('valueDescription', valueDescription)
        console.log('valueOtherExpenses', valueOtherExpenses)
        console.log('valuePrice', valuePrice)
    }


    return (
        <Box
            // height={200}
            width={1.0}
            my={4}
            display="flex"
            alignItems="center"
            flexDirection="column"
            gap={4}
            p={2}
            sx={{ border: '2px solid grey' }}>
            <h2>Товар</h2>

            <form
                action=""
                className={cls.form}
                onSubmit={submitForm}
            >

                <FreeSoloCreateOption
                    options={arrBrands}
                    valueState={valueBrand}
                    setValueState={setValueBrand}
                    label={"Бренд"}
                />

                <FreeSoloCreateOption
                    options={arrModelsElement}
                    valueState={valueModel}
                    setValueState={setValueModel}
                    label={"Модель"}
                    disabled={!valueBrand}
                />

                <SelectToState
                    valueState={valueState}
                    setValueState={setValueState}
                />

                <TextField
                    id="outlined-basic"
                    label="IMEI"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    value={valueSImei}
                    onChange={(event) => {
                        setValueImei(event.target.value)
                    }}
                />


                <TextField
                    id="outlined-number"
                    label="Стоимость"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={valueExpenses}
                    onChange={(event) => {
                        setValueExpenses(Number(event.target.value))
                    }}
                />

                <TextField
                    multiline
                    rows={5}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    id="outlined-basic"
                    label="Описание / доп расходы"
                    variant="outlined"
                    value={valueDescription}
                    onChange={(event) => {
                        setValueDescription(event.target.value)
                    }}
                />

                <TextField
                    id="outlined-number"
                    label="Стоимость доп расходов"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={valueOtherExpenses}
                    onChange={(event) => {
                        setValueOtherExpenses(Number(event.target.value))
                    }}
                />

                <TextField
                    id="outlined-number"
                    label="Цена продажи"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={valuePrice}
                    onChange={(event) => {
                        setValuePrice(Number(event.target.value))
                    }}
                />

                <Button
                    sx={{ margin: 4 }}
                    variant="contained"
                    type="submit"
                    disabled={!(valueBrand && valueModel)}
                >
                    Отправить
                </Button>
            </form>
        </Box>
    );
};

