import c from './PrivatePage.module.scss';
import { useEffect, FC, useState } from 'react';
import { LoadingStatusEnum, OrderType } from '../Types/types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import instance from '../../redux/API/api';
import { Preloader } from '../../assets/common/Preloader/Preloader';
import { fetchDeleteOrder } from '../../redux/authSlice';

interface IPrivatePage {
    switchModal: (arg: Boolean) => void;
    authIsLoading: string
    isAuth: boolean
}

interface IOrderCard {
    orderId: string
}

export const fetchOrder = async (orderId:string, setOrder:(arg: OrderType) => void) => {
    try {
        const response = await instance.get(`/order/${orderId}`)
        //console.log(response.data)
        setOrder(response.data)
    } catch (error) {
        console.log(error)
    }
}
export const OrderCard: FC<IOrderCard> = ({ orderId }: IOrderCard) => {
    const dispatch = useAppDispatch()

    const [order, setOrder] = useState<OrderType>(null)    

    useEffect(() => {
        fetchOrder(orderId, setOrder)
    }, [orderId])

    
    if (!order) {
        return <Preloader minFormat={true} />
    }

    const date = new Date(order.createdAt)
    const createDate = date.toLocaleDateString('ru-RU')

    let condition = '';
    switch (order.condition) {
        case 'created':
            condition = 'Создан';
            break;
        case 'confirmed':
            condition = 'Подтверждён';
            break;
        case 'deleted':
            condition = 'Отменён';
            break;
        case 'processed':
            condition = 'в обработке у менеджера';
            break;
    }


    return <div className={c.card}>
        <div>
            Заказ от {createDate} г.
            {/* Доставка по адресу {order.address} */}
        </div>

        <div>
            {condition}
        </div>

        <div>
            {order.paymentMade? 'Оплачен' : 'Не оплачен'}
        </div>

        <div className={c.deleteOrder}
            onClick={() => dispatch(fetchDeleteOrder(orderId))}>
            Отменить заказ
        </div>
    </div>
}

export const PrivatePage: FC<IPrivatePage> = ({ switchModal, authIsLoading, isAuth }: IPrivatePage) => {

    useEffect(() => {
        if (!isAuth) {
            switchModal(true);
        }
    }, [switchModal, isAuth])

    const userName = useAppSelector(s => s.auth.loginData.data?.fullName);
    const orders = useAppSelector(s => s.auth.loginData.data.orders)

    

    if (authIsLoading === LoadingStatusEnum.loading) {
        return <div><h2>{userName}, в вашей корзине пока нет товаров...</h2></div>;
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
