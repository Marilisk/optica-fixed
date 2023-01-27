import c from './Men.module.scss';
import { BreadCrumbs } from '../common/BreadCrumbs/BreadCrumbs';
import { FiltersDashboard } from '../common/FiltersDashboard/FiltersDashboard';
import { useDispatch, useSelector } from 'react-redux';
import { clearAllFilters, selectFilter } from '../../redux/featuresSlice';
import { Catalog } from '../common/Catalog/Catalog';
import { useEffect } from 'react';
import { filterProducts } from '../../assets/functions/filterProducts';



export const Men = ({addToFavorites, removeFromFavorites, userFavorites, authIsLoading}) => {
    
    const products = useSelector(state => state.products.products);
    const goodsAmount = products.items.length;

    console.log(products.items);

    const areProdsLoading = products.status === 'loading';
    const filters = useSelector(state => state.filters.features);
    const selectedFilters = useSelector(state => state.filters.features.filter(elem => elem.isSelected));

    const dispatch = useDispatch();
    const onSelectFilter = (feature, option) => {
        //console.log({feature, option})
        dispatch(selectFilter({feature, option}) )
    }
    const filtered = filterProducts(products.items, selectedFilters);

    useEffect(()=> {
        dispatch(clearAllFilters());
        dispatch(selectFilter({feature: 2, option: 'мужские'}));
    }, [dispatch]);

    return <>
        <BreadCrumbs text={'Женские очки'} />

        <section className={c.mainSection}>
            <div className={c.mainDescription}>
                <div className={c.mainDescriptionWrap}>
                    <h2>
                        Мужские очки
                    </h2>
                    <p>
                        От классических овальных до экстравагантных кошачьих глаз - что бы Вы не искали, у нас найдётся идеальная женская оправа. Наши модели для девушек включают цвета, модели и формы, которые Вам понравятся. А ещё можно затонировать линзы для особого шарма!
                    </p>
                </div>
            </div>
            <div className={c.mainImgBlock}></div>

        </section>

        <FiltersDashboard filters={filters} onSelectFilter={onSelectFilter} goodsAmount={goodsAmount} />

        <Catalog dispatch={dispatch} 
                products={filtered}
                areProdsLoading={areProdsLoading}
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites}
                userFavorites={userFavorites}
                authIsLoading={authIsLoading} />

        
    </>
}