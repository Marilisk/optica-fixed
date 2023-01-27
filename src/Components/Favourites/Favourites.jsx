import c from './Favourites.module.scss';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Preloader } from '../../assets/common/Preloader/Preloader';
import { FavoriteProductCard } from './FavoriteProductCard/FavoriteProductCard';
import { useNavigate } from 'react-router-dom';


export const Favourites = ({ isAuth, removeFromFavorites, userFavorites, authIsLoading }) => {
    //console.log(userFavorites);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) {
            navigate('/');
        }
    })
    const cart = useSelector(s => s.auth.loginData.data?.cart);

    if (!userFavorites || !userFavorites.length) {
        return <Preloader minFormat={true} />;
    }

    const inCartArray = [];
    cart.forEach(elem => {
        inCartArray.push(elem.productId);
    });


    return <>
        <h1 className={c.header}>
            <div>Избранное</div>
        </h1>
        <div className={c.catGrid}>
            {userFavorites.map(product => <FavoriteProductCard key={product} id={product}
                removeFromFavorites={removeFromFavorites}
                authIsLoading={authIsLoading}
                inCartArray={inCartArray} />)}


        </div>
    </>
}
