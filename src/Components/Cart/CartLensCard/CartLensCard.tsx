import c from './CartLensCard.module.scss';
import { useEffect, useState, FC } from 'react';
import instance from '../../../redux/API/api';
import { Preloader } from '../../../assets/common/Preloader/Preloader.jsx';
import { ICartItem, ILensProduct } from '../../Types/types';
import { useAppDispatch } from '../../../redux/hooks';
import { pushPriceToTotal } from '../../../redux/authSlice';
import { LeftLensCol } from './LeftLensCol/LeftLensCol';
import { RightLensCol } from './RightCol/RightLensCol';

interface ICartLensCardProps {
    cartItem: ICartItem
    authIsLoading: string
    cartItemIndex: number
    editCart: () => void
    isAuth: boolean
    switchModal: (arg: Boolean) => void
}

export const CartLensCard: FC<ICartLensCardProps> = ({ cartItem, authIsLoading, cartItemIndex, 
                                                            editCart, isAuth, switchModal }: ICartLensCardProps,) => {
    const dispatch = useAppDispatch();
    const [product, setProduct] = useState<ILensProduct | null>();

    useEffect(() => {
        async function fetchData() {
            const response = await instance.get(`/lenses/${cartItem.productId}`);
            setProduct(response.data);
            dispatch(pushPriceToTotal({ // получаем актуальную сумму товаров в корзине
                id: cartItem.productId,
                sum: (response.data.price * cartItem.quantity)
            })) 
        }
        fetchData();
    }, [cartItem.productId, cartItem.quantity, dispatch]);

    if (!product) {
        return <Preloader minFormat={true} />;
    }


    return <div className={c.wrap} >

        <LeftLensCol productId={cartItem.productId} imageUrlMain={product.imageUrl.main} />

        <RightLensCol product={product}
            cartItem={cartItem}
            cartItemIndex={cartItemIndex}
            editCart={editCart}
            isAuth={isAuth}
            switchModal={switchModal} />

    </div>
}