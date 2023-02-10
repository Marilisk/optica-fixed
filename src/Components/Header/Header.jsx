import c from './Header.module.scss';
import logo from './../../assets/header/full-violet-logo.png';
import { NavLink } from 'react-router-dom';
import { LoginButton } from './LoginButton/LoginButton';
import { useDispatch, useSelector } from 'react-redux';
import { setfullHeaderTheme, toggleLoginModalOpened, toggleMenuOpened } from '../../redux/headerSlice';
import { MobileHeader } from './MobileHeader';
import { MenuOptions } from './MenuOptions/MenuOptions';
import { OfflineShopBtn } from './OfflineShopBtn/OfflineShopBtn';
import { FavouritesBtn } from './FavouritesBtn/FavouritesBtn';
import { CartBtn } from './CartBtn/CartBtn';


export const Header = ({ fullHeader, favoritesCount }) => {

    const dispatch = useDispatch();
    const menuOpened = useSelector(state => state.header.menuOpened);
    const loginModalOpened = useSelector(state => state.header.loginModalOpened);
    const mainMenu = useSelector(state => state.header.mainMenu);

    const menu = mainMenu.map(btn => {
        return <div key={btn.name} className={c.navLinkWrap}
            onMouseOver={() => dispatch(toggleMenuOpened(btn.name))}
            onMouseLeave={() => dispatch(toggleMenuOpened(null))} >

            <div className={c.navItem} >
                <span>
                    <NavLink to={btn.url}>
                        {btn.name}
                    </NavLink>
                </span>
                {menuOpened === btn.name &&
                    <div className={c.accordeon}>
                        <MenuOptions links={btn.links} />
                    </div>
                }
            </div>
        </div>
    })

    return <>
        <MobileHeader mainMenu={mainMenu}
            toggleLoginModalOpened={(value) => dispatch(toggleLoginModalOpened(value))}
            loginModalOpened={loginModalOpened}
            dispatch={dispatch}
            favoritesCount={favoritesCount} />

        <div className={c.wideWrapper}>
            <div className={c.mainWrapper} style={fullHeader ? null : { border: 'none' }} >

                <div onClick={() => dispatch(setfullHeaderTheme(true))}
                    className={c.logoWrap}
                    style={fullHeader ? null : { border: 'none' }}>
                    <NavLink to={`/`}>
                        <img src={logo} alt="" className={c.logo} />
                    </NavLink>
                </div>

                {fullHeader &&
                    <div className={c.navWrap}>
                        {menu}
                    </div>
                }

                <div className={c.menuWrap}>
                    {fullHeader &&
                        <>
                            <OfflineShopBtn />

                            <LoginButton toggleLoginModalOpened={(value) => dispatch(toggleLoginModalOpened(value))}
                                loginModalOpened={loginModalOpened} dispatch={dispatch} />

                            <FavouritesBtn favoritesCount={favoritesCount} />
                        </>
                    }
                    <CartBtn fullHeader={fullHeader} />
                </div>

            </div>
        </div>
    </>
}