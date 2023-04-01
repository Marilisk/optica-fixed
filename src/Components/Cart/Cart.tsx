import c from './Cart.module.scss';
import { useEffect, FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartProductCard } from './ProductCard/CartProductCard';
import { fetchCreateOrder, fetchUpdateCart, selectIsAuth } from '../../redux/authSlice';
import { CatEnum, ICartItem } from '../Types/types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { CartTotal } from './CartTotal/CartTotal';
import { PromoCodeForm } from './PromoCodeForm/PromoCodeForm';
import { CartConfirmBtns } from './CartConfirmBtns/CartConfirmBtns';
import { CartLensCard } from './CartLensCard/CartLensCard';
import { Preloader } from '../../assets/common/Preloader/Preloader';
import { switchAuthOfferModal } from '../../redux/headerSlice';
import { fetchCollectCartPrices, setProcessedOrder } from '../../redux/productsSlice';
import { IInitialValues, initValues } from './Order/Address/initialValues';

interface CartProps {
    switchModal: (arg: Boolean) => void
    removeFromFavorites: (arg: number) => void
    userFavorites: Array<number>
    authIsLoading: string
}

export const Cart: FC<CartProps> = ({ switchModal, removeFromFavorites, userFavorites, authIsLoading }: CartProps,) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isAuth = useAppSelector(selectIsAuth)

    let userCart = useAppSelector<ICartItem[]>(state => state.auth.loginData.data?.cart)
    const userName = useAppSelector(s => s.auth.loginData.data?.fullName);
    if (!isAuth) {
        userCart = JSON.parse(localStorage.getItem('cart'))
        //console.log(userCart)
    }
    useEffect(() => {
        if (!isAuth) {
            dispatch(switchAuthOfferModal(true));
        }
    }, [dispatch, isAuth])


    const editCart = () => {
        dispatch(fetchUpdateCart());
    }
    const iValues: IInitialValues = initValues(userName);

    const editOrder =  async () => {
        const cart = await dispatch(fetchCollectCartPrices())
        if (cart.meta.requestStatus === 'fulfilled') {
            try {
                try {
                    const order = await dispatch(fetchCreateOrder(iValues))
                    dispatch(setProcessedOrder(order.payload))
                } catch (error) {
                    console.log('error in setting processed Order', error)
                }
            } catch (error) {
                console.log('error in prices collecting', error)
            }
        }
    }

    const confirmOrder = () => {
        if (!isAuth) {
            switchModal(true)
        } else {
            editOrder()
            navigate(`/order`);
        }
    }
    if (authIsLoading === 'loading') {
        return <Preloader minFormat={true} />
    } else if (!userCart || !userCart.length) {
        return <div className={c.nthFound}>
            <h2>
                <div>{userName && `${userName}, `} Пока ничего нет...</div>
            </h2>
            <Link to='/'>Перейти в каталог</Link>
        </div>
    }

    let goodsCount: number = 0;
    userCart.forEach(elem => {
        goodsCount += elem.quantity
    })

    return <div className={c.wrap}>
        <h1 className={c.header}>
            <div>Корзина</div>
        </h1>
        <div>

            {userCart?.map((cartItem, i: number) => {

                if (cartItem.cat === CatEnum.eyewear) {
                    return <CartProductCard key={i}
                        cartItem={cartItem}
                        authIsLoading={authIsLoading}
                        cartItemIndex={i}
                        editCart={editCart}
                        isAuth={isAuth}
                        switchModal={switchModal} />
                } else {
                    return <CartLensCard key={i}
                        cartItem={cartItem}
                        authIsLoading={authIsLoading}
                        cartItemIndex={i}
                        editCart={editCart}
                        isAuth={isAuth}
                        switchModal={switchModal} />
                }
            }
            )}

        </div>

        <h2 className={c.header}>
            <div>Итого:</div>
        </h2>

        <div className={c.beforeConfirm}>
            <div>
                <PromoCodeForm />
                <CartConfirmBtns confirmOrder={confirmOrder} authIsLoading={authIsLoading}
                    navigate={navigate} />
            </div>

            <CartTotal goodsCount={goodsCount} userCartLength={userCart.length} />

        </div>

    </div>

}
