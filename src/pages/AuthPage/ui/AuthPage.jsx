import React from 'react';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import Button from '@mui/material/Button';
import { classNames } from "src/shared/lib/classNames/classNames.js";

import cls from "./AuthPage.module.scss";

export const AuthPage = ({auth}) => {

    const provider = new GoogleAuthProvider();

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

