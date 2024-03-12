import React, { useContext } from 'react';
import cls from "./AddPage.module.scss";
import { FreeSoloCreateOption } from "src/features/FreeSoloCreateOption/index.js";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Context } from "src/main.jsx";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, addDoc, getDocs } from "firebase/firestore";
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


export const AddPage = () => {

    const { auth, db, app } = useContext(Context)
    const [user] = useAuthState(auth)
    const [valueBrand, setValueBrand] = React.useState(null);

    const getBrands = async () => {
        try {

            const querySnapshot = await getDocs(collection(db, "brands"));
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data().title}`);
            });


            // const docRef = await addDoc(collection(db, "brands"), {
            //     first: "Ada",
            //     last: "Lovelace",
            //     born: 1815
            // });
            // console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    getBrands().then(r => console.log())


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
                    label={"Введите бренды"}
                />
                <Button variant="contained">
                    Отправить
                </Button>
            </form>
        </Box>
    );
};

