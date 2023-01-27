import c from './Catalog.module.scss';
import { ProductCard } from '../ProductCard/ProductCard';
import { Preloader } from '../../../assets/common/Preloader/Preloader';
import { useSelector } from 'react-redux';


export const Catalog = ({dispatch, products, areProdsLoading, addToFavorites, removeFromFavorites, userFavorites, authIsLoading}) => {
     
    
    //console.log(products)
    const userCart = useSelector(s => s.auth.loginData.data?.cart);
   
    if (areProdsLoading) {
        return <Preloader minFormat={true} />;
    }

    const inCartArray = [];
    userCart.forEach(elem => {
        inCartArray.push(elem.productId);
    });

    return <div className={c.catGrid}>
        {products.map(product => <ProductCard 
                                    key={product._id} 
                                    product={product} 
                                    dispatch={dispatch}
                                    addToFavorites={addToFavorites}
                                    removeFromFavorites={removeFromFavorites}
                                    userFavorites={userFavorites}
                                    authIsLoading={authIsLoading}
                                    inCartArray={inCartArray} />)}

    </div> 
}