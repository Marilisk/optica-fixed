import c from './PrivatePage.module.scss';
import { useEffect, FC } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { useNavigate } from 'react-router-dom';
import OrderCard from './OrderCard';
import { selectIsAuth } from '../../redux/authSlice';


export const PrivatePage: FC = () => {
    const userName = useAppSelector(s => s.auth.loginData.data?.fullName);
    const orders = useAppSelector(s => s.auth.loginData.data?.orders)
    const isAuth = useAppSelector(selectIsAuth)
    const authIsLoading = useAppSelector(s => s.auth.loginData.status === 'loading')

    const navigate = useNavigate()
    useEffect(() => {
        if (!isAuth) {
            navigate('/login')
        }
    }, [isAuth, navigate])

    if (authIsLoading || !orders || !orders.length ) {
        return <h1 className={c.header}>
            <div>{userName}, у вас пока нет заказов...</div>
        </h1>
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
