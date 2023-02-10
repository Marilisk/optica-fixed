import c from './Catalog.module.scss';
import { ProductCard } from '../ProductCard/ProductCard';
import { Preloader } from '../../../assets/common/Preloader/Preloader';
import { useSelector } from 'react-redux';
import { useFilterProducts } from '../../../assets/functions/useFilterProducts';
import { useSortProducts } from '../../../assets/functions/useSortProducts';
import { useLocation } from 'react-router-dom';
import { LensCard } from '../LensCard/LensCard';


export const Catalog = ({dispatch, products, areProdsLoading, 
                            addToFavorites, 
                            removeFromFavorites, 
                            userFavorites, 
                            authIsLoading}) => {
    
    let filteredProducts = useFilterProducts(products)
    const sortedProducts = useSortProducts(filteredProducts)
    const location = useLocation()
        
    const userCart = useSelector(s => s.auth.loginData.data?.cart)
      
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
                                    addToFavorites={addToFavorites}
                                    removeFromFavorites={removeFromFavorites}
                                    userFavorites={userFavorites}
                                    authIsLoading={authIsLoading}
                                    inCartArray={inCartArray} />)}
        </div>
    }

     
}