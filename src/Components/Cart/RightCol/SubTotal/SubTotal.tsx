import c from './SubTotal.module.scss';
import { FC, useState } from 'react';
import { ICartItem } from '../../../Types/types';
import { updateCart } from '../../../../redux/authSlice';
import { useAppDispatch } from '../../../../redux/hooks';
import { switchAuthOfferModal } from '../../../../redux/headerSlice';


type ITotal = {
    price: string
    cartItem: ICartItem
    cartItemIndex: number
    editCart: () => void
    switchModal: (arg: Boolean) => void
    isAuth: boolean
}
const quantities = [1, 2, 3, ];

export const SubTotal: FC<ITotal> = ({ price, cartItem, cartItemIndex, editCart, switchModal, isAuth }: ITotal) => {
    const dispatch = useAppDispatch();

    const [quantityOpened, toggleQuantity] = useState(false);

    const chooseQuantity = (value: number) => {
        if (!isAuth) {
            dispatch(switchAuthOfferModal(true))
        } else {
            const newCartItem = { ...cartItem, quantity: value }
            dispatch(updateCart({ cartItemIndex, newCartItem }))
            editCart()
        }
    }

    const options = quantities.map((value, index) => {
        return <div className={cartItem.quantity === value ? c.selectedFakeOPtion : c.fakeOption}
            style={{ top: index * 40 + 'px' }} key={index}
            onClick={() => chooseQuantity(value)}>
            {value}
        </div>
    })

    return <div className={c.sideFlex}>

        <p>Подитог</p>

        <div className={c.selectBlock}>
            <p>количество </p>
            <div className={c.selectWrapper}
                onClick={() => toggleQuantity(!quantityOpened)}>

                <div className={c.select}>
                    <div>{cartItem.quantity}</div>
                </div>

                <div className={c.arrow} />

                <div className={c.optionsList} style={quantityOpened ? { display: 'inline-block' } : { display: 'none' }}>
                    {options}
                </div>
            </div>
        </div>

        <div className={c.bold}>
            <p>{price}</p>
        </div>

    </div>


}