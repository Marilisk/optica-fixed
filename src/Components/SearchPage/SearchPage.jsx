import c from './SearchPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Catalog } from '../common/Catalog/Catalog';
import defaultGlasses from './../../assets/common/defaultGlasses.webp';


export const SearchPage = ({ addToFavorites, removeFromFavorites, userFavorites, authIsLoading }) => {
    const products = useSelector(state => state.products.searchResult);
    const goodsAmount = products.items.length;

    //console.log(products.items);

    const dispatch = useDispatch();

    if (!goodsAmount) {
        return <div className={c.preloader}>
            <h2>ничего не нашлось...</h2>
            <img src={defaultGlasses} alt='' />
        </div>
    }

    return <>
        {/* <SearchBar /> */}

        <Catalog dispatch={dispatch}
            products={products.items}
            areProdsLoading={products.status === 'loading'}
            addToFavorites={addToFavorites}
            removeFromFavorites={removeFromFavorites}
            userFavorites={userFavorites}
            authIsLoading={authIsLoading} />


    </>
}