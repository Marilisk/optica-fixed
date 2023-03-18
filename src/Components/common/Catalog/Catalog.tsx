import c from './Catalog.module.scss';
import { ProductCard } from '../ProductCard/ProductCard';
import { Preloader } from '../../../assets/common/Preloader/Preloader';
import { useFilterProducts } from '../../../assets/functions/useFilterProducts';
import { useSortProducts } from '../../../assets/functions/useSortProducts';
import { fetchAddToFavorites, fetchRemoveFromFavorites, selectIsAuth } from '../../../redux/authSlice';
import { switchAuthOfferModal } from '../../../redux/headerSlice';
import { FC } from 'react';
import { IProduct } from '../../Types/types';
import { useAppSelector } from '../../../redux/hooks';

interface ICatalogProps {
    dispatch: (arg: any) => void
    products: IProduct[]
    areProdsLoading: boolean
    userFavorites: string[]
    authIsLoading: "loaded" | "loading" | "error"
}

export const Catalog: FC<ICatalogProps> = ({
    dispatch, products, areProdsLoading, userFavorites, authIsLoading
}: ICatalogProps) => {

    const filteredProducts = useFilterProducts(products)
    const sortedProducts = useSortProducts(filteredProducts)

    const isAuth = useAppSelector(selectIsAuth)
    const userCart = useAppSelector(s => s.auth.loginData.data?.cart)

    const addToFavorites = (productId: string) => {
        if (!isAuth) {
            dispatch(switchAuthOfferModal(true))
        } else {
            dispatch(fetchAddToFavorites(productId))
        }
    }
    const removeFromFavorites = (productId: string) => {
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
    }
    
    return <div className={c.catGrid}>
        {sortedProducts.map(product => (
            <ProductCard
                key={product._id}
                product={product}
                dispatch={dispatch}
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites}
                userFavorites={userFavorites}
                authIsLoading={authIsLoading}
                inCartArray={inCartArray} />)
        )}
    </div>

}