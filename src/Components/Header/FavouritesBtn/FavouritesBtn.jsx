import { NavLink } from 'react-router-dom';
import { Heart } from '../../../assets/icons/Heart';
import c from './FavBtn.module.scss';



export const FavouritesBtn = ({favoritesCount}) => {


    return <div className={c.menuItem}
        style={favoritesCount ? { 'color': '#57005C' } : null}>
        <NavLink to='favourites'>
            <Heart color={favoritesCount ? '#57005C' : '#666666'} />
            {favoritesCount ? 
                <div className={c.countLabel}>{favoritesCount}</div>
                 : null
            }
            <p>Избранное</p>
        </NavLink>
    </div>

}