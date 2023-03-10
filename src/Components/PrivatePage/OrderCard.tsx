import c from './PrivatePage.module.scss';
import React, { useEffect, FC, useState } from 'react';
import { OrderType } from '../Types/types';
import { useAppDispatch } from '../../redux/hooks';
import instance from '../../redux/API/api';
import { fetchDeleteOrder } from '../../redux/authSlice';
import OrderProductCard from './OrderProductCard/OrderProductCard';

interface IOrderCard {
    orderId: string
}

export const fetchOrder = async (orderId:string, setOrder:(arg: OrderType) => void) => {
    try {
        const response = await instance.get(`/order/${orderId}`)
        setOrder(response.data)
    } catch (error) {
        console.log(error)
    }
}
const OrderCard: FC<IOrderCard> = ({ orderId }: IOrderCard) => {
    const dispatch = useAppDispatch()
    const [order, setOrder] = useState<OrderType>(null)    

    useEffect(() => {
        fetchOrder(orderId, setOrder)
    }, [orderId])

    if (!order) {
        return null
    }

    const date = new Date(order.createdAt)
    const createDate = date.toLocaleDateString('ru-RU')

    let condition = '';
    switch (order.condition) {
        case 'created':
            condition = 'создан';
            break;
        case 'confirmed':
            condition = 'подтверждён';
            break;
        case 'deleted':
            condition = 'отменён';
            break;
        case 'processed':
            condition = 'в обработке у менеджера';
            break;
    }


    return <div className={c.card}>
        <div>
            <h2>Заказ от {createDate} г.</h2>
            {order.address && <span>Доставка по адресу {order.address}</span>}
        </div>

        <div>
            {order.cart.length} товар
        </div>

        <div>
            Заказ {condition}, {order.paymentMade? 'Оплачен' : 'не оплачен'}.
        </div>

        <div>
            
        </div>

        <div>
        <h3>Товары:</h3>
            {order.cart.map(el => (
                <OrderProductCard key={el.productId} productId={el.productId} />
            ))}
        </div>

        

        <div className={c.deleteOrder}
            onClick={() => dispatch(fetchDeleteOrder(orderId))}>
            Отменить заказ
        </div>
    </div>
}

export default React.memo(OrderCard)

