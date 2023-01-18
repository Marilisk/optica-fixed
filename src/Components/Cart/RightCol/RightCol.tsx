import c from './RightCol.module.scss';
import { FC } from 'react';
import { fetchRemoveEyewearFromCart } from '../../../redux/authSlice';
import { ICartItem, IProduct } from '../../Types/types';
import { LensSelector } from './LensSelector/LensSelector';
import { useAppDispatch } from '../../../redux/hooks';
import { Details } from './Details/Details';
import { SubTotal } from './SubTotal/SubTotal';


interface IRightCol {
    authIsLoading: string
    product: IProduct
    cartItem: ICartItem
    cartItemIndex: number
}

export const RightCol: FC<IRightCol> = ({ authIsLoading, product, cartItem, cartItemIndex }: IRightCol,) => {
    const dispatch = useAppDispatch();


    const price = product.price.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' });
    const totalPrice = (product.price * cartItem.quantity).toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' });


    return <div className={c.wrap}>

        <div className={c.firstLine}>
            <h2>{product.name} {product.code}</h2>
            <div className={c.deleteLink}
                onClick={() => dispatch(fetchRemoveEyewearFromCart(product._id))}>
                удалить
            </div>
        </div>

        <LensSelector cartItem={cartItem} cartItemIndex={cartItemIndex} />

        <Details price={price} />

        <SubTotal cartItem={cartItem} price={totalPrice} cartItemIndex={cartItemIndex} />


        <div className={c.cart}>
            {/* <CartIcon color={'#95009C'} size={'18px'}
                onClickCB={() => dispatch(fetchRemoveEyewearFromCart(product._id))}
                disabled={authIsLoading === 'loading'} /> */}
        </div>
    </div>

}