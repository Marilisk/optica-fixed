import c from './Women.module.scss';
import { BreadCrumbs } from '../common/BreadCrumbs/BreadCrumbs';
import { FiltersDashboard } from '../common/FiltersDashboard/FiltersDashboard';
import { useDispatch, useSelector } from 'react-redux';
import { clearAllFilters, fetchFilterOptions, selectFilter } from '../../redux/featuresSlice';
import { Catalog } from '../common/Catalog/Catalog';
import { useEffect } from 'react';
import { Preloader } from '../../assets/common/Preloader/Preloader';

export const Women = ({ addToFavorites, removeFromFavorites, userFavorites, authIsLoading }) => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);
    const areProdsLoading = products.status === 'loading';

    useEffect(() => {
        dispatch(clearAllFilters())
    })

    if (!products) {
        return <Preloader minFormat={false} />
    }
    const genderFilteredProducts = products.items.filter(el => el.gender.includes('Женские'))    

    return <>
        <BreadCrumbs text={'Женские очки'} />

        <section className={c.mainSection}>
            <div className={c.mainDescription}>
                <div className={c.mainDescriptionWrap}>
                    <h2>
                        Женские очки
                    </h2>
                    <p>
                        От классических овальных до экстравагантных кошачьих глаз - что бы Вы не искали, у нас найдётся идеальная женская оправа. Наши модели для девушек включают цвета, модели и формы, которые Вам понравятся. А ещё можно затонировать линзы для особого шарма!
                    </p>
                </div>
            </div>
            <div className={c.mainImgBlock} />
        </section>

        <FiltersDashboard />

        <Catalog dispatch={dispatch}
            products={genderFilteredProducts}
            areProdsLoading={areProdsLoading}
            addToFavorites={addToFavorites}
            removeFromFavorites={removeFromFavorites}
            userFavorites={userFavorites}
            authIsLoading={authIsLoading} />

    </>
}