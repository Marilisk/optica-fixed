import c from './RightCol.module.scss';
import { FC } from 'react';
import { fetchRemoveEyewearFromCart } from '../../../redux/authSlice';
import { ICartItem, IProduct } from '../../Types/types';
import { LensSelector } from './LensSelector/LensSelector';
import { useAppDispatch } from '../../../redux/hooks';
import { Details } from './Details/Details';
import { SubTotal } from './SubTotal/SubTotal';
import { priceFormatter } from '../../../assets/functions/priceFormatter';


interface IRightCol {
    authIsLoading: string
    product: IProduct
    cartItem: ICartItem
    cartItemIndex: number
    editCart: () => void
    isAuth: boolean
    switchModal: (arg: Boolean) => void;
}

export const RightCol: FC<IRightCol> = ({ authIsLoading, product, cartItem, cartItemIndex, editCart, isAuth, switchModal }: IRightCol,) => {
    const dispatch = useAppDispatch();

    const price = priceFormatter(product.price)
    const totalPrice = priceFormatter(product.price * cartItem.quantity)

    return <div className={c.wrap}>

        <div className={c.firstLine}>
            <h2>{product.name} {product.code}</h2>
            {isAuth && <div className={c.deleteLink}
                onClick={() => dispatch(fetchRemoveEyewearFromCart(product._id))}>
                удалить
            </div>}

        </div>

        <LensSelector cartItem={cartItem} cartItemIndex={cartItemIndex}
            editCart={editCart} isAuth={isAuth} switchModal={switchModal} />

        <Details price={price} />

        <SubTotal cartItem={cartItem} price={totalPrice} cartItemIndex={cartItemIndex}
            editCart={editCart} switchModal={switchModal} isAuth={isAuth} />


        
    </div>

}