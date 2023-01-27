import c from './Cart.module.scss';
import { useEffect, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartProductCard } from './ProductCard/CartProductCard';
import { fetchUpdateCart } from '../../redux/authSlice';
import { ICartItem } from '../Types/types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { CartTotal } from './CartTotal/CartTotal';
import { PromoCodeForm } from './PromoCodeForm/PromoCodeForm';
import { CartConfirmBtns } from './CartConfirmBtns/CartConfirmBtns';

interface CartProps {
    switchModal: (arg: Boolean) => void;
    removeFromFavorites: (arg: number) => void;
    userFavorites: Array<number>;   //userFavorites: number[];
    authIsLoading: string
    isAuth: boolean
}

export const Cart: FC<CartProps> = ({ switchModal, removeFromFavorites, userFavorites, authIsLoading, isAuth }: CartProps,) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    

    useEffect(() => {
        if (!isAuth) {
            switchModal(true);
        }
    }, [switchModal , isAuth])

    const userCart = useAppSelector<ICartItem[]>(state => state.auth.loginData.data?.cart);
    const userName = useAppSelector(s => s.auth.loginData.data?.fullName);

    const editCart = () => {
        dispatch(fetchUpdateCart());
    }

    const confirmOrder = () => {
        //console.log(userCart);
        navigate(`/order`);
    }
    if (!userCart || authIsLoading === 'loading') {
        return <div><h2>{userName}, в вашей корзине пока нет товаров...</h2></div>;
    }
    
    let goodsCount: number = 0;
    userCart.forEach(elem => {
        goodsCount += elem.quantity
    })

    return <>
        <h1 className={c.header}>
            <div>Корзина</div>
        </h1>
        <div>

            {userCart?.map((cartItem, i: number) => <CartProductCard key={i}
                cartItem={cartItem}
                authIsLoading={authIsLoading}
                cartItemIndex={i}
                editCart={editCart}
            />)}

        </div>

        <h2 className={c.header}>
            <div>Итого:</div>
        </h2>

        <div className={c.beforeConfirm}>
            <div>
                <PromoCodeForm />
                <CartConfirmBtns confirmOrder={confirmOrder} authIsLoading={authIsLoading} navigate={navigate} />
            </div>
            <CartTotal goodsCount={goodsCount} userCartLength={userCart.length} />

        </div>

    </>



}
