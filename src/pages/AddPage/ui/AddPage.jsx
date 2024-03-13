import React, { useContext } from 'react';
import cls from "./AddPage.module.scss";
import { FreeSoloCreateOption } from "src/features/FreeSoloCreateOption/index.js";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Context } from "src/main.jsx";
import { useAuthState } from "react-firebase-hooks/auth";
import { getBrands } from "../api/brandsAPI.js";
//db
const top100Films = [
    { title: 'The Godfather', id: 1 },
    { title: 'The Godfather: Part II', id: 2 },
    { title: 'The Dark Knight', id: 3 },
    { title: '12 Angry Men', id: 4 },
    { title: "Schindler's List", id: 5 },
    { title: 'Pulp Fiction', id: 6 },
    { title: 'Fight Club', id: 7 },
    { title: 'Forrest Gump', id: 8 },
    { title: 'Inception', id: 9 }
]

const models = [
    { title: 'a60', id: 1 },
    { title: 'Galaxy Noote', id: 2 },
    { title: 'Galaxy S6', id: 3 },
    { title: 'm12', id: 4 },
    { title: "a30", id: 5 },
    { title: 'ssssss', id: 6 },
    { title: 'ttt-14', id: 7 },
    { title: '111r', id: 8 },
    { title: 'jopa', id: 9 }
]


export const AddPage = () => {

    const { auth, db, app } = useContext(Context)
    const [user] = useAuthState(auth)
    const [valueBrand, setValueBrand] = React.useState(null);
    const [valueModel, setValueModel] = React.useState(null);

    //все бренды в  консоль (не настроено)
    getBrands(db).then(r => console.log())


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
            <h1>Add PAGE</h1>

            <form
                action=""
                className={cls.form}
                onSubmit={() => {
                }}
            >
                Бренды
                <FreeSoloCreateOption
                    options={top100Films}
                    valueState={valueBrand}
                    setValueState={setValueBrand}
                    label={"Введите бренд"}
                />
                <FreeSoloCreateOption
                    options={models}
                    valueState={valueModel}
                    setValueState={setValueModel}
                    label={"Введите модель"}
                />
                <Button variant="contained">
                    Отправить
                </Button>
            </form>
        </Box>
    );
};

