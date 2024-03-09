import React, { useContext } from 'react';
import { classNames } from "src/shared/lib/classNames/classNames.js";
import Button from '@mui/material/Button';
import cls from "./AuthPage.module.scss";
import { Context } from "src/main.jsx";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export const AuthPage = () => {

    const provider = new GoogleAuthProvider();
    const {auth} = useContext(Context)

    const login = async () => {
        const {user} = await signInWithPopup(auth, provider)
        if (user) {
            console.log('ВЫ авторизованы')
        }
    }

    return (
        <div className={classNames(cls.AuthPage)}>
            <div className={cls.centerBlock}>
                <h1>
                    Hello
                </h1>
                <h2>
                    A am tracker1
                </h2>
                <Button variant="outlined" onClick={login}>
                    Войти через гугл
                </Button>
            </div>


        </div>
    );
};

