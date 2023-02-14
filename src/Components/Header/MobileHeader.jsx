import c from './MobileHeader.module.scss';
import greenLogo from './../../assets/header/green-logo.png';
import { NavLink } from 'react-router-dom';
import { LoginButton } from './LoginButton/LoginButton';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import menuBurger from './../../assets/icons/menu-gradientBurger.png';
import { FavouritesBtn } from './FavouritesBtn/FavouritesBtn';
import { CartBtn } from './CartBtn/CartBtn';


export const MobileHeader = ({ mainMenu, toggleLoginModalOpened, loginModalOpened, dispatch, favoritesCount }) => {
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


    return <div className={c.mainWrapper} style={fullHeader ? null : { border: 'none' }} 
                /* onClick={() => toggleMobMenu(false)} */ >

        <div className={c.burgerWrap} onClick={() => toggleMobMenu(!mobileMenu)}>

            <img alt='' src={menuBurger} style={
                mobileMenu ? { transform: 'none' } : { transform: 'rotate(90deg)' }} />

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

        <div className={c.logoWrap} style={fullHeader ? null : { border: 'none' }}
            onClick={() => toggleMobMenu(false)} >
            <NavLink to={`/`}>
                <img src={greenLogo} alt="" className={c.logo} />
            </NavLink>
        </div>


        <div className={c.menuWrap} onClick={() => toggleMobMenu(false)}>

            <FavouritesBtn favoritesCount={favoritesCount} />

            <CartBtn fullHeader={fullHeader} />
            
        </div>

    </div>
}