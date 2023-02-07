import c from './OrderHeader.module.scss';
import { FC } from 'react';
import React from 'react';

interface IOrderHeader {
    children: React.ReactNode
}

export const OrderHeader: FC<IOrderHeader> = (props : IOrderHeader) => {

    return <h1 className={c.header}>
            {props.children}
        </h1>
    
}
