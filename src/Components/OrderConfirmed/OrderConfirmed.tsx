import c from './OrderConfirmed.module.scss';
import { useEffect, FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Preloader } from '../../assets/common/Preloader/Preloader';
import { selectIsAuth } from '../../redux/authSlice';
import { switchAuthOfferModal } from '../../redux/headerSlice';


export const OrderConfirmed: FC = () => {
    const dispatch = useAppDispatch()
    const isAuth = useAppSelector(selectIsAuth)
    const authLoading = useAppSelector(s => s.auth.loginData.status === 'loading')
    useEffect(() => {
        if (!isAuth) {
            dispatch(switchAuthOfferModal(true));
        }
    }, [dispatch, isAuth])

    const userName = useAppSelector(s => s.auth.loginData.data?.fullName);
    if (authLoading) {
        return <div>
            <Preloader minFormat={true} />
        </div>
    }

    return <div className={c.block}>
        <h1 className={c.header}>
            <div className={c.first}>{userName}, Ваш заказ оформлен! </div>
        </h1>

        <div className={c.wrap}>
            <div>в течение дня с Вами свяжется наш менеджер </div>
            <div>
                <Link to='/myoptis'>перейти к моим заказам</Link>
            </div>
        </div>

    </div>



}
