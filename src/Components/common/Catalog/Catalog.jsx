import c from './Catalog.module.scss';
import { ProductCard } from '../ProductCard/ProductCard';
import { Preloader } from '../../../assets/common/Preloader/Preloader';
import { useSelector } from 'react-redux';
import { useFilterProducts } from '../../../assets/functions/useFilterProducts';
import { useSortProducts } from '../../../assets/functions/useSortProducts';
import { useLocation } from 'react-router-dom';
import { LensCard } from '../LensCard/LensCard';
import { fetchAddToFavorites, fetchRemoveFromFavorites, selectIsAuth } from '../../../redux/authSlice';
import { switchAuthOfferModal } from '../../../redux/headerSlice';


export const Catalog = ({dispatch, products, areProdsLoading, 
                            /* addToFavorites, 
                            removeFromFavorites,  */
                            userFavorites, 
                            authIsLoading}) => {
    
    let filteredProducts = useFilterProducts(products)
    const sortedProducts = useSortProducts(filteredProducts)
    const location = useLocation()
    const isAuth = useSelector(selectIsAuth)
    const userCart = useSelector(s => s.auth.loginData.data?.cart)

    const addToFavorites = (productId) => {
        if (!isAuth) {
            dispatch(switchAuthOfferModal(true))
        } else {
            dispatch(fetchAddToFavorites(productId))
        }
    } 
    const removeFromFavorites = (productId) => {
        dispatch(fetchRemoveFromFavorites(productId))
    } 
      
    if (areProdsLoading) {
        return <Preloader minFormat={true} />;
    }

    const inCartArray = [];
    if (userCart) {
        userCart.forEach(elem => {
            inCartArray.push(elem.productId);
        });
    }

    if (!filteredProducts.length) {
        return <div className={c.emptyNote}>Таких очков пока не завезли. Измените фильтры.</div>
    } else if (location.pathname !== '/lenses') {
        return <div className={c.catGrid}>
        {sortedProducts.map(product => <ProductCard 
                                    key={product._id} 
                                    product={product} 
                                    dispatch={dispatch}
                                    addToFavorites={addToFavorites}
                                    removeFromFavorites={removeFromFavorites}
                                    userFavorites={userFavorites}
                                    authIsLoading={authIsLoading}
                                    inCartArray={inCartArray} />)}

    </div>
    } else {
        return <div className={c.catGrid}>
            {sortedProducts.map(product => <LensCard 
                                    key={product._id} 
                                    product={product} 
                                    authIsLoading={authIsLoading}
                                    inCartArray={inCartArray} />)}
        </div>
    }

     
}