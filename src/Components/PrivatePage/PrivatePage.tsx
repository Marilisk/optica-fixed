import c from './PrivatePage.module.scss';
import { useEffect, FC } from 'react';
import { LoadingStatusEnum } from '../Types/types';
import { useAppSelector } from '../../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { OrderCard } from './OrderCard';

interface IPrivatePage {
    authIsLoading: string
    isAuth: boolean
}

export const PrivatePage: FC<IPrivatePage> = ({ authIsLoading, isAuth }: IPrivatePage) => {
    const userName = useAppSelector(s => s.auth.loginData.data?.fullName);
    const orders = useAppSelector(s => s.auth.loginData.data?.orders)

    const navigate = useNavigate()
    useEffect( () => {
        if (!isAuth) {
            navigate('/login')
        }
    })
    
    if (authIsLoading === LoadingStatusEnum.loading || !orders ) {
        return <div><h2>{userName}, у вас пока нет заказов...</h2></div>;
    }

    const elements = orders.map((order, i) => {
        return <OrderCard key={i} orderId={order} />
    })


    return <>
        <h1 className={c.header}>
            <div>Личный кабинет</div>
        </h1>

        <div className={c.wrapper}>
            {elements}
        </div>
    </>



}
