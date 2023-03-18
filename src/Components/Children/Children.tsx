import { FiltersDashboard } from '../common/FiltersDashboard/FiltersDashboard';
import { Catalog } from '../common/Catalog/Catalog';
import { BreadCrumbs } from '../common/BreadCrumbs/BreadCrumbs';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { LoadingStatusEnum } from '../Types/types';
import { FC, useEffect } from 'react';
import { clearAllFilters } from '../../redux/featuresSlice';


export const Children:FC = () => {

    const dispatch = useAppDispatch();
    const products = useAppSelector(state => state.products.products);
    const areProdsLoading = products.status === LoadingStatusEnum.loading;
    const authIsLoading = useAppSelector(state => state.auth.loginData.status )
    const userFavorites = useAppSelector(state => state.auth.loginData.data?.favourites);

    useEffect(() => {
        dispatch(clearAllFilters())
    })

    const genderFilteredProducts = products.items.filter(el => el.features.includes('детские') || el.features.includes('подростковые')) 

    return <>
        <BreadCrumbs text={'Детские очки'} />

        <FiltersDashboard />

        <Catalog dispatch={dispatch}
            products={genderFilteredProducts}
            areProdsLoading={areProdsLoading}
            userFavorites={userFavorites}
            authIsLoading={authIsLoading} />
    </>
}