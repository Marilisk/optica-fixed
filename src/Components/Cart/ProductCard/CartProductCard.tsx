import c from './CartProductCard.module.scss';
import { useEffect, useState, FC } from 'react';
import instance from '../../../redux/API/api';
import { Preloader } from '../../../assets/common/Preloader/Preloader.jsx';
import { ICartItem, IProduct } from '../../Types/types';
import { LeftCol } from '../LeftCol/LeftCol';
import { RightCol } from '../RightCol/RightCol';
import { useAppDispatch } from '../../../redux/hooks';
import { pushPriceToTotal } from '../../../redux/authSlice';

interface CartProductCardProps {
    cartItem: ICartItem
    authIsLoading: string
    cartItemIndex: number
    editCart: () => void
    isAuth: boolean
    switchModal: (arg: Boolean) => void
}

export const CartProductCard: FC<CartProductCardProps> = ({ cartItem, authIsLoading, cartItemIndex, 
                                                            editCart, isAuth, switchModal }: CartProductCardProps,) => {
    const dispatch = useAppDispatch();
    const [product, setProduct] = useState<IProduct | null>();
    

    useEffect(() => {
        async function fetchData() {
            const response = await instance.get(`/products/${cartItem.productId}`);
            setProduct(response.data);
            dispatch(pushPriceToTotal({
                id: cartItem.productId,
                sum: (response.data.price * cartItem.quantity)
            })) // получаем актуальную сумму товаров в корзине для компонента CartTotal
        }
        fetchData();
    }, [cartItem.productId, cartItem.quantity, dispatch]);

    if (!product) {
        return <Preloader minFormat={true} />;
    }


    return <div className={c.wrap} >

        <LeftCol productId={cartItem.productId} imageUrlMain={product.imageUrl.main} />

        <RightCol product={product}
            cartItem={cartItem}
            authIsLoading={authIsLoading}
            cartItemIndex={cartItemIndex}
            editCart={editCart}
            isAuth={isAuth}
            switchModal={switchModal} />

    </div>
}