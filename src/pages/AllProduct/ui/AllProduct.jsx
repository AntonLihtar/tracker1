import React from 'react';
import cls from "./AllProduct.module.scss";
import { Link, Outlet } from "react-router-dom";

export const AllProduct = () => {
    return (
        <div className={cls.AllProduct}>
            <ul>
                <li>
                    <Link to={'1'}>=1=</Link>
                </li>
                <li>
                    <Link to={'2'}>=2=</Link>
                </li>
                <li>
                    <Link to={'3'}>=3=</Link>
                </li>
            </ul>
            <Outlet/>
        </div>
    );
};

