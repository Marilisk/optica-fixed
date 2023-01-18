
import c from './Lenses.module.scss';
import { BreadCrumbs } from '../common/BreadCrumbs/BreadCrumbs';
import { FiltersDashboard } from '../common/FiltersDashboard/FiltersDashboard';
import { useDispatch, useSelector } from 'react-redux';
//import { clearAllFilters, fetchFilterOptions, selectFilter } from '../../redux/featuresSlice.js';
import { Catalog } from '../common/Catalog/Catalog';
import { useEffect } from 'react';
import { fetchLenses } from '../../redux/lensesSlice';



export const Lenses = ({authIsLoading}) => {
    const products = useSelector(state => state.lenses.products);
    const goodsAmount = products.items.length;

    console.log(products.items);

    const areProdsLoading = products.status === 'loading';
    const filters = useSelector(state => state.filters.features);
    const selectedFilters = useSelector(state => state.filters.features.filter(elem => elem.isSelected));

    const dispatch = useDispatch();
    const onSelectFilter = (feature, option) => {
        //console.log({feature, option})
        //dispatch(selectFilter({feature, option}) )
    }
    //const filtered = filterProducts(products.items, selectedFilters);

    useEffect(()=> {
        dispatch(fetchLenses())
        /* dispatch(fetchFilterOptions('features'));
        dispatch(fetchFilterOptions('color')); */
        //dispatch(clearAllFilters());
        //dispatch(selectFilter({feature: 2, option: 'мужские'}));
    }, [dispatch]);

    return <>
        <BreadCrumbs text={'Контактные линзы'} />

        <section className={c.mainSection}>
            <div className={c.mainDescription}>
                <div className={c.mainDescriptionWrap}>
                    <h2>
                        Контактные линзы
                    </h2>
                    <p>
                        от проверенных производителей с доставкой от двух часов
                    </p>
                </div>
            </div>
            <div className={c.mainImgBlock}>

            </div>

        </section>

        <FiltersDashboard filters={filters} onSelectFilter={onSelectFilter} goodsAmount={goodsAmount} />

        <Catalog dispatch={dispatch} 
                products={products.items}
                areProdsLoading={areProdsLoading}
                authIsLoading={authIsLoading} />

        
    </>
}
