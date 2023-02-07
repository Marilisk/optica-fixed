import c from './Favourites.module.scss';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FavoriteProductCard } from './FavoriteProductCard/FavoriteProductCard';
import { Link, useNavigate } from 'react-router-dom';


export const Favourites = ({ isAuth, removeFromFavorites, userFavorites, authIsLoading, switchModal }) => {
    //console.log(userFavorites);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) {
            switchModal(true)
            navigate('/');
        }
    })
    const cart = useSelector(s => s.auth.loginData.data?.cart);

    if (!userFavorites || !userFavorites.length) {
        return <div className={c.nthFound}>
            <h2>
                <div>Пока ничего нет...</div>
            </h2>
            <Link to='/'>Перейти в каталог</Link>
        </div>;
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
