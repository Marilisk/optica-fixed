import { NavLink } from 'react-router-dom';
import c from './../Header.module.scss';
import cart from './../../../assets/header/icons/cart.svg';
import { FC, useEffect, useState } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import { selectIsAuth } from '../../../redux/authSlice';

interface ICartBtnProps {
    fullHeader: boolean
}

export const CartBtn: FC = ({ fullHeader }:ICartBtnProps) => {
    const isAuth = useAppSelector(selectIsAuth)

    const userCart = useAppSelector(s => s.auth.loginData.data?.cart)
    let userCartlength = userCart?.length
    const [userCartlengthLS, setuserCartlengthLS] = useState(userCartlength)
    let userCartlenInLS = JSON.parse(localStorage.getItem('cart'))?.length 
    
    /* 
    console.log(userCart) */
    useEffect( () => {
        if (!isAuth) {
            setuserCartlengthLS(userCartlenInLS)
        }
    }, [isAuth, userCartlenInLS])
                           

    return <div className={c.menuItem} style={fullHeader ? null : { border: 'none' }}>
        <NavLink to='cart'>
            <img alt='' src={cart} />
            {userCartlength || userCartlengthLS  ? 
                <div className={c.countLabel}>{userCartlength || userCartlengthLS}</div> 
                : null}
            {fullHeader && <p>Корзина</p>}
        </NavLink>
    </div>

}