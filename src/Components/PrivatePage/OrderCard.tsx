import c from './PrivatePage.module.scss';
import { useEffect, FC, useState } from 'react';
import { OrderType } from '../Types/types';
import { useAppDispatch } from '../../redux/hooks';
import instance from '../../redux/API/api';
import { Preloader } from '../../assets/common/Preloader/Preloader';
import { fetchDeleteOrder } from '../../redux/authSlice';



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
