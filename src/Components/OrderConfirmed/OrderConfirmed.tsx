import c from './OrderConfirmed.module.scss';
import { useEffect, FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { Preloader } from '../../assets/common/Preloader/Preloader';

interface IOrderConfirmed {
    switchModal: (arg: Boolean) => void;
    authIsLoading: string
    isAuth: boolean
}

export const OrderConfirmed: FC<IOrderConfirmed> = ({ switchModal, authIsLoading, isAuth }: IOrderConfirmed) => {
    
    useEffect(() => {
        if (!isAuth) {
            switchModal(true);
        }
    }, [switchModal, isAuth])

    const userName = useAppSelector(s => s.auth.loginData.data?.fullName);
    if (authIsLoading === 'loading') {
        return <div><Preloader minFormat={true} /></div>;
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
