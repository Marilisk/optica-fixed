import { NavLink } from 'react-router-dom';
import c from './../FavouritesBtn/FavBtn.module.scss';
import cart from './../../../assets/header/icons/cart.svg';
import { FC } from 'react';
import { useAppSelector } from '../../../redux/hooks';

interface ICartBtnProps {
    fullHeader: boolean
}

export const CartBtn: FC = ({ fullHeader }:ICartBtnProps) => {

    const userCart = useAppSelector(s => s.auth.loginData.data?.cart)
    let userCartlength = userCart?.length

    const userCartlenInLS = useAppSelector(s => s.products.cartInLSLength)
                           

    return <div className={c.menuItem} style={fullHeader ? null : { border: 'none' }}>
        <NavLink to='cart'>
            <img alt='' src={cart} />
            {userCartlength || userCartlenInLS  ? 
                <div className={c.countLabel}>{userCartlength || userCartlenInLS}</div> 
                : null}
            {fullHeader && <p>Корзина</p>}
        </NavLink>
    </div>

}