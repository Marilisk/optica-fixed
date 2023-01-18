import { NavLink } from 'react-router-dom';
import c from './../Header.module.scss';
import cart from './../../../assets/header/icons/cart.svg';

export const CartBtn = ({ fullHeader }) => {

    return <div className={c.menuItem} style={fullHeader ? null : { border: 'none' }}>
        <NavLink to='cart'>
            <img alt='' src={cart} />
            {fullHeader && <p>Корзина</p>}
        </NavLink>
    </div>

}