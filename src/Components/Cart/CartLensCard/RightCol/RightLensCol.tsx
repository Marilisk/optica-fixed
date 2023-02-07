import c from './RightLensCol.module.scss';
import { FC } from 'react';
import { LensLensSelector } from './LensLensSelector/LensLensSelector';
import { priceFormatter } from '../../../../assets/functions/priceFormatter';
import { useAppDispatch } from '../../../../redux/hooks';
import { fetchRemoveEyewearFromCart } from '../../../../redux/authSlice';
import { LSubTotal } from './SubTotal/LSubTotal';
import { ICartItem, ILensProduct } from '../../../Types/types';
import { LDetails } from './LensDetails/LDetails';


interface IRightLensColProps {
    authIsLoading: string
    product: ILensProduct
    cartItem: ICartItem
    cartItemIndex: number
    editCart: () => void
    isAuth: boolean
    switchModal: (arg: Boolean) => void;
}

export const RightLensCol: FC<IRightLensColProps> = ({ authIsLoading, product, cartItem, cartItemIndex, editCart, isAuth, switchModal }: IRightLensColProps) => {
    const dispatch = useAppDispatch();

    const price = priceFormatter (product.price)
    const totalPrice = priceFormatter(product.price * cartItem.quantity)

    return <div className={c.wrap}>

        <div className={c.firstLine}>
            <h2>{product.brand} {product.code}</h2>
            {isAuth && <div className={c.deleteLink}
                onClick={() => dispatch(fetchRemoveEyewearFromCart(product._id))}>
                удалить
            </div>}

        </div>

        <LensLensSelector cartItem={cartItem} cartItemIndex={cartItemIndex}
            editCart={editCart} isAuth={isAuth} switchModal={switchModal} dioptries={product.prescription} />

        <LDetails price={price} />

        <LSubTotal cartItem={cartItem} price={totalPrice} cartItemIndex={cartItemIndex}
            editCart={editCart} switchModal={switchModal} isAuth={isAuth} />


        
    </div>

}