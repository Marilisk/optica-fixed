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
}

export const RightCol: FC<IRightCol> = ({ authIsLoading, product, cartItem, cartItemIndex, editCart }: IRightCol,) => {
    const dispatch = useAppDispatch();

    const price = priceFormatter(product.price)
    const totalPrice = priceFormatter(product.price * cartItem.quantity)

    return <div className={c.wrap}>

        <div className={c.firstLine}>
            <h2>{product.name} {product.code}</h2>
            <div className={c.deleteLink}
                onClick={() => dispatch(fetchRemoveEyewearFromCart(product._id))}>
                удалить
            </div>
        </div>

        <LensSelector cartItem={cartItem} cartItemIndex={cartItemIndex} editCart={editCart} />

        <Details price={price} />

        <SubTotal cartItem={cartItem} price={totalPrice} cartItemIndex={cartItemIndex} editCart={editCart}  />


        <div className={c.cart}>
            {/* <CartIcon color={'#95009C'} size={'18px'}
                onClickCB={() => dispatch(fetchRemoveEyewearFromCart(product._id))}
                disabled={authIsLoading === 'loading'} /> */}
        </div>
    </div>

}