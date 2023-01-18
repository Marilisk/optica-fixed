import c from './../Header.module.scss';
import shopLocation from './../../../assets/header/icons/shopLocation.svg';
import { NavLink } from 'react-router-dom';


export const OfflineShopBtn = () => {

    return <div className={c.menuItem}>
        <NavLink to='offlineshop'>
            <img alt='' src={shopLocation} />
            <p>Магазин</p>
        </NavLink>
    </div>

}