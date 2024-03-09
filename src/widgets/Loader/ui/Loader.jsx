import * as React from 'react';
import cls from './Loader.module.scss'


export const Loader = () => {


    return (
        <div className={cls.Loader}>
            <div className={cls.lds_roller}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}
