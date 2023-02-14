import c from './LensSelector.module.scss';
import { FC } from 'react';
import { useState } from 'react';
import { updateCart } from '../../../../redux/authSlice';
import { ICartItem } from '../../../Types/types';
import { useAppDispatch } from '../../../../redux/hooks';
import { switchAuthOfferModal } from '../../../../redux/headerSlice';

const dioptries = [-9.0, -8.5, -8.0, -7.5, -7.0, -6.5, -6.0, -5.75, -5.5, -5.25, -5.0, -4.75, -4.5, -4.25, -4.0, -3.75, -3.5, -3.25, -3.0, -2.75, -2.5, -2.25, -2.0, -1.75, -1.5, -1.25, -1.0, -1.25, -1.0, -0.75, -0.5, -0.25, +0.25, +0.5, +0.75, +1.0, +1.25, +1.5, +1.75, +2.0, +2.25, +2.5, +2.75, +3.0, +3.25, +3.5, +3.75, +4.0, +4.25, +4.5, +4.75, +5.0, +5.25, +5.5, +5.75,];

interface ILensSelector {
    cartItem: ICartItem
    cartItemIndex: number
    editCart: () => void
    isAuth: boolean
    switchModal: (arg: Boolean) => void;
}

export const LensSelector: FC<ILensSelector> = ({ cartItem, cartItemIndex, editCart, isAuth, switchModal }: ILensSelector,) => {
    const dispatch = useAppDispatch();

    const [leftOptionsOpened, toggleLOptions] = useState(false);
    const [rightOptionsOpened, toggleROptions] = useState(false);

    const chooseOpticalPower = (value: number, side: 'left' | 'right') => {
        if (!isAuth) {
            dispatch(switchAuthOfferModal(true))
        } else {
            const newCartItem: ICartItem = side === 'left' ?
                { ...cartItem, leftLens: value }
                : { ...cartItem, rightLens: value };
            dispatch(updateCart({ cartItemIndex, newCartItem }))
            editCart()
        }
    }

    const leftOptions = dioptries.map((value, index) => {
        return <div className={cartItem.leftLens === value ? c.selectedFakeOPtion : c.fakeOption}
            style={{ top: index * 40 + 'px' }} key={index}
            onClick={() => chooseOpticalPower(value, 'left')}>
            {value}
        </div>
    })
    const rightOptions = dioptries.map((value, index) => {
        return <div className={cartItem.rightLens === value ? c.selectedFakeOPtion : c.fakeOption}
            style={{ top: index * 40 + 'px' }} key={index}
            onClick={() => chooseOpticalPower(value, 'right')} >
            {value}
        </div>
    })

    return <div className={c.secondLine}>
        <div className={c.name}>Линзы</div>
        <div>
            <div className={c.sideFlex}>

                <div className={c.oneSelectorWrap}>
                    <div className={c.sideName}>левая</div>
                    <div className={c.selectWrapper}
                        onClick={() => toggleLOptions(!leftOptionsOpened)}>

                        <div className={c.select}>
                            <div>{cartItem.leftLens}</div>
                        </div>

                        <div className={c.arrow} />

                        <div className={c.optionsList} style={leftOptionsOpened ? { display: 'inline-block' } : { display: 'none' }}>
                            {leftOptions}
                        </div>
                    </div>
                </div>

                <div className={c.oneSelectorWrap}>
                    <div className={c.sideName}>правая</div>
                    <div className={c.selectWrapper}
                        onClick={() => toggleROptions(!rightOptionsOpened)}>

                        <div className={c.select}>
                            <div>
                                {cartItem.rightLens}
                            </div>
                        </div>
                        {<div className={c.arrow} />}

                        <div className={c.optionsList} style={rightOptionsOpened ? { display: 'inline-block' } : { display: 'none' }}>
                            {rightOptions}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>


}