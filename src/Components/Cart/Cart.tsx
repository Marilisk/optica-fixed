import c from './Cart.module.scss';
import React, { useEffect, FC } from 'react';
import { Preloader } from '../../assets/common/Preloader/Preloader';
import { NavLink, useNavigate } from 'react-router-dom';
import { CartProductCard } from './ProductCard/CartProductCard';
import { fetchUpdateCart } from '../../redux/authSlice';
import { ICartItem } from '../Types/types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { CartTotal } from './CartTotal/CartTotal';

interface CartProps {
    switchModal: (arg: Boolean) => void;
    removeFromFavorites: (arg: number) => void;
    userFavorites: Array<number>;   //userFavorites: number[];
    authIsLoading: string;
}

export const Cart: FC<CartProps> = ({ switchModal, removeFromFavorites, userFavorites, authIsLoading }: CartProps,) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userCart/* :ICartItem[] */ = useAppSelector<ICartItem[]>(state => state.auth.loginData.data.cart);

    useEffect(() => {
        if (!userCart) {
            switchModal(true);
            //navigate('/');
        }
    }, [userCart.length, switchModal, userCart])


    useEffect(() => {
        return () => {
            dispatch(fetchUpdateCart());
        }
    }, [dispatch])

    let goodsCount: number = 0;
    userCart.forEach(elem => {
        goodsCount += elem.quantity
    })

    const confirmOrder = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log(e.clientX)
        console.log(userCart);
        const n = 456123;
        navigate(`/order/${n}`);
    }
    if (userCart == null) {
        return <Preloader minFormat={true} />;
    }

    return <>
        <h1 className={c.header}>
            <div>Корзина</div>
        </h1>
        <div>

            {userCart?.map((cartItem, i: number) => <CartProductCard key={i}
                cartItem={cartItem}
                authIsLoading={authIsLoading}
                cartItemIndex={i} />)}

        </div>

        <h2 className={c.header}>
            <div>Итого:</div>
        </h2>

        <div className={c.beforeConfirm}>
            <CartTotal goodsCount={goodsCount} />
        </div>

        <div>
            <button onClick={(e) => confirmOrder(e)}>
                подтвердить заказ
            </button>
            <NavLink to='order'>Подтверждение заказа</NavLink>
        </div>

    </>



}
