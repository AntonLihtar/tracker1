import React, { useEffect, useState } from 'react';

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { InputAdornment, Modal } from "@mui/material";

import { SelectToState } from "src/features/SelectToState/index.js";
import cls from "./FixPage.module.scss";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { getAllProducts } from "src/pages/HomePage/selectors/getProducts.js";
import { setProductToID } from "src/pages/FixPage/api/brandsAPI.js";


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


export const FixPage = () => {

    const { db } = useOutletContext();
    const navigate = useNavigate();

    const location = useLocation();
    const id = location.pathname.slice(5)
    const products = useSelector(getAllProducts)

    //при неправильном id отправляем на главную
    useEffect(() => {
        if (products && !products[id]) {
            navigate('/')
        }
    }, []);

    const product = products[id]

    //модели которых еще нет в базе
    const [valueState, setValueState] = React.useState(product?.state);
    const [valueImei, setValueImei] = React.useState(product?.imei);
    const [valueExpenses, setValueExpenses] = React.useState(product?.expenses);
    const [valueDescription, setValueDescription] = React.useState(product?.description);
    const [valueOtherExpenses, setValueOtherExpenses] = React.useState(product?.otherExpenses);
    const [valuePrice, setValuePrice] = React.useState(product?.price);

    //модалка
    const [openModal, setOpenModal] = useState(false)


    const submitForm = (e) => {
        e.preventDefault()

        setProductToID(db, id, {
            ...product,
            state: valueState,
            imei: valueImei,
            expenses: valueExpenses,
            description: valueDescription,
            otherExpenses: valueOtherExpenses,
            price: valuePrice,
        }).then(r => {
            setOpenModal(true)
            setTimeout(() => {
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
        <>
            {product && (
                <Box
                    width={1.0}
                    my={4}
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                    gap={3}
                    sx={{
                        padding: { xs: 0, sm: 2 },
                        border: { xs: 'none', sm: '2px solid grey' }
                    }}
                >

                    <h2 className={cls.title}>Редактирование</h2>

                    <div className={cls.brand}>
                        {`${product.brand} ${product.model}`}
                    </div>

                    <form
                        action=""
                        className={cls.form}
                        onSubmit={submitForm}
                    >

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
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">руб</InputAdornment>,
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
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">руб</InputAdornment>,
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
                            InputProps={{
                                endAdornment: <InputAdornment position="end">руб</InputAdornment>,
                            }}
                            value={valuePrice}
                            onChange={(event) => {
                                setValuePrice(Number(event.target.value))
                            }}
                        />

                        <Button
                            sx={{ margin: 4, marginBottom: 0, marginTop: 1 }}
                            variant="contained"
                            type="submit"
                            // disabled={}
                        >
                            Сохранить
                        </Button>
                        <Button
                            sx={{ margin: 4, marginTop: 0 }}
                            variant="contained"
                            type="button"
                            color="error"
                            onClick={() => navigate(-1)}
                        >
                            Отмена
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
                                Данные сохранены
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
                </Box>)}
        </>
    )
}

