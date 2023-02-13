import c from './Favourites.module.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FavoriteProductCard } from './FavoriteProductCard/FavoriteProductCard';
import { Link, useNavigate } from 'react-router-dom';
import { switchAuthOfferModal } from '../../redux/headerSlice';
import { fetchRemoveFromFavorites, selectIsAuth } from '../../redux/authSlice';


export const Favourites = () => {
    const userFavorites = useSelector(s => s.auth.loginData.data?.favourites);
    const authIsLoading = useSelector(s => s.auth.loginData.status);
    const isAuth = useSelector(selectIsAuth)
    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        if (!isAuth) {
            dispatch(switchAuthOfferModal(true))
            navigate('/');
        }
    }, [isAuth, dispatch, navigate])

    const cart = useSelector(s => s.auth.loginData.data?.cart);

    const removeFromFavorites = (productId) => {
        dispatch(fetchRemoveFromFavorites(productId))
    } 

    if (!userFavorites || !userFavorites.length /* || authIsLoading === 'loading' */) {
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
                inCartArray={inCartArray}
                isAuth={isAuth} />)}


        </div>
    </>
}
