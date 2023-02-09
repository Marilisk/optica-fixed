import c from './Children.module.scss';
import { FiltersDashboard } from '../common/FiltersDashboard/FiltersDashboard';
import { Catalog } from '../common/Catalog/Catalog';
import { BreadCrumbs } from '../common/BreadCrumbs/BreadCrumbs';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { LoadingStatusEnum } from '../Types/types';
import { FC, useEffect } from 'react';
import { clearAllFilters } from '../../redux/featuresSlice';
import { Preloader } from '../../assets/common/Preloader/Preloader';

interface IChildrenProps {
    addToFavorites: (arg: string) => void
    removeFromFavorites: (arg: string) => void
    userFavorites: string[]
    authIsLoading: LoadingStatusEnum

}

export const Children:FC<IChildrenProps> = ({addToFavorites, removeFromFavorites, userFavorites, authIsLoading}:IChildrenProps) => {

    const dispatch = useAppDispatch();
    const products = useAppSelector(state => state.products.products);
    const areProdsLoading = products.status === LoadingStatusEnum.loading;

    useEffect(() => {
        dispatch(clearAllFilters())
    })

    /* if (!products) {
        return <Preloader minFormat={false} />
    } */
    const genderFilteredProducts = products.items.filter(el => el.features.includes('детские') || el.features.includes('подростковые')) 

    return <>
        <BreadCrumbs text={'Детские очки'} />

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