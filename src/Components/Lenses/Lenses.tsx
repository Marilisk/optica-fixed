import c from './Lenses.module.scss';
import { BreadCrumbs } from '../common/BreadCrumbs/BreadCrumbs';
import { FiltersDashboard } from '../common/FiltersDashboard/FiltersDashboard';
//import { clearAllFilters, fetchFilterOptions, selectFilter } from '../../redux/featuresSlice.js';
import { Catalog } from '../common/Catalog/Catalog';
import { FC, useEffect } from 'react';
import { fetchLenses } from '../../redux/lensesSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { LoadingStatusEnum } from '../Types/types';
import { LensFiltersDashboard } from '../common/FiltersDashboard/LensFiltersDashboard';
import { LensCatalog } from '../common/LensCatalog/LensCatalog';

interface ILensesProps {
    authIsLoading: LoadingStatusEnum
    userFavorites: string[]
}

export const Lenses:FC<ILensesProps> = ({authIsLoading}:ILensesProps) => {
    const products = useAppSelector(state => state.lenses.products)
    const areProdsLoading = products.status === LoadingStatusEnum.loading;
    const dispatch = useAppDispatch();
    
    useEffect(()=> {
        dispatch(fetchLenses())
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

        {/* <FiltersDashboard filters={filters} onSelectFilter={onSelectFilter} goodsAmount={goodsAmount} /> */}
        <LensFiltersDashboard />

        <LensCatalog products={products.items}
                areProdsLoading={areProdsLoading}
                authIsLoading={authIsLoading} />



        
    </>
}
