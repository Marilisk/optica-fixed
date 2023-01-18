import c from './MobileHeader.module.scss';
//import logo from './../../assets/header/dark-violet-logo.png';
import violetLogo from './../../assets/header/darkViolet-logo.png';
import greenLogo from './../../assets/header/green-logo.png';

import shopLocation from './../../assets/header/icons/shopLocation.svg';
import heart from './../../assets/header/icons/heart.svg';
import cart from './../../assets/header/icons/cart.svg';
import { NavLink } from 'react-router-dom';
import { LoginButton } from './LoginButton/LoginButton';
import { useSelector } from 'react-redux';
import { useState } from 'react';
//import menuBurger from './../../assets/icons/menu-burger.svg';
import menuBurger from './../../assets/icons/menu-gradientBurger.png';
import { Cross } from '../../assets/icons/Cross';


export const MobileHeader = ({ mainMenu, toggleLoginModalOpened, loginModalOpened, dispatch }) => {
    const fullHeader = useSelector(state => state.header.fullHeader);

    const [mobileMenu, toggleMobMenu] = useState(false);

    const menu = mainMenu.map(btn => {
        return <div key={btn.name} onClick={() => toggleMobMenu(!mobileMenu)} >
            <NavLink to={btn.url}>
                <div className={c.navItem}>
                    <span>{btn.name}</span>
                </div>
            </NavLink>
        </div>
    })


    return <div className={c.mainWrapper} style={fullHeader ? null : { border: 'none' }} >

        <div className={c.burgerWrap} onClick={() => toggleMobMenu(!mobileMenu)}>
            
                <img alt='' src={menuBurger} style={ 
                    mobileMenu ? {transform: 'none'} : {transform: 'rotate(90deg)' }}  />
            

            {/* {mobileMenu ?
                <Cross size={50} color={'#11A834'} margin={0} transform={'none'} /> :
                <img alt='' src={menuBurger}  />
            } */}
        </div>
        {mobileMenu && <div className={c.navLinkWrap}>


            <LoginButton toggleLoginModalOpened={(value) => dispatch(toggleLoginModalOpened(value))}
                loginModalOpened={loginModalOpened} dispatch={dispatch} />

            <NavLink to='/shop' >
                <div className={c.navItem}>
                    <span>Наш оффлайн магазин</span>
                </div>
            </NavLink>
            {menu}
        </div>}

        <div className={c.logoWrap} style={fullHeader ? null : { border: 'none' }}>
            <NavLink to={`/`}>
                {/* <img src={violetLogo} alt="" className={c.logo} /> */}
                <img src={greenLogo} alt="" className={c.logo} />
            </NavLink>
        </div>


        <div className={c.menuWrap}>

            <div className={c.menuItem}>
                <img alt='' src={heart} />
            </div>

            <div className={c.menuItem} style={fullHeader ? null : { border: 'none' }}>
                <img alt='' src={cart} />
            </div>
        </div>

    </div>
}