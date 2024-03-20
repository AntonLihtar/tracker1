import React, { useState } from 'react';
import Box from "@mui/material/Box";
import { TableAllProducts } from "src/widgets/TableAllProducts/index.js";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "src/pages/HomePage/selectors/getProducts.js";
import { deleteDoc, doc } from "firebase/firestore";
import { useOutletContext } from "react-router-dom";
import { Modal } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { getCollectionThunk } from "src/pages/HomePage/model/api/requestsFirebase.js";

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


export const AllProduct = () => {

    const { db } = useOutletContext()
    const dispatch = useDispatch()

    //модалка
    const [openModal, setOpenModal] = useState(false)
    const products = useSelector(getAllProducts)

    const [idProduct, setIdProduct] = useState('')
    const [nameProduct, setNameProduct] = useState('')


    const deleteProduct = (id, nameProduct) => {
        setOpenModal(true)
        setIdProduct(id)
        setNameProduct(nameProduct)
    }

    const closeBtnGoHome = () => {
        setOpenModal(false)
    }

    const delToId = async () => {
        await deleteDoc(doc(db, "products", idProduct));
        console.log(`product DELETE for ${idProduct}`)
        setOpenModal(false)
        dispatch(getCollectionThunk(db))
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
                padding: { xs: 0, md: 2 },
                border: { xs: 'none', md: '2px solid grey' }
            }}
        >
            <h2>Все товары</h2>
            <TableAllProducts products={products} deleteProduct={deleteProduct}/>

            <Modal
                open={openModal}
                onClose={closeBtnGoHome}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Удалить <br/>
                        <b>{nameProduct}</b>
                    </Typography>
                    <Box display="flex" gap={2} >
                        <Button
                            size="large"
                            variant="contained"
                            onClick={delToId}
                        >
                            Удалить
                        </Button>

                        <Button
                            size="large"
                            variant="contained"
                            onClick={closeBtnGoHome}
                        >
                            Отмена
                        </Button>
                    </Box>
                </Box>
            </Modal>

        </Box>
    );
};

