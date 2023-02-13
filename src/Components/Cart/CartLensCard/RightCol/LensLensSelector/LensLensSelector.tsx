import c from './LensLensSelector.module.scss';
import { FC } from 'react';
import { useState } from 'react';
import { ICartItem } from '../../../../Types/types';
import { useAppDispatch } from '../../../../../redux/hooks';
import { updateCart } from '../../../../../redux/authSlice';
import { switchAuthOfferModal } from '../../../../../redux/headerSlice';


interface ILensLensSelector {
    cartItem: ICartItem
    cartItemIndex: number
    editCart: () => void
    isAuth: boolean
    switchModal: (arg: Boolean) => void;
    dioptries: number[]
}

export const LensLensSelector: FC<ILensLensSelector> = ({ cartItem, cartItemIndex, editCart, isAuth, switchModal, dioptries }: ILensLensSelector) => {
    const dispatch = useAppDispatch();

    const [optionsOpened, toggleOptions] = useState(false);

    const chooseOpticalPower = (value: number) => {
        if (!isAuth) {
            dispatch(switchAuthOfferModal(true))
        } else {
            const newCartItem = { ...cartItem, leftLens: value, rightLens: value }       
            dispatch(updateCart ({ cartItemIndex, newCartItem }))
            editCart()
        }
    }

    const leftOptions = dioptries.map((value, index) => {
        return <div className={cartItem.leftLens === value ? c.selectedFakeOPtion : c.fakeOption}
            style={{ top: index * 40 + 'px' }} key={index}
            onClick={() => chooseOpticalPower(value)}>
            {value}
        </div>
    })

    return <div className={c.secondLine}>
        <div className={c.name}>Оптическая сила</div>
        <div>
            <div className={c.sideFlex}>
                
                <div className={c.selectWrapper}
                    onClick={() => toggleOptions(!optionsOpened)}>

                    <div className={c.select}>
                        <div>{cartItem.leftLens}</div>
                    </div>

                    <div className={c.arrow} />

                    <div className={c.optionsList} style={optionsOpened ? { display: 'inline-block' } : { display: 'none' }}>
                        {leftOptions}
                    </div>
                </div>

            </div>
        </div>
    </div>


}