import React, { useEffect, useState } from 'react';
import { FreeSoloCreateOption } from "src/features/FreeSoloCreateOption/index.js";
import { getCollections, getModels, setCollections, setCollectionsToID } from "../api/brandsAPI.js";
import { nanoid } from 'nanoid'

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { InputAdornment, Modal } from "@mui/material";

import { SelectToState } from "src/features/SelectToState/index.js";
import cls from "./AddPage.module.scss";
import { useNavigate, useOutletContext } from "react-router-dom";
import Typography from "@mui/material/Typography";


//db

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 3,
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
};


export const AddPage = () => {

    const {app, db, auth} =  useOutletContext();

    const navigate = useNavigate();

    //модели которых еще нет в базе
    const [valueBrand, setValueBrand] = React.useState(null);
    const [valueModel, setValueModel] = React.useState(null);
    const [valueState, setValueState] = React.useState('В наличии');
    const [valueImei, setValueImei] = React.useState('');
    const [valueExpenses, setValueExpenses] = React.useState(0);
    const [valueDescription, setValueDescription] = React.useState('');
    const [valueOtherExpenses, setValueOtherExpenses] = React.useState(0);
    const [valuePrice, setValuePrice] = React.useState(0);

    //модалка
    const [openModal, setOpenModal] = useState(false)

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

        /* TODO : ВКЛЮЧИТЬ для добавления в базы*/
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

        const dateDay = new Date().toLocaleString().slice(0, 10)

        setCollections(db, 'products', {
            brand: valueBrand.title,
            model: valueModel.title,
            state: valueState,
            imei: valueImei,
            expenses: valueExpenses,
            description: valueDescription,
            otherExpenses: valueOtherExpenses,
            price: valuePrice,
            date: dateDay,
            dateSale: '',
            id: nanoid(6)
        }).then(r => {
            setOpenModal(true)
            setTimeout(()=>{
                setOpenModal(false)
                navigate('/')
            }, 3000)
        })
    }

    const closeBtnGoHome = () => {
        setOpenModal(false)
        navigate('/')
    }

    return (
        <Box
            width={1.0}
            my={4}
            display="flex"
            alignItems="center"
            flexDirection="column"
            gap={4}
            sx={{
                padding: { xs: 0, sm: 2 },
                border: { xs: 'none', sm: '2px solid grey' }
            }}
        >
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
                    value={valueImei}
                    onChange={(event) => {
                        setValueImei(event.target.value)
                    }}
                />


                <TextField
                    id="outlined-number"
                    label="Стоимость"
                    type="number"
                    InputProps={{
                        endAdornment: <InputAdornment position="end">руб</InputAdornment>,
                    }}
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
                    label="Комплект / описание / доп расходы"
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
                    InputProps={{
                        endAdornment: <InputAdornment position="end">руб</InputAdornment>,
                    }}
                    onChange={(event) => {
                        setValueOtherExpenses(Number(event.target.value))
                    }}
                />

                <TextField
                    id="outlined-number"
                    label="Цена продажи"
                    type="number"
                    InputProps={{
                        endAdornment: <InputAdornment position="end">руб</InputAdornment>,
                    }}
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
            <Modal
                open={openModal}
                onClose={closeBtnGoHome}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Данные отправлены
                    </Typography>
                    <Button
                        size="large"
                        variant="contained"
                        onClick={closeBtnGoHome}
                    >
                        Ок
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
};

