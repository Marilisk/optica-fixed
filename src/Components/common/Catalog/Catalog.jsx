import c from './Catalog.module.scss';
import { ProductCard } from '../ProductCard/ProductCard';
import { Preloader } from '../../../assets/common/Preloader/Preloader';


export const Catalog = ({dispatch, products, areProdsLoading, addToFavorites, removeFromFavorites, userFavorites, authIsLoading}) => {
    // const filteredProducts = products.filter(product => product)
    
    
    //console.log(products)
   
    if (areProdsLoading) {
        return <Preloader minFormat={true} />;
    }
    return <div className={c.catGrid}>
        {products.map(product => <ProductCard 
                                    key={product._id} 
                                    product={product} 
                                    dispatch={dispatch}
                                    addToFavorites={addToFavorites}
                                    removeFromFavorites={removeFromFavorites}
                                    userFavorites={userFavorites}
                                    authIsLoading={authIsLoading} />)}

    </div> 
}