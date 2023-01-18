import c from './Order.module.scss';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


export const Order = ({ isAuth, removeFromFavorites, userFavorites, authIsLoading }) => {

    const navigate = useNavigate();


    useEffect(() => {
        /* if (!isAuth) {
            navigate('/');
        } */
    })
    if (!userFavorites || !userFavorites.length) {

    }

    return <>
        <h1 className={c.header}>
            <div>Подтверждение заказа</div>
        </h1>
        <div className={c.flex}>
            
            <div className={c.address}>

            </div>

        </div>
    </>
}
